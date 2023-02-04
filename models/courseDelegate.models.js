const connection = require("../helpers/db");

const CourseDelegate = function (courseDelegate) {
  this.delegateId = courseDelegate.delegateId;
  this.status = courseDelegate.status;
  this.courseId = courseDelegate.courseId;
};

CourseDelegate.create = (newCourseDelegate, result) => {
  connection.query(
    `INSERT INTO courseDelegate SET ?`,
    newCourseDelegate,
    (err, res) => {
      if (err) {
        console.log("Add courseDelegate error:", err);
        result(err, null);
        return;
      }
      result(null, { idCourseDelegate: res.insertId, ...newCourseDelegate });
    },
  );
};

CourseDelegate.getAll = (result) => {
  connection.query(`SELECT * FROM courseDelegate`, (err, res) => {
    result(null, res);
  });
};

CourseDelegate.findById = (id, result) => {
  connection.query(
    `SELECT * FROM courseDelegate WHERE courseId = ${id}`,
    (err, res) => {
      if (err) {
        console.log("Find By ID: courseDelegate error:", err);
        result(err, null);
        return;
      }
      if (res.length == 0) {
        result({ kind: "not_found" }, null);
      } else {
        result(null, res);
      }
    },
  );
};

CourseDelegate.update = (id, courseDelegate, result) => {
  connection.query(
    `UPDATE courseDelegate SET ? WHERE idCourseDelegate = ${id}`,
    courseDelegate,
    (err, res) => {
      if (err) {
        console.log("Error while editing a courseDelegate", err);
        result(err, null);
        return;
      }
      result(null, { idCourseDelegate: id, ...courseDelegate });
    },
  );
};
CourseDelegate.delete = (id, result) => {
  connection.query(
    `DELETE FROM courseDelegate WHERE idCourseDelegate = ${id}`,
    (err, res) => {
      if (err) {
        console.log("Error while deleting a courseDelegate", err);
        result(err, null);
        return;
      }
      result(null, {
        message: `CourseDelegate ID ${id} has been deleted successfully`,
      });
    },
  );
};
module.exports = CourseDelegate;
