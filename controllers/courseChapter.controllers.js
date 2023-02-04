const CourseChapter = require("../models/courseChapter.models");
exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Body is empty",
    });
  }
  const courseChapter = new CourseChapter({
    chapterTitle: req.body.chapterTitle,
    ordering: req.body.ordering,
    courseId: req.body.courseId,
  });
  CourseChapter.create(courseChapter, (err, data) => {
    if (err) res.sendStatus(500);
    else res.send(data);
  });
};
exports.findAll = (req, res) => {
  CourseChapter.getAll((err, data) => {
    if (err) res.sendStatus(500);
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  CourseChapter.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind == "not_found") res.sendStatus(404);
      else res.sendStatus(500);
    } else res.send(data);
  });
};
exports.updateOne = (req, res) => {
  CourseChapter.update(req.params.id, req.body, (err, data) => {
    if (err) res.sendStatus(500);
    else res.send(data);
  });
};

exports.deleteOne = (req, res) => {
  CourseChapter.delete(req.params.id, (err, data) => {
    if (err) res.sendStatus(500);
    else res.send(data);
  });
};
