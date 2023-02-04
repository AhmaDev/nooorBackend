const connection = require("../helpers/db");

const Setting = function (setting) {
  this.variable = setting.variable;
  this.value = setting.value;
  this.title = setting.title;
  this.settingType = setting.settingType;
};

Setting.create = (newSetting, result) => {
  connection.query(`INSERT INTO setting SET ?`, newSetting, (err, res) => {
    if (err) {
      console.log("Add setting error:", err);
      result(err, null);
      return;
    }
    result(null, { idSetting: res.insertId, ...newSetting });
  });
};

Setting.getAll = (result) => {
  connection.query(`SELECT * FROM setting`, (err, res) => {
    result(null, res);
  });
};

Setting.findById = (id, result) => {
  connection.query(
    `SELECT * FROM setting WHERE idSetting = ${id}`,
    (err, res) => {
      if (err) {
        console.log("Find By ID: setting error:", err);
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

Setting.update = (id, setting, result) => {
  connection.query(
    `UPDATE setting SET ? WHERE idSetting = ${id}`,
    setting,
    (err, res) => {
      if (err) {
        console.log("Error while editing a setting", err);
        result(err, null);
        return;
      }
      result(null, { idSetting: id, ...setting });
    },
  );
};
Setting.delete = (id, result) => {
  connection.query(
    `DELETE FROM setting WHERE idSetting = ${id}`,
    (err, res) => {
      if (err) {
        console.log("Error while deleting a setting", err);
        result(err, null);
        return;
      }
      result(null, {
        message: `Setting ID ${id} has been deleted successfully`,
      });
    },
  );
};
module.exports = Setting;
