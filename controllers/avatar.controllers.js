const Avatar = require("../models/avatar.models");
exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Body is empty",
    });
  }
  const avatar = new Avatar({
    image: req.body.image,
  });
  Avatar.create({ avatar, files: req.file }, (err, data) => {
    if (err) res.sendStatus(500);
    else res.send(data);
  });
};
exports.findAll = (req, res) => {
  Avatar.getAll((err, data) => {
    if (err) res.sendStatus(500);
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Avatar.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind == "not_found") res.sendStatus(404);
      else res.sendStatus(500);
    } else res.send(data);
  });
};
exports.updateOne = (req, res) => {
  Avatar.update(req.params.id, req.body, (err, data) => {
    if (err) res.sendStatus(500);
    else res.send(data);
  });
};

exports.deleteOne = (req, res) => {
  Avatar.delete(req.params.id, (err, data) => {
    if (err) res.sendStatus(500);
    else res.send(data);
  });
};
