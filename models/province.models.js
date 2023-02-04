const connection = require("../helpers/db");

const Province = function (province) {
  this.provinceName = province.provinceName;
};

Province.create = (newProvince, result) => {
  connection.query(`INSERT INTO province SET ?`, newProvince, (err, res) => {
    if (err) {
      console.log("Add province error:", err);
      result(err, null);
      return;
    }
    result(null, { idProvince: res.insertId, ...newProvince });
  });
};

Province.getAll = (result) => {
  connection.query(`SELECT * FROM province`, (err, res) => {
    result(null, res);
  });
};

Province.findById = (id, result) => {
  connection.query(
    `SELECT * FROM province WHERE idProvince = ${id}`,
    (err, res) => {
      if (err) {
        console.log("Find By ID: province error:", err);
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

Province.update = (id, province, result) => {
  connection.query(
    `UPDATE province SET ? WHERE idProvince = ${id}`,
    province,
    (err, res) => {
      if (err) {
        console.log("Error while editing a province", err);
        result(err, null);
        return;
      }
      result(null, { idProvince: id, ...province });
    },
  );
};
Province.delete = (id, result) => {
  connection.query(
    `DELETE FROM province WHERE idProvince = ${id}`,
    (err, res) => {
      if (err) {
        console.log("Error while deleting a province", err);
        result(err, null);
        return;
      }
      result(null, {
        message: `Province ID ${id} has been deleted successfully`,
      });
    },
  );
};
module.exports = Province;
