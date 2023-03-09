const Comment = require("../models/comment.models");
exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Body is empty",
    });
  }
  const comment = new Comment({
    userId: req.body.userId,
    message: req.body.message,
    parentCommentId: req.body.parentCommentId,
    isHidden: req.body.isHidden,
    lessonId: req.body.lessonId,
  });
  Comment.create(comment, (err, data) => {
    if (err) res.sendStatus(500);
    else res.send(data);
  });
};
exports.findAll = (req, res) => {
  Comment.getAll((err, data) => {
    if (err) res.sendStatus(500);
    else res.send(data);
  });
};
exports.findByLesson = (req, res) => {
  Comment.findByLesson(req.params.id, (err, data) => {
    if (err) res.sendStatus(500);
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Comment.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind == "not_found") res.sendStatus(404);
      else res.sendStatus(500);
    } else res.send(data);
  });
};
exports.updateOne = (req, res) => {
  Comment.update(req.params.id, req.body, (err, data) => {
    if (err) res.sendStatus(500);
    else res.send(data);
  });
};

exports.deleteOne = (req, res) => {
  Comment.delete(req.params.id, (err, data) => {
    if (err) res.sendStatus(500);
    else res.send(data);
  });
};
