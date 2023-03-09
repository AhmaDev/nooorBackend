const connection = require("../helpers/db");

const CourseStudent = function (courseStudent) {
  this.courseId = courseStudent.courseId;
  this.studentId = courseStudent.studentId;
  this.status = courseStudent.status;
  this.createdBy = courseStudent.createdBy;
  this.delegateId = courseStudent.delegateId;
  this.discount = courseStudent.discount;
  this.price = courseStudent.price;
  this.total = courseStudent.total;
  this.courseGroupId = courseStudent.courseGroupId;
};

CourseStudent.create = (newCourseStudent, result) => {
  connection.query(
    `INSERT INTO courseStudent SET ?`,
    newCourseStudent,
    (err, res) => {
      if (err) {
        console.log("Add courseStudent error:", err);
        result(err, null);
        return;
      }
      result(null, { idCourseStudent: res.insertId, ...newCourseStudent });
    },
  );
};

CourseStudent.getAll = (result) => {
  connection.query(`SELECT * FROM courseStudent`, (err, res) => {
    result(null, res);
  });
};

CourseStudent.findById = (id, result) => {
  connection.query(
    `SELECT * FROM courseStudent WHERE idCourseStudent = ${id}`,
    (err, res) => {
      if (err) {
        console.log("Find By ID: courseStudent error:", err);
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
CourseStudent.findByCourseId = (id, result) => {
  connection.query(
    `SELECT *, DATE_FORMAT(courseStudent.createdAt, '%Y-%m-%d') AS enrollDate FROM courseStudent LEFT JOIN user ON user.idUser = courseStudent.studentId LEFT JOIN student ON student.userId = user.idUser LEFT JOIN avatar ON avatar.idAvatar = student.avatarId LEFT JOIN courseGroup ON courseGroup.idCourseGroup = courseStudent.courseGroupId WHERE courseStudent.courseId = ${id} ORDER BY user.username ASC`,
    (err, res) => {
      if (err) {
        console.log("Find By ID: courseStudent error:", err);
        result(err, null);
        return;
      }
      result(null, res);
    },
  );
};

CourseStudent.update = (id, courseStudent, result) => {
  connection.query(
    `UPDATE courseStudent SET ? WHERE idCourseStudent = ${id}`,
    courseStudent,
    (err, res) => {
      if (err) {
        console.log("Error while editing a courseStudent", err);
        result(err, null);
        return;
      }
      result(null, { idCourseStudent: id, ...courseStudent });
    },
  );
};
CourseStudent.delete = (id, result) => {
  connection.query(
    `DELETE FROM courseStudent WHERE idCourseStudent = ${id}`,
    (err, res) => {
      if (err) {
        console.log("Error while deleting a courseStudent", err);
        result(err, null);
        return;
      }
      result(null, {
        message: `CourseStudent ID ${id} has been deleted successfully`,
      });
    },
  );
};
module.exports = CourseStudent;
