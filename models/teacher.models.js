const connection = require("../helpers/db");

const Teacher = function (teacher) {
  this.userId = teacher.userId;
  this.specialty = teacher.specialty;
  this.schoolName = teacher.schoolName;
  this.image = teacher.image;
  this.description = teacher.description;
  this.categoryId = teacher.categoryId;
  this.subCategoryId = teacher.subCategoryId;
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

Teacher.getAll = (req, result) => {
  let query = "";
  let order = "";
  let limit = "";

  if (req.query.username != undefined) {
    query = query + ` AND user.username LIKE '%${req.query.username}%'`;
  }

  if (req.query.categoryId != undefined) {
    query = query + ` AND teacher.categoryId IN (${req.query.categoryId})`;
  }
  if (req.query.subCategoryId != undefined) {
    query =
      query + ` AND teacher.subCategoryId IN (${req.query.subCategoryId})`;
  }
  if (req.query.order != undefined) {
    order = "ORDER BY " + req.query.order + " " + req.query.sort;
  }

  if (req.query.limit != undefined) {
    limit = `LIMIT ${req.query.limit}`;
  }
  connection.query(
    `SELECT teacher.*, user.username, user.phone FROM teacher JOIN user ON teacher.userId = user.idUser WHERE user.isActive = 1 ${query} ${order} ${limit}`,
    (err, res) => {
      result(null, res);
    },
  );
};

Teacher.findById = (id, result) => {
  connection.query(
    `SELECT teacher.*, user.username, user.phone FROM teacher JOIN user ON teacher.userId = user.idUser WHERE user.idUser = ${id}`,
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

Teacher.findByUserId = (id, result) => {
  connection.query(
    `SELECT * FROM teacher LEFT JOIN user ON teacher.userId = user.idUser LEFT JOIN category ON category.idCategory = teacher.categoryId LEFT JOIN subCategory ON category.idCategory = teacher.subCategoryId WHERE teacher.userId = ${id}`,
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
