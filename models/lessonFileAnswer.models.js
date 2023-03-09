const connection = require("../helpers/db");

const LessonFileAnswer = function (lessonFileAnswer) {
  this.lessonFileId = lessonFileAnswer.lessonFileId;
  this.studentId = lessonFileAnswer.studentId;
  this.mark = lessonFileAnswer.mark;
};

LessonFileAnswer.create = (newLessonFileAnswer, result) => {
  connection.query(
    `INSERT INTO lessonFileAnswer SET ?`,
    newLessonFileAnswer,
    (err, res) => {
      if (err) {
        console.log("Add lessonFileAnswer error:", err);
        result(err, null);
        return;
      }
      result(null, {
        idLessonFileAnswer: res.insertId,
        ...newLessonFileAnswer,
      });
    },
  );
};

LessonFileAnswer.getAll = (result) => {
  connection.query(`SELECT * FROM lessonFileAnswer`, (err, res) => {
    result(null, res);
  });
};

LessonFileAnswer.findById = (id, result) => {
  connection.query(
    `SELECT * FROM lessonFileAnswer WHERE idLessonFileAnswer = ${id}`,
    (err, res) => {
      if (err) {
        console.log("Find By ID: lessonFileAnswer error:", err);
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

LessonFileAnswer.update = (id, lessonFileAnswer, result) => {
  connection.query(
    `UPDATE lessonFileAnswer SET ? WHERE idLessonFileAnswer = ${id}`,
    lessonFileAnswer,
    (err, res) => {
      if (err) {
        console.log("Error while editing a lessonFileAnswer", err);
        result(err, null);
        return;
      }
      result(null, { idLessonFileAnswer: id, ...lessonFileAnswer });
    },
  );
};
LessonFileAnswer.delete = (id, result) => {
  connection.query(
    `DELETE FROM lessonFileAnswer WHERE idLessonFileAnswer = ${id}`,
    (err, res) => {
      if (err) {
        console.log("Error while deleting a lessonFileAnswer", err);
        result(err, null);
        return;
      }
      result(null, {
        message: `LessonFileAnswer ID ${id} has been deleted successfully`,
      });
    },
  );
};
module.exports = LessonFileAnswer;
