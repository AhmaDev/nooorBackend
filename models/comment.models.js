const connection = require("../helpers/db");

const Comment = function (comment) {
  this.userId = comment.userId;
  this.message = comment.message;
  this.parentCommentId = comment.parentCommentId;
  this.isHidden = comment.isHidden;
  this.lessonId = comment.lessonId;
};

Comment.create = (newComment, result) => {
  connection.query(`INSERT INTO comment SET ?`, newComment, (err, res) => {
    if (err) {
      console.log("Add comment error:", err);
      result(err, null);
      return;
    }
    result(null, { idComment: res.insertId, ...newComment });
  });
};

Comment.getAll = (result) => {
  connection.query(`SELECT * FROM comment`, (err, res) => {
    result(null, res);
  });
};
Comment.findByLesson = (id, result) => {
  connection.query(
    `SELECT *, (SELECT username FROM user WHERE comment.userId = user.idUser) As username, (SELECT roleId FROM user WHERE comment.userId = user.idUser) As roleId , IFNULL((SELECT image FROM avatar WHERE avatar.idAvatar = (SELECT avatarId FROM student WHERE student.userId = comment.userId LIMIT 1) LIMIT 1),(SELECT image FROM teacher WHERE teacher.userId = comment.userId LIMIT 1)) As avatar FROM comment WHERE lessonId = ${id} ORDER BY idComment DESC`,
    (err, res) => {
      console.log(err);
      result(null, res);
    },
  );
};

Comment.findById = (id, result) => {
  connection.query(
    `SELECT * FROM comment WHERE idComment = ${id}`,
    (err, res) => {
      if (err) {
        console.log("Find By ID: comment error:", err);
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

Comment.update = (id, comment, result) => {
  connection.query(
    `UPDATE comment SET ? WHERE idComment = ${id}`,
    comment,
    (err, res) => {
      if (err) {
        console.log("Error while editing a comment", err);
        result(err, null);
        return;
      }
      result(null, { idComment: id, ...comment });
    },
  );
};
Comment.delete = (id, result) => {
  connection.query(
    `DELETE FROM comment WHERE idComment = ${id}`,
    (err, res) => {
      if (err) {
        console.log("Error while deleting a comment", err);
        result(err, null);
        return;
      }
      result(null, {
        message: `Comment ID ${id} has been deleted successfully`,
      });
    },
  );
};
module.exports = Comment;
