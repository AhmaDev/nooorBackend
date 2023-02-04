const connection = require("../helpers/db");

const CourseQuiz = function (courseQuiz) {
  this.courseId = courseQuiz.courseId;
  this.courseChapterId = courseQuiz.courseChapterId;
  this.question = courseQuiz.question;
  this.correctAnswer = courseQuiz.correctAnswer;
  this.answerOne = courseQuiz.answerOne;
  this.answerTwo = courseQuiz.answerTwo;
  this.answerThree = courseQuiz.answerThree;
};

CourseQuiz.create = (newCourseQuiz, result) => {
  connection.query(
    `INSERT INTO courseQuiz SET ?`,
    newCourseQuiz,
    (err, res) => {
      if (err) {
        console.log("Add courseQuiz error:", err);
        result(err, null);
        return;
      }
      result(null, { idCourseQuiz: res.insertId, ...newCourseQuiz });
    },
  );
};

CourseQuiz.getAll = (result) => {
  connection.query(`SELECT * FROM courseQuiz`, (err, res) => {
    result(null, res);
  });
};

CourseQuiz.findById = (id, result) => {
  connection.query(
    `SELECT * FROM courseQuiz WHERE courseId = ${id}`,
    (err, res) => {
      if (err) {
        console.log("Find By ID: courseQuiz error:", err);
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

CourseQuiz.update = (id, courseQuiz, result) => {
  connection.query(
    `UPDATE courseQuiz SET ? WHERE idCourseQuiz = ${id}`,
    courseQuiz,
    (err, res) => {
      if (err) {
        console.log("Error while editing a courseQuiz", err);
        result(err, null);
        return;
      }
      result(null, { idCourseQuiz: id, ...courseQuiz });
    },
  );
};
CourseQuiz.delete = (id, result) => {
  connection.query(
    `DELETE FROM courseQuiz WHERE idCourseQuiz = ${id}`,
    (err, res) => {
      if (err) {
        console.log("Error while deleting a courseQuiz", err);
        result(err, null);
        return;
      }
      result(null, {
        message: `CourseQuiz ID ${id} has been deleted successfully`,
      });
    },
  );
};
module.exports = CourseQuiz;
