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

LessonFile.addAnswer = (newLessonFile, file, result) => {
  connection.query(
    `INSERT INTO lessonFileAnswer SET ?`,
    {
      studentId: parseInt(newLessonFile.studentId),
      lessonFileId: parseInt(newLessonFile.fileId),
    },
    (err, res) => {
      var id = res.insertId;
      for (let i = 0; i < file.length; i++) {
        connection.query(`INSERT INTO lessonFileAnswerImage SET ?`, {
          filePath: "files/answers/" + file[i].filename,
          lessonFileAnswerId: id,
        });
      }
      result(null, { message: "done" });
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
LessonFile.findStudentAnswer = (studentId, lessonFileId, result) => {
  connection.query(
    `SELECT * FROM lessonFileAnswer WHERE studentId = ${studentId} AND lessonFileId = ${lessonFileId}`,
    (err, res) => {
      if (err) {
        console.log("Find By ID: lessonFile error:", err);
        result(err, null);
        return;
      }
      if (res.length == 0) {
        result({ kind: "not_found" }, null);
      } else {
        connection.query(
          `SELECT * FROM lessonFileAnswerImage WHERE lessonFileAnswerId = ${res[0].idLessonFileAnswer}`,
          (lfaErr, lfaRes) => {
            res[0].images = lfaRes;
            result(null, res[0]);
          },
        );
      }
    },
  );
};

LessonFile.findLessonAnswers = (lessonFileId, result) => {
  connection.query(
    `SELECT lessonFileAnswer.*, user.username, student.*, avatar.* FROM lessonFileAnswer JOIN user on user.idUser = lessonFileAnswer.studentId JOIN student ON student.userId = user.idUser LEFT JOIN avatar ON student.avatarId = avatar.idAvatar WHERE lessonFileId = ${lessonFileId}`,
    (err, res) => {
      if (err) {
        console.log("Find By ID: lessonFile error:", err);
        result(err, null);
        return;
      }
      result(null, res);
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
