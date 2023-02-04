const connection = require("../helpers/db");

const Category = function (category) {
  this.categoryTitle = category.categoryTitle;
};

Category.create = (newCategory, result) => {
  connection.query(`INSERT INTO category SET ?`, newCategory, (err, res) => {
    if (err) {
      console.log("Add category error:", err);
      result(err, null);
      return;
    }
    result(null, { idCategory: res.insertId, ...newCategory });
  });
};

Category.getAll = (result) => {
  connection.query(`SELECT * FROM category`, (err, res) => {
    result(null, res);
  });
};

Category.findById = (id, result) => {
  connection.query(
    `SELECT * FROM category WHERE idCategory = ${id}`,
    (err, res) => {
      if (err) {
        console.log("Find By ID: category error:", err);
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

Category.update = (id, category, result) => {
  connection.query(
    `UPDATE category SET ? WHERE idCategory = ${id}`,
    category,
    (err, res) => {
      if (err) {
        console.log("Error while editing a category", err);
        result(err, null);
        return;
      }
      result(null, { idCategory: id, ...category });
    },
  );
};
Category.delete = (id, result) => {
  connection.query(
    `DELETE FROM category WHERE idCategory = ${id}`,
    (err, res) => {
      if (err) {
        console.log("Error while deleting a category", err);
        result(err, null);
        return;
      }
      result(null, {
        message: `Category ID ${id} has been deleted successfully`,
      });
    },
  );
};
module.exports = Category;
