const connection = require("../helpers/db");

const LessonFileAnswerImage = function (lessonFileAnswerImage) {
  this.lessonFileAnswerId = lessonFileAnswerImage.lessonFileAnswerId;
  this.filePath = lessonFileAnswerImage.filePath;
};

LessonFileAnswerImage.create = (newLessonFileAnswerImage, result) => {
  connection.query(
    `INSERT INTO lessonFileAnswerImage SET ?`,
    newLessonFileAnswerImage,
    (err, res) => {
      if (err) {
        console.log("Add lessonFileAnswerImage error:", err);
        result(err, null);
        return;
      }
      result(null, {
        idLessonFileAnswerImage: res.insertId,
        ...newLessonFileAnswerImage,
      });
    },
  );
};

LessonFileAnswerImage.getAll = (result) => {
  connection.query(`SELECT * FROM lessonFileAnswerImage`, (err, res) => {
    result(null, res);
  });
};

LessonFileAnswerImage.findById = (id, result) => {
  connection.query(
    `SELECT * FROM lessonFileAnswerImage WHERE idLessonFileAnswerImage = ${id}`,
    (err, res) => {
      if (err) {
        console.log("Find By ID: lessonFileAnswerImage error:", err);
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

LessonFileAnswerImage.update = (id, lessonFileAnswerImage, file, result) => {
  let document = file;
  connection.query(
    `UPDATE lessonFileAnswerImage SET ? WHERE idLessonFileAnswerImage = ${id}`,
    {
      filePath: "files/answers/" + document.filename,
    },
    (err, res) => {
      if (err) {
        console.log("Error while editing a lessonFileAnswerImage", err);
        result(err, null);
        return;
      }
      result(null, { idLessonFileAnswerImage: id, ...lessonFileAnswerImage });
    },
  );
};
LessonFileAnswerImage.delete = (id, result) => {
  connection.query(
    `DELETE FROM lessonFileAnswerImage WHERE idLessonFileAnswerImage = ${id}`,
    (err, res) => {
      if (err) {
        console.log("Error while deleting a lessonFileAnswerImage", err);
        result(err, null);
        return;
      }
      result(null, {
        message: `LessonFileAnswerImage ID ${id} has been deleted successfully`,
      });
    },
  );
};
module.exports = LessonFileAnswerImage;
