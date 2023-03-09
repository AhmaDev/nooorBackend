const LessonFileAnswerImage = require("../models/lessonFileAnswerImage.models");
exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Body is empty",
    });
  }
  const lessonFileAnswerImage = new LessonFileAnswerImage({
    lessonFileAnswerId: req.body.lessonFileAnswerId,
    filePath: req.body.filePath,
  });
  LessonFileAnswerImage.create(lessonFileAnswerImage, (err, data) => {
    if (err) res.sendStatus(500);
    else res.send(data);
  });
};
exports.findAll = (req, res) => {
  LessonFileAnswerImage.getAll((err, data) => {
    if (err) res.sendStatus(500);
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  LessonFileAnswerImage.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind == "not_found") res.sendStatus(404);
      else res.sendStatus(500);
    } else res.send(data);
  });
};
exports.updateOne = (req, res) => {
  LessonFileAnswerImage.update(
    req.params.id,
    req.body,
    req.file,
    (err, data) => {
      if (err) res.sendStatus(500);
      else res.send(data);
    },
  );
};

exports.deleteOne = (req, res) => {
  LessonFileAnswerImage.delete(req.params.id, (err, data) => {
    if (err) res.sendStatus(500);
    else res.send(data);
  });
};
