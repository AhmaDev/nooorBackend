const connection = require("../helpers/db");

const Student = function (student) {
  this.userId = student.userId;
  this.parentPhone = student.parentPhone;
  this.schoolName = student.schoolName;
  this.avatarId = student.avatarId;
  this.subCategoryId = student.subCategoryId;
};

Student.create = (newStudent, result) => {
  connection.query(`INSERT INTO student SET ?`, newStudent, (err, res) => {
    if (err) {
      console.log("Add student error:", err);
      result(err, null);
      return;
    }
    result(null, { idStudent: res.insertId, ...newStudent });
  });
};

Student.getAll = (result) => {
  connection.query(`SELECT * FROM student`, (err, res) => {
    result(null, res);
  });
};

Student.findById = (id, result) => {
  connection.query(
    `SELECT student.* , user.username FROM student LEFT JOIN user ON student.userId = user.idUser WHERE idStudent = ${id}`,
    (err, res) => {
      if (err) {
        console.log("Find By ID: student error:", err);
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
Student.findByUserId = (id, result) => {
  connection.query(
    `SELECT * FROM student LEFT JOIN user ON student.userId = user.idUser LEFT JOIN avatar ON student.avatarId = avatar.idAvatar LEFT JOIN category ON category.idCategory = student.subCategoryId WHERE student.userId = ${id}`,
    (err, res) => {
      if (err) {
        console.log("Find By ID: student error:", err);
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

Student.update = (id, student, result) => {
  connection.query(
    `UPDATE student SET ? WHERE idStudent = ${id}`,
    student,
    (err, res) => {
      if (err) {
        console.log("Error while editing a student", err);
        result(err, null);
        return;
      }
      result(null, { idStudent: id, ...student });
    },
  );
};
Student.delete = (id, result) => {
  connection.query(
    `DELETE FROM student WHERE idStudent = ${id}`,
    (err, res) => {
      if (err) {
        console.log("Error while deleting a student", err);
        result(err, null);
        return;
      }
      result(null, {
        message: `Student ID ${id} has been deleted successfully`,
      });
    },
  );
};
module.exports = Student;
