const connection = require("../helpers/db");

const SubCategory = function (subCategory) {
  this.subCategoryTitle = subCategory.subCategoryTitle;
  this.categoryId = subCategory.categoryId;
};

SubCategory.create = (newSubCategory, result) => {
  connection.query(
    `INSERT INTO subCategory SET ?`,
    newSubCategory,
    (err, res) => {
      if (err) {
        console.log("Add subCategory error:", err);
        result(err, null);
        return;
      }
      result(null, { idSubCategory: res.insertId, ...newSubCategory });
    },
  );
};

SubCategory.getAll = (result) => {
  connection.query(`SELECT * FROM subCategory`, (err, res) => {
    result(null, res);
  });
};
SubCategory.findAllByCatId = (id, result) => {
  connection.query(
    `SELECT * FROM subCategory WHERE categoryId = ${id}`,
    (err, res) => {
      result(null, res);
    },
  );
};

SubCategory.findById = (id, result) => {
  connection.query(
    `SELECT * FROM subCategory WHERE idSubCategory = ${id}`,
    (err, res) => {
      if (err) {
        console.log("Find By ID: subCategory error:", err);
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

SubCategory.update = (id, subCategory, result) => {
  connection.query(
    `UPDATE subCategory SET ? WHERE idSubCategory = ${id}`,
    subCategory,
    (err, res) => {
      if (err) {
        console.log("Error while editing a subCategory", err);
        result(err, null);
        return;
      }
      result(null, { idSubCategory: id, ...subCategory });
    },
  );
};
SubCategory.updateIcon = (id, file, result) => {
  console.log(file.filename);
  connection.query(
    `UPDATE subCategory SET icon = ? WHERE idSubCategory = ${id}`,
    ["files/images/" + file.filename.toString()],
    (err, res) => {
      if (err) {
        console.log("Error while editing a subCategory", err);
        result(err, null);
        return;
      }
      result(null, { idSubCategory: id });
    },
  );
};
SubCategory.delete = (id, result) => {
  connection.query(
    `DELETE FROM subCategory WHERE idSubCategory = ${id}`,
    (err, res) => {
      if (err) {
        console.log("Error while deleting a subCategory", err);
        result(err, null);
        return;
      }
      result(null, {
        message: `SubCategory ID ${id} has been deleted successfully`,
      });
    },
  );
};
module.exports = SubCategory;
