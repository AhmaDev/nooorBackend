const connection = require("../helpers/db");
const fs = require("fs");
const path = require("path");

const Avatar = function (avatar) {
  this.image = avatar.image;
};

Avatar.create = (newAvatar, result) => {
  console.log(newAvatar);
  connection.query(
    `INSERT INTO avatar SET ?`,
    {
      image: "files/avatars/" + newAvatar.files.filename,
    },
    (err, res) => {
      if (err) {
        console.log("Add avatar error:", err);
        result(err, null);
        return;
      }
      result(null, { idAvatar: res.insertId, ...newAvatar });
    },
  );
};

Avatar.getAll = (result) => {
  connection.query(`SELECT * FROM avatar`, (err, res) => {
    result(null, res);
  });
};

Avatar.findById = (id, result) => {
  connection.query(
    `SELECT * FROM avatar WHERE idAvatar = ${id}`,
    (err, res) => {
      if (err) {
        console.log("Find By ID: avatar error:", err);
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

Avatar.update = (id, avatar, result) => {
  connection.query(
    `UPDATE avatar SET ? WHERE idAvatar = ${id}`,
    avatar,
    (err, res) => {
      if (err) {
        console.log("Error while editing a avatar", err);
        result(err, null);
        return;
      }
      result(null, { idAvatar: id, ...avatar });
    },
  );
};
Avatar.delete = (id, result) => {
  connection.query(
    `SELECT * FROM avatar WHERE idAvatar = ${id}`,
    (checkErr, checkRslt) => {
      if (checkRslt.length == 0) {
        result({ kind: "not_found" }, null);
        return;
      }
      connection.query(
        `DELETE FROM avatar WHERE idAvatar = ?`,
        id,
        (err, res) => {
          if (err) {
            console.log("Error while deleting file by ID", err);
            result(err, null);
            return;
          }
          try {
            var finalPath = checkRslt[0].image.split("/");
            fs.unlinkSync(
              path.join(__dirname, "..", "uploads/avatars/" + finalPath[2]),
            );
            result(null, {
              message: `Upload ID ${id} has been deleted successfully`,
            });
          } catch (error) {
            console.error(error);
            result(error, null);
          }
        },
      );
    },
  );
};
module.exports = Avatar;
