const CourseQuiz = require("../models/courseQuiz.models");
exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Body is empty",
    });
  }
  const courseQuiz = new CourseQuiz({
    courseId: req.body.courseId,
    courseChapterId: req.body.courseChapterId,
    question: req.body.question,
    correctAnswer: req.body.correctAnswer,
    answerOne: req.body.answerOne,
    answerTwo: req.body.answerTwo,
    answerThree: req.body.answerThree,
  });
  CourseQuiz.create(courseQuiz, (err, data) => {
    if (err) res.sendStatus(500);
    else res.send(data);
  });
};
exports.findAll = (req, res) => {
  CourseQuiz.getAll((err, data) => {
    if (err) res.sendStatus(500);
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  CourseQuiz.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind == "not_found") res.sendStatus(404);
      else res.sendStatus(500);
    } else res.send(data);
  });
};
exports.updateOne = (req, res) => {
  CourseQuiz.update(req.params.id, req.body, (err, data) => {
    if (err) res.sendStatus(500);
    else res.send(data);
  });
};

exports.deleteOne = (req, res) => {
  CourseQuiz.delete(req.params.id, (err, data) => {
    if (err) res.sendStatus(500);
    else res.send(data);
  });
};
