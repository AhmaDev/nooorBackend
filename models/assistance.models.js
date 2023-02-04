const connection = require("../helpers/db");

const Assistance = function (assistance) {
  this.userId = assistance.userId;
  this.canViewReports = assistance.canViewReports;
};

Assistance.create = (newAssistance, result) => {
  connection.query(
    `INSERT INTO assistance SET ?`,
    newAssistance,
    (err, res) => {
      if (err) {
        console.log("Add assistance error:", err);
        result(err, null);
        return;
      }
      result(null, { idAssistance: res.insertId, ...newAssistance });
    },
  );
};

Assistance.getAll = (result) => {
  connection.query(`SELECT * FROM assistance`, (err, res) => {
    result(null, res);
  });
};

Assistance.findById = (id, result) => {
  connection.query(
    `SELECT * FROM assistance WHERE idAssistance = ${id}`,
    (err, res) => {
      if (err) {
        console.log("Find By ID: assistance error:", err);
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

Assistance.update = (id, assistance, result) => {
  connection.query(
    `UPDATE assistance SET ? WHERE idAssistance = ${id}`,
    assistance,
    (err, res) => {
      if (err) {
        console.log("Error while editing a assistance", err);
        result(err, null);
        return;
      }
      result(null, { idAssistance: id, ...assistance });
    },
  );
};
Assistance.delete = (id, result) => {
  connection.query(
    `DELETE FROM assistance WHERE idAssistance = ${id}`,
    (err, res) => {
      if (err) {
        console.log("Error while deleting a assistance", err);
        result(err, null);
        return;
      }
      result(null, {
        message: `Assistance ID ${id} has been deleted successfully`,
      });
    },
  );
};
module.exports = Assistance;
