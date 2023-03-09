const connection = require("../helpers/db");
var bcrypt = require("bcryptjs");
const { sendMessage } = require("../middlewares/notifications.middlewares");

const User = function (user) {
  this.username = user.username;
  this.password = user.password;
  this.roleId = user.roleId;
  this.phone = user.phone;
};

User.login = (loginInfo, result) => {
  connection.query(
    `SELECT * FROM user JOIN role ON user.roleId = role.idRole WHERE phone = '${loginInfo.phone}'`,
    (err, res) => {
      if (err) {
        console.log("Login error:", err);
        result(err, null);
        return;
      }
      if (res.length == 0) {
        result({ kind: "not_found" }, null);
      } else {
        // CHECK ENCRYPTED PASSWORD
        if (bcrypt.compareSync(loginInfo.password, res[0].password)) {
          // CHECK IF BANNED
          if (res[0].isActive == 0) {
            result({ kind: "banned" }, null);
            return;
          }
          connection.query(
            `SELECT * FROM userSession WHERE userId = ${res[0].idUser}`,
            (checkErr, checkRslt) => {
              if (checkRslt.length >= 10) {
                result({ kind: "too_many_logins" }, null);
              } else {
                result(null, res[0]);
              }
            },
          );
        } else {
          result({ kind: "not_found" }, null);
          return;
        }
      }
    },
  );
};

User.create = (newUser, result) => {
  connection.query(`INSERT INTO user SET ?`, newUser, (err, res) => {
    if (err) {
      console.log("Add user error:", err);
      result(err, null);
      return;
    }
    result(null, { idUser: res.insertId, ...newUser });
  });
};

User.sendNotifications = (body, result) => {
  sendMessage({
    title: body.title,
    body: body.body,
    recievers: recievers,
  });
  result(null, { message: "done" });
};

User.findById = (id, result) => {
  connection.query(
    `SELECT idUser, username, roleId, roleName FROM user JOIN role ON user.roleId = role.idRole WHERE idUser = ${id}`,
    (err, res) => {
      if (err) {
        console.log("Find user by ID error:", err);
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
User.checkPhoneNumber = (phone, result) => {
  connection.query(
    `SELECT * FROM user WHERE phone = '${phone}'`,
    (err, res) => {
      if (err) {
        console.log("Find user by ID error:", err);
        result(err, null);
        return;
      }
      if (res.length == 0) {
        result({ kind: "not_found" }, null);
      } else {
        result(null, "ok");
      }
    },
  );
};
User.findByRoleId = (id, result) => {
  let query =
    "SELECT * , '********' as password FROM user JOIN role ON user.roleId = role.idRole WHERE roleId = 0";
  if (id == 1) {
    // ? ADMINS
    query = `SELECT * , '********' as password FROM user JOIN role ON user.roleId = role.idRole WHERE roleId = ${id}`;
  }
  if (id == 2) {
    // ? DELEGATES
    query = `SELECT * , '********' as password FROM user JOIN role ON user.roleId = role.idRole LEFT JOIN delegate ON delegate.userId = user.idUser WHERE roleId = ${id}`;
  }
  if (id == 3) {
    // ? TEACHERS
    query = `SELECT * , '********' as password FROM user JOIN role ON user.roleId = role.idRole LEFT JOIN teacher ON teacher.userId = user.idUser WHERE roleId = ${id}`;
  }
  if (id == 4) {
    // ? STUDENTS
    query = `SELECT * , '********' as password FROM user JOIN role ON user.roleId = role.idRole LEFT JOIN student ON student.userId = user.idUser LEFT JOIN avatar ON avatar.idAvatar = student.avatarId LEFT JOIN subCategory ON subCategory.idSubCategory = student.subCategoryId WHERE roleId = ${id}`;
  }
  if (id == 5) {
    // ? ASSISTANCES
    query = `SELECT * , '********' as password FROM user JOIN role ON user.roleId = role.idRole LEFT JOIN assistance ON assistance.userId = user.idUser WHERE roleId = ${id}`;
  }
  connection.query(`${query}`, (err, res) => {
    if (err) {
      console.log("Find user by ID error:", err);
      result(err, null);
      return;
    }
    if (res.length == 0) {
      result({ kind: "not_found" }, null);
    } else {
      result(null, res);
    }
  });
};

User.getAll = (result) => {
  connection.query(
    `SELECT idUser, username, roleId, roleName FROM user JOIN role ON user.roleId = role.idRole`,
    (err, res) => {
      result(null, res);
    },
  );
};

User.getSettings = (variable, result) => {
  connection.query(
    `SELECT settings.value FROM settings WHERE variable = ?`,
    [variable],
    (err, res) => {
      if (res.length > 0) {
        result(null, res[0]);
      } else {
        result(err, null);
      }
    },
  );
};

User.logout = (sessionKey, result) => {
  connection.query(
    `DELETE FROM userSession WHERE sessionKey = ${sessionKey}`,
    (err, res) => {
      result(null, { message: "done" });
    },
  );
};

User.update = (id, user, result) => {
  connection.query(
    `UPDATE user SET ? WHERE idUser = ${id}`,
    user,
    (err, res) => {
      if (err) {
        console.log("Error while editing a user", err);
        result(err, null);
        return;
      }
      result(null, { idUser: id, ...user });
    },
  );
};
User.updateSession = (key, user, result) => {
  connection.query(
    `UPDATE userSession SET ? WHERE sessionKey = ${key}`,
    user,
    (err, res) => {
      if (err) {
        console.log("Error while editing a user", err);
        result(err, null);
        return;
      }
      result(null, { message: "done" });
    },
  );
};
User.updatePassword = (id, password, result) => {
  connection.query(
    `UPDATE user SET password = ? WHERE idUser = ${id}`,
    [bcrypt.hashSync(password, bcrypt.genSaltSync(10))],
    (err, res) => {
      if (err) {
        console.log("Error while editing a user", err);
        result(err, null);
        return;
      }
      result(null, { idUser: id });
    },
  );
};

User.delete = (id, result) => {
  connection.query(`DELETE FROM User WHERE idUser = ${id}`, (err, res) => {
    if (err) {
      console.log("Error while deleting a user", err);
      result(err, null);
      return;
    }
    result(null, { message: `User ID ${id} has been deleted successfully` });
  });
};
module.exports = User;
