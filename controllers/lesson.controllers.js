const Lesson = require("../models/lesson.models");
exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Body is empty",
    });
  }
  const lesson = new Lesson({
    lessonTitle: req.body.lessonTitle,
    lessonDescription: req.body.lessonDescription,
    image: req.body.image,
    file: req.body.file,
    createdBy: req.body.createdBy,
    unlockDate: req.body.unlockDate,
    courseId: req.body.courseId,
    courseChapterId: req.body.courseChapterId,
    isFree: req.body.isFree,
  });
  Lesson.create(lesson, (err, data) => {
    if (err) res.sendStatus(500);
    else res.send(data);
  });
};
exports.findAll = (req, res) => {
  Lesson.getAll((err, data) => {
    if (err) res.sendStatus(500);
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Lesson.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind == "not_found") res.sendStatus(404);
      else res.sendStatus(500);
    } else res.send(data);
  });
};
exports.findByCourseId = (req, res) => {
  Lesson.findByCourseId(req.params.id, (err, data) => {
    if (err) {
      if (err.kind == "not_found") res.sendStatus(404);
      else res.sendStatus(500);
    } else res.send(data);
  });
};
exports.updateOne = (req, res) => {
  Lesson.update(req.params.id, req.body, (err, data) => {
    if (err) res.sendStatus(500);
    else res.send(data);
  });
};
exports.updateImage = (req, res) => {
  Lesson.updateImage(req.params.id, req.body, req.file, (err, data) => {
    if (err) res.sendStatus(500);
    else res.send(data);
  });
};

exports.deleteOne = (req, res) => {
  Lesson.delete(req.params.id, (err, data) => {
    if (err) res.sendStatus(500);
    else res.send(data);
  });
};
