const connection = require("../helpers/db");

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
    `SELECT *,(SELECT username FROM user WHERE user.idUser = course.createdBy) As createdByName, (SELECT IFNULL(COUNT(idCourseStudent),0) FROM courseStudent WHERE courseStudent.courseId = course.idCourse) As enrolled FROM course WHERE 1=1 ${query} ${order} ${limit}`,
    (err, res) => {
      if (err) {
        result({ kind: "not_found" }, null);
      } else {
        result(null, res);
      }
    },
  );
};

Course.findById = (id, result) => {
  connection.query(
    `SELECT * FROM course WHERE idCourse = ${id}`,
    (err, res) => {
      if (err) {
        console.log("Find By ID: course error:", err);
        result(err, null);
        return;
      }
      if (res.length == 0) {
        result({ kind: "not_found" }, null);
      } else {
        result(null, res[0]);
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
