const connection = require("../helpers/db");

const Teacher = function (teacher) {
  this.userId = teacher.userId;
  this.specialty = teacher.specialty;
  this.schoolName = teacher.schoolName;
  this.image = teacher.image;
  this.description = teacher.description;
};

Teacher.create = (newTeacher, result) => {
  connection.query(`INSERT INTO teacher SET ?`, newTeacher, (err, res) => {
    if (err) {
      console.log("Add teacher error:", err);
      result(err, null);
      return;
    }
    result(null, { idTeacher: res.insertId, ...newTeacher });
  });
};

Teacher.getAll = (result) => {
  connection.query(`SELECT * FROM teacher`, (err, res) => {
    result(null, res);
  });
};

Teacher.findById = (id, result) => {
  connection.query(
    `SELECT * FROM teacher WHERE idTeacher = ${id}`,
    (err, res) => {
      if (err) {
        console.log("Find By ID: teacher error:", err);
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

Teacher.update = (id, teacher, result) => {
  connection.query(
    `UPDATE teacher SET ? WHERE idTeacher = ${id}`,
    teacher,
    (err, res) => {
      if (err) {
        console.log("Error while editing a teacher", err);
        result(err, null);
        return;
      }
      result(null, { idTeacher: id, ...teacher });
    },
  );
};
Teacher.delete = (id, result) => {
  connection.query(
    `DELETE FROM teacher WHERE idTeacher = ${id}`,
    (err, res) => {
      if (err) {
        console.log("Error while deleting a teacher", err);
        result(err, null);
        return;
      }
      result(null, {
        message: `Teacher ID ${id} has been deleted successfully`,
      });
    },
  );
};
module.exports = Teacher;
