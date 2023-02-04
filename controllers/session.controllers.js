const Session = require("../models/session.models");
exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Body is empty",
    });
  }
  const session = new Session({
    sessionKey: req.body.sessionKey,
    ipAddress: req.body.ipAddress,
    userId: req.body.userId,
    token: req.body.token,
  });
  Session.create(session, (err, data) => {
    if (err) res.sendStatus(500);
    else res.send(data);
  });
};
exports.findAll = (req, res) => {
  Session.getAll((err, data) => {
    if (err) res.sendStatus(500);
    else res.send(data);
  });
};
exports.findByUserId = (req, res) => {
  Session.findByUserId(req.params.id, (err, data) => {
    if (err) res.sendStatus(500);
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Session.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind == "not_found") res.sendStatus(404);
      else res.sendStatus(500);
    } else res.send(data);
  });
};
exports.updateOne = (req, res) => {
  Session.update(req.params.id, req.body, (err, data) => {
    if (err) res.sendStatus(500);
    else res.send(data);
  });
};

exports.deleteOne = (req, res) => {
  Session.delete(req.params.id, (err, data) => {
    if (err) res.sendStatus(500);
    else res.send(data);
  });
};
exports.deleteByUser = (req, res) => {
  Session.deleteByUser(req.params.id, (err, data) => {
    if (err) res.sendStatus(500);
    else res.send(data);
  });
};
