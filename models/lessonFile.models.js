const connection = require("../helpers/db");

const LessonFile = function (lessonFile) {
  this.title = lessonFile.title;
  this.filePath = lessonFile.filePath;
  this.createdBy = lessonFile.createdBy;
  this.lessonId = lessonFile.lessonId;
  this.courseId = lessonFile.courseId;
};

LessonFile.create = (newLessonFile, file, result) => {
  let document = file;
  let body = JSON.parse(newLessonFile.lessonFileInfo);
  connection.query(
    `INSERT INTO lessonFile SET ?`,
    {
      title: body.title,
      createdBy: body.createdBy,
      lessonId: body.lessonId,
      courseId: body.courseId,
      filePath: "files/documents/" + document.filename,
    },
    (err, res) => {
      if (err) {
        console.log("Add lessonFile error:", err);
        result(err, null);
        return;
      }
      result(null, { idLessonFile: res.insertId, ...newLessonFile });
    },
  );
};

LessonFile.getAll = (result) => {
  connection.query(`SELECT * FROM lessonFile`, (err, res) => {
    result(null, res);
  });
};

LessonFile.findById = (id, result) => {
  connection.query(
    `SELECT * FROM lessonFile WHERE idLessonFile = ${id}`,
    (err, res) => {
      if (err) {
        console.log("Find By ID: lessonFile error:", err);
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
LessonFile.findByCourseId = (id, result) => {
  connection.query(
    `SELECT * FROM lessonFile WHERE courseId = ${id}`,
    (err, res) => {
      if (err) {
        console.log("Find By ID: lessonFile error:", err);
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

LessonFile.update = (id, lessonFile, result) => {
  connection.query(
    `UPDATE lessonFile SET ? WHERE idLessonFile = ${id}`,
    lessonFile,
    (err, res) => {
      if (err) {
        console.log("Error while editing a lessonFile", err);
        result(err, null);
        return;
      }
      result(null, { idLessonFile: id, ...lessonFile });
    },
  );
};
LessonFile.delete = (id, result) => {
  connection.query(
    `DELETE FROM lessonFile WHERE idLessonFile = ${id}`,
    (err, res) => {
      if (err) {
        console.log("Error while deleting a lessonFile", err);
        result(err, null);
        return;
      }
      result(null, {
        message: `LessonFile ID ${id} has been deleted successfully`,
      });
    },
  );
};
module.exports = LessonFile;
