const connection = require("../helpers/db");

const CourseChapter = function (courseChapter) {
  this.chapterTitle = courseChapter.chapterTitle;
  this.ordering = courseChapter.ordering;
  this.courseId = courseChapter.courseId;
};

CourseChapter.create = (newCourseChapter, result) => {
  connection.query(
    `INSERT INTO courseChapter SET ?`,
    newCourseChapter,
    (err, res) => {
      if (err) {
        console.log("Add courseChapter error:", err);
        result(err, null);
        return;
      }
      result(null, { idCourseChapter: res.insertId, ...newCourseChapter });
    },
  );
};

CourseChapter.getAll = (result) => {
  connection.query(`SELECT * FROM courseChapter`, (err, res) => {
    result(null, res);
  });
};

CourseChapter.findById = (id, result) => {
  connection.query(
    `SELECT * FROM courseChapter WHERE courseId = ${id}`,
    (err, res) => {
      if (err) {
        console.log("Find By ID: courseChapter error:", err);
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

CourseChapter.update = (id, courseChapter, result) => {
  connection.query(
    `UPDATE courseChapter SET ? WHERE idCourseChapter = ${id}`,
    courseChapter,
    (err, res) => {
      if (err) {
        console.log("Error while editing a courseChapter", err);
        result(err, null);
        return;
      }
      result(null, { idCourseChapter: id, ...courseChapter });
    },
  );
};
CourseChapter.delete = (id, result) => {
  connection.query(
    `DELETE FROM courseChapter WHERE idCourseChapter = ${id}`,
    (err, res) => {
      if (err) {
        console.log("Error while deleting a courseChapter", err);
        result(err, null);
        return;
      }
      result(null, {
        message: `CourseChapter ID ${id} has been deleted successfully`,
      });
    },
  );
};
module.exports = CourseChapter;
