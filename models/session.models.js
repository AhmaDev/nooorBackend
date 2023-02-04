const connection = require("../helpers/db");

const Session = function (session) {
  this.sessionKey = session.sessionKey;
  this.ipAddress = session.ipAddress;
  this.userId = session.userId;
  this.token = session.token;
};

Session.create = (newSession, result) => {
  connection.query(`INSERT INTO userSession SET ?`, newSession, (err, res) => {
    if (err) {
      console.log("Add session error:", err);
      result(err, null);
      return;
    }
    result(null, { idSession: res.insertId, ...newSession });
  });
};

Session.getAll = (result) => {
  connection.query(`SELECT * FROM userSession`, (err, res) => {
    result(null, res);
  });
};

Session.findById = (id, result) => {
  connection.query(
    `SELECT * FROM userSession WHERE idSession = ${id}`,
    (err, res) => {
      if (err) {
        console.log("Find By ID: session error:", err);
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
Session.findByUserId = (id, result) => {
  connection.query(
    `SELECT * FROM userSession WHERE userId = ${id}`,
    (err, res) => {
      if (err) {
        console.log("Find By ID: session error:", err);
        result(err, null);
        return;
      }
      result(null, res);
    },
  );
};

Session.update = (id, session, result) => {
  connection.query(
    `UPDATE userSession SET ? WHERE idSession = ${id}`,
    session,
    (err, res) => {
      if (err) {
        console.log("Error while editing a session", err);
        result(err, null);
        return;
      }
      result(null, { idSession: id, ...session });
    },
  );
};
Session.delete = (id, result) => {
  connection.query(
    `DELETE FROM userSession WHERE idSession = ${id}`,
    (err, res) => {
      if (err) {
        console.log("Error while deleting a session", err);
        result(err, null);
        return;
      }
      result(null, {
        message: `Session ID ${id} has been deleted successfully`,
      });
    },
  );
};
Session.deleteByUser = (id, result) => {
  connection.query(
    `DELETE FROM userSession WHERE userId = ${id}`,
    (err, res) => {
      if (err) {
        console.log("Error while deleting a session", err);
        result(err, null);
        return;
      }
      result(null, {
        message: `Session ID ${id} has been deleted successfully`,
      });
    },
  );
};
module.exports = Session;
