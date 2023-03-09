const connection = require("../helpers/db");
const jwt = require("jsonwebtoken");

const Course = function (course) {
  this.title = course.title;
  this.description = course.description;
  this.createdBy = course.createdBy;
  this.price = course.price;
  this.categoryId = course.categoryId;
  this.subCategoryId = course.subCategoryId;
  this.platformPrice = course.platformPrice;
};

Course.create = (newCourse, result) => {
  connection.query(`INSERT INTO course SET ?`, newCourse, (err, res) => {
    if (err) {
      console.log("Add course error:", err);
      result(err, null);
      return;
    }
    result(null, { idCourse: res.insertId, ...newCourse });
  });
};

Course.myCourses = (id, result) => {
  connection.query(
    `SELECT * , (SELECT username FROM user WHERE user.idUser = course.createdBy) As createdByName FROM courseStudent JOIN course ON courseStudent.courseId = course.idCourse WHERE studentId = ${id} AND course.isHidden = 0`,
    (err, res) => {
      if (err) {
        result({ kind: "not_found" }, null);
      } else {
        result(null, res);
      }
    },
  );
};
Course.getAll = (req, result) => {
  let query = "";
  let order = "";
  let limit = "";

  if (req.query.id != undefined) {
    query = query + ` AND idCourse IN (${req.query.id})`;
  }
  if (req.query.user != undefined) {
    query = query + ` AND createdBy IN (${req.query.user})`;
  }
  if (req.query.title != undefined) {
    query = query + ` AND title LIKE '%${req.query.title}%'`;
  }
  if (req.query.categoryId != undefined) {
    query = query + ` AND categoryId IN (${req.query.categoryId})`;
  }
  if (req.query.subCategoryId != undefined) {
    query = query + ` AND subCategoryId IN (${req.query.subCategoryId})`;
  }
  if (req.query.showHidden == undefined) {
    query = query + ` AND isHidden = 0`;
  }
  if (req.query.ratingFrom != undefined && req.query.ratingTo != undefined) {
    query =
      query +
      ` AND rating BETWEEN ${req.query.ratingFrom} AND ${req.query.ratingTo}`;
  }
  if (req.query.order != undefined) {
    order = "ORDER BY " + req.query.order + " " + req.query.sort;
  }

  if (req.query.limit != undefined) {
    limit = `LIMIT ${req.query.limit}`;
  }

  connection.query(
    `SELECT *,(SELECT username FROM user WHERE user.idUser = course.createdBy) As createdByName, (SELECT IFNULL(COUNT(idCourseStudent),0) FROM courseStudent WHERE courseStudent.courseId = course.idCourse) As enrolled , (SELECT IFNULL(COUNT(idLesson),0) FROM lesson WHERE courseId = course.idCourse) As totalVideos , (SELECT categoryTitle FROM category WHERE idCategory = course.categoryId LIMIT 1) AS categoryTitle , (SELECT subCategoryTitle FROM subCategory WHERE idSubCategory = course.subCategoryId LIMIT 1) AS subCategoryTitle  FROM course WHERE 1=1 ${query} ${order} ${limit}`,
    (err, res) => {
      if (err) {
        result({ kind: "not_found" }, null);
      } else {
        result(null, res);
      }
    },
  );
};

Course.findById = (id, token, result) => {
  const jwtToken = token.split(" ")[1];
  const userInfo = jwt.verify(jwtToken, process.env.SECRET_KEY);

  connection.query(
    `SELECT *,(SELECT username FROM user WHERE user.idUser = course.createdBy) As createdByName,(SELECT IFNULL(COUNT(idCourseStudent),0) FROM courseStudent WHERE courseStudent.courseId = course.idCourse) As enrolled FROM course WHERE idCourse = ${id}`,
    (err, res) => {
      if (err) {
        console.log("Find By ID: course error:", err);
        result(err, null);
        return;
      }
      if (res.length == 0) {
        result({ kind: "not_found" }, null);
      } else {
        connection.query(
          `SELECT * FROM courseStudent WHERE courseId = ${id} AND studentId = ${userInfo.idUser}`,
          (ecourseStudentErr, courseStudentResult) => {
            res[0].enrollmentInfo = null;
            res[0].hasAccess = false;
            if (courseStudentResult.length > 0) {
              res[0].enrollmentInfo = courseStudentResult[0];
              if (res[0].enrollmentInfo.status == "active") {
                res[0].hasAccess = true;
              } else {
                res[0].hasAccess = false;
              }
            }
            // CHECK IF TEACHER IS CREATOR
            if (userInfo.roleId == 3 && userInfo.idUser == res[0].createdBy) {
              res[0].hasAccess = true;
            }
            result(null, res[0]);
          },
        );
      }
    },
  );
};

Course.getCourseCodes = (id, result) => {
  connection.query(
    `SELECT (SELECT COUNT(idCourseCode) FROM courseCode WHERE courseId = ${id})As totalCodes , (SELECT COUNT(idCourseCode) FROM courseCode WHERE courseId = ${id} AND isUsed = 1) As totalUsedCodes;`,
    (err, res) => {
      result(null, res[0]);
    },
  );
};
Course.generateCodes = (amount, result) => {
  let codes = [];
  connection.query(
    `SELECT * FROM courseCode ORDER BY idCourseCode DESC LIMIT 1`,
    (leatestCodeErr, leatestCodeRes) => {
      let lastSerail = 10000000;
      if (leatestCodeRes.length > 0) {
        lastSerail = leatestCodeRes[0].serialNumber;
      }
      for (let i = 1; i <= amount; i++) {
        let currentSerial = parseInt(lastSerail) + parseInt(i);
        codes.push({
          serialNumber: currentSerial,
          code: makeid(8),
          courseId: 0,
          isUsed: 0,
          studentId: 0,
          usedAt: null,
        });
      }
      var bulk = codes.map((e) => [
        e.serialNumber.toString(),
        e.code,
        e.courseId,
        e.studentId,
        e.isUsed,
      ]);
      console.log([bulk]);
      connection.query(
        `INSERT INTO courseCode(serialNumber, code, courseId, studentId, isUsed) VALUES ?`,
        [bulk],
        (err, res) => {
          console.log(err);
        },
      );
      result(null, codes);
    },
  );
};

Course.checkRedeemCode = (code, token, result) => {
  const jwtToken = token.split(" ")[1];
  const userInfo = jwt.verify(jwtToken, process.env.SECRET_KEY);
  connection.query(
    `SELECT * FROM courseCode WHERE code = '${code}'`,
    (err, res) => {
      if (err) {
        result({ kind: "not_found" }, null);
      } else {
        if (res.length == 0) {
          result({ kind: "not_found" }, null);
        } else {
          var codeDetials = res[0];
          if (codeDetials.isUsed != 0) {
            result({ kind: "not_found" }, null);
          } else {
            connection.query(
              `SELECT *,(SELECT username FROM user WHERE user.idUser = course.createdBy) As createdByName FROM course WHERE idCourse = ${codeDetials.courseId}`,
              (courseErr, courseRes) => {
                if (courseErr) {
                  result({ kind: "not_found" }, null);
                } else {
                  if (courseRes.length == 0) {
                    result({ kind: "not_found" }, null);
                  } else {
                    codeDetials.course = courseRes[0];
                    connection.query(
                      `INSERT INTO redeemSession SET ?`,
                      {
                        courseCodeId: codeDetials.idCourseCode,
                        userId: userInfo.idUser,
                        sessionKey: (Math.random() * 100000000).toString(),
                      },
                      (sessionError, sessionRes) => {
                        console.log("sessionError", sessionError);
                        connection.query(
                          "SELECT * FROM redeemSession WHERE idRedeemSession = ?",
                          [sessionRes.insertId],
                          (redeemSessionErr, redeemSessionRes) => {
                            codeDetials.redeemSession = redeemSessionRes[0];
                            result(null, codeDetials);
                          },
                        );
                      },
                    );
                  }
                }
              },
            );
          }
        }
      }
    },
  );
};

Course.redeem = (sessionCode, result) => {
  connection.query(
    `SELECT *, (SELECT courseId FROM courseCode WHERE courseCode.idCourseCode = redeemSession.courseCodeId) As courseId , (SELECT idCourseCode FROM courseCode WHERE courseCode.idCourseCode = redeemSession.courseCodeId) As idCourseCode FROM redeemSession WHERE sessionKey = '${sessionCode}'`,
    (err, res) => {
      if (err) {
        result({ kind: "not_found" }, null);
      } else {
        if (res.length == 0) {
          result({ kind: "not_found" }, null);
        } else {
          connection.query(
            `SELECT * FROM course WHERE idCourse = ${res[0].courseId}`,
            (courseErr, courseRes) => {
              if (courseErr) {
                result({ kind: "not_found" }, null);
              } else {
                if (courseRes.length == 0) {
                  result({ kind: "not_found" }, null);
                } else {
                  connection.query(
                    `INSERT INTO courseStudent SET ?`,
                    {
                      courseId: res[0].courseId,
                      studentId: res[0].userId,
                      status: "active",
                      createdBy: 0,
                      delegateId: 0,
                      discount: 0,
                      price: courseRes[0].price,
                      total: courseRes[0].price,
                      courseGroupId: 0,
                    },
                    (courseStudentErr, courseStudentRes) => {
                      console.log("courseStudentErr", courseStudentErr);
                      connection.query(
                        `UPDATE courseCode SET ? WHERE idCourseCode = ${res[0].idCourseCode}`,
                        {
                          studentId: res[0].userId,
                          isUsed: 1,
                          usedAt: new Date(),
                        },
                        (updateCourseCodeErr, updateCourseCodeRes) => {
                          console.log(
                            "updateCourseCodeErr",
                            updateCourseCodeErr,
                          );
                          connection.query(
                            `DELETE FROM redeemSession WHERE sessionKey = '${sessionCode}'`,
                          );
                          result(null, updateCourseCodeRes);
                        },
                      );
                    },
                  );
                }
              }
            },
          );
        }
      }
    },
  );
};
Course.update = (id, course, result) => {
  connection.query(
    `UPDATE course SET ? WHERE idCourse = ${id}`,
    course,
    (err, res) => {
      if (err) {
        console.log("Error while editing a course", err);
        result(err, null);
        return;
      }
      result(null, { idCourse: id, ...course });
    },
  );
};
Course.updateCourseImage = (id, course, file, result) => {
  connection.query(
    `UPDATE course SET ? WHERE idCourse = ${id}`,
    {
      courseImage: "files/images/" + file.filename,
    },
    (err, res) => {
      if (err) {
        console.log("Error while editing a course", err);
        result(err, null);
        return;
      }
      result(null, { idCourse: id, ...course });
    },
  );
};
Course.delete = (id, result) => {
  connection.query(`DELETE FROM course WHERE idCourse = ${id}`, (err, res) => {
    if (err) {
      console.log("Error while deleting a course", err);
      result(err, null);
      return;
    }
    result(null, { message: `Course ID ${id} has been deleted successfully` });
  });
};
module.exports = Course;

function makeid(length) {
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}
