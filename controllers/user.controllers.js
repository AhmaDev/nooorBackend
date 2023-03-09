const User = require("../models/user.models");
const jwt = require("jsonwebtoken");
const connection = require("../helpers/db");
require("dotenv").config();
var bcrypt = require("bcryptjs");

exports.login = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Body is empty",
    });
  }
  User.login(req.body, (err, data) => {
    if (err) {
      if (err.kind == "not_found") res.sendStatus(404);
      else if (err.kind == "too_many_logins") res.sendStatus(423);
      else if (err.kind == "banned") res.sendStatus(403);
      else res.sendStatus(500);
    } else {
      const token = jwt.sign(
        JSON.parse(JSON.stringify(data)),
        process.env.SECRET_KEY,
        {
          expiresIn: "30d",
        },
      );
      var sessionKey = (Math.random() * 100000000).toString();
      connection.query(
        `INSERT INTO userSession SET ?`,
        {
          ipAddress: req.headers["x-forwarded-for"] || req.socket.remoteAddress,
          sessionKey: sessionKey,
          token: token,
          userId: data.idUser,
          userAgent: req.headers["user-agent"],
        },
        (err, result) => {
          res.send({ token: token, sessionKey: sessionKey });
        },
      );
    }
  });
};

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Body is empty",
    });
  }
  const user = new User({
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)),
    roleId: req.body.roleId,
    phone: req.body.phone,
  });

  User.create(user, (err, data) => {
    if (err) res.sendStatus(500);
    else res.send(data);
  });
};

exports.sendNotification = (req, res) => {
  User.sendNotifications(req.body, (err, data) => {
    if (err) {
      if (err.kind == "not_found") res.sendStatus(404);
      else res.sendStatus(500);
    } else res.send(data);
  });
};
exports.findAll = (req, res) => {
  User.getAll((err, data) => {
    if (err) res.sendStatus(500);
    else res.send(data);
  });
};

exports.findOne = (req, res) => {};
exports.checkPhoneNumber = (req, res) => {
  User.checkPhoneNumber(req.params.phone, (err, data) => {
    if (err) {
      if (err.kind == "not_found") res.sendStatus(404);
      else res.sendStatus(500);
    } else res.sendStatus(200);
  });
};
exports.findByRoleId = (req, res) => {
  User.findByRoleId(req.params.id, (err, data) => {
    if (err) {
      if (err.kind == "not_found") res.sendStatus(404);
      else res.sendStatus(500);
    } else res.send(data);
  });
};

exports.findSettings = (req, res) => {
  User.getSettings(req.query.variable, (err, data) => {
    if (err) {
      if (err.kind == "not_found") res.sendStatus(404);
      else res.sendStatus(500);
    } else res.send(data);
  });
};

exports.logout = (req, res) => {
  User.logout(req.body.sessionKey, (err, data) => {
    if (err) {
      if (err.kind == "not_found") res.sendStatus(404);
      else res.sendStatus(500);
    } else res.send(data);
  });
};

exports.updateOne = (req, res) => {
  User.update(req.params.id, req.body, (err, data) => {
    if (err) res.sendStatus(500);
    else res.send(data);
  });
};
exports.updateSession = (req, res) => {
  User.updateSession(req.params.key, req.body, (err, data) => {
    if (err) res.sendStatus(500);
    else res.send(data);
  });
};
exports.updatePassword = (req, res) => {
  User.updatePassword(req.params.id, req.body.password, (err, data) => {
    if (err) res.sendStatus(500);
    else res.send(data);
  });
};

exports.deleteOne = (req, res) => {
  User.delete(req.params.id, (err, data) => {
    if (err) res.sendStatus(500);
    else res.send(data);
  });
};
