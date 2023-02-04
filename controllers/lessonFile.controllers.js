const LessonFile = require("../models/lessonFile.models");
exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Body is empty",
    });
  }
  const lessonFile = new LessonFile({
    title: req.body.title,
    filePath: req.body.filePath,
    createdBy: req.body.createdBy,
    lessonId: req.body.lessonId,
    courseId: req.body.courseId,
  });

  LessonFile.create(req.body, req.file, (err, data) => {
    if (err) res.sendStatus(500);
    else res.send(data);
  });
};
exports.findAll = (req, res) => {
  LessonFile.getAll((err, data) => {
    if (err) res.sendStatus(500);
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  LessonFile.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind == "not_found") res.sendStatus(404);
      else res.sendStatus(500);
    } else res.send(data);
  });
};
exports.findByCourseId = (req, res) => {
  LessonFile.findByCourseId(req.params.id, (err, data) => {
    if (err) {
      if (err.kind == "not_found") res.sendStatus(404);
      else res.sendStatus(500);
    } else res.send(data);
  });
};
exports.updateOne = (req, res) => {
  LessonFile.update(req.params.id, req.body, (err, data) => {
    if (err) res.sendStatus(500);
    else res.send(data);
  });
};

exports.deleteOne = (req, res) => {
  LessonFile.delete(req.params.id, (err, data) => {
    if (err) res.sendStatus(500);
    else res.send(data);
  });
};
