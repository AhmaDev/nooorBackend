const connection = require("../helpers/db");

const Delegate = function (delegate) {
  this.userId = delegate.userId;
  this.latitude = delegate.latitude;
  this.longitude = delegate.longitude;
  this.libraryName = delegate.libraryName;
  this.description = delegate.description;
  this.image = delegate.image;
};

Delegate.create = (newDelegate, result) => {
  connection.query(`INSERT INTO delegate SET ?`, newDelegate, (err, res) => {
    if (err) {
      console.log("Add delegate error:", err);
      result(err, null);
      return;
    }
    result(null, { idDelegate: res.insertId, ...newDelegate });
  });
};

Delegate.getAll = (result) => {
  connection.query(`SELECT * FROM delegate`, (err, res) => {
    result(null, res);
  });
};

Delegate.findById = (id, result) => {
  connection.query(
    `SELECT * FROM delegate WHERE idDelegate = ${id}`,
    (err, res) => {
      if (err) {
        console.log("Find By ID: delegate error:", err);
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

Delegate.update = (id, delegate, result) => {
  connection.query(
    `UPDATE delegate SET ? WHERE idDelegate = ${id}`,
    delegate,
    (err, res) => {
      if (err) {
        console.log("Error while editing a delegate", err);
        result(err, null);
        return;
      }
      result(null, { idDelegate: id, ...delegate });
    },
  );
};
Delegate.delete = (id, result) => {
  connection.query(
    `DELETE FROM delegate WHERE idDelegate = ${id}`,
    (err, res) => {
      if (err) {
        console.log("Error while deleting a delegate", err);
        result(err, null);
        return;
      }
      result(null, {
        message: `Delegate ID ${id} has been deleted successfully`,
      });
    },
  );
};
module.exports = Delegate;
