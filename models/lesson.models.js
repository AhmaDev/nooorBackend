const connection = require("../helpers/db");

const Lesson = function (lesson) {
  this.lessonTitle = lesson.lessonTitle;
  this.lessonDescription = lesson.lessonDescription;
  this.image = lesson.image;
  this.file = lesson.file;
  this.createdBy = lesson.createdBy;
  this.unlockDate = lesson.unlockDate;
  this.courseId = lesson.courseId;
  this.courseChapterId = lesson.courseChapterId;
  this.isFree = lesson.isFree;
};

Lesson.create = (newLesson, result) => {
  connection.query(`INSERT INTO lesson SET ?`, newLesson, (err, res) => {
    if (err) {
      console.log("Add lesson error:", err);
      result(err, null);
      return;
    }
    result(null, { idLesson: res.insertId, ...newLesson });
  });
};

Lesson.getAll = (result) => {
  connection.query(`SELECT * FROM lesson`, (err, res) => {
    result(null, res);
  });
};

Lesson.findById = (id, result) => {
  connection.query(
    `SELECT * FROM lesson WHERE idLesson = ${id}`,
    (err, res) => {
      if (err) {
        console.log("Find By ID: lesson error:", err);
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
Lesson.findByCourseId = (id, result) => {
  connection.query(
    `SELECT *, (SELECT IFNULL(COUNT(idComment),0) FROM comment WHERE lessonId = lesson.idLesson) As totalComments FROM lesson WHERE courseId = ${id}`,
    (err, res) => {
      if (err) {
        console.log("Find By ID: lesson error:", err);
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

Lesson.update = (id, lesson, result) => {
  connection.query(
    `UPDATE lesson SET ? WHERE idLesson = ${id}`,
    lesson,
    (err, res) => {
      if (err) {
        console.log("Error while editing a lesson", err);
        result(err, null);
        return;
      }
      result(null, { idLesson: id, ...lesson });
    },
  );
};
Lesson.updateImage = (id, lesson, file, result) => {
  connection.query(
    `UPDATE lesson SET ? WHERE idLesson = ${id}`,
    {
      image: "files/images/" + file.filename,
    },
    (err, res) => {
      if (err) {
        console.log("Error while editing a lesson", err);
        result(err, null);
        return;
      }
      result(null, { idLesson: id, ...lesson });
    },
  );
};
Lesson.delete = (id, result) => {
  connection.query(`DELETE FROM lesson WHERE idLesson = ${id}`, (err, res) => {
    if (err) {
      console.log("Error while deleting a lesson", err);
      result(err, null);
      return;
    }
    result(null, { message: `Lesson ID ${id} has been deleted successfully` });
  });
};
module.exports = Lesson;
