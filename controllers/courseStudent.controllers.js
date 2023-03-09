const CourseStudent = require("../models/courseStudent.models");
exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Body is empty",
    });
  }
  const courseStudent = new CourseStudent({
    courseId: req.body.courseId,
    studentId: req.body.studentId,
    status: req.body.status,
    createdBy: req.body.createdBy,
    delegateId: req.body.delegateId,
    discount: req.body.discount,
    price: req.body.price,
    total: req.body.total,
    courseGroupId: req.body.courseGroupId,
  });
  CourseStudent.create(courseStudent, (err, data) => {
    if (err) res.sendStatus(500);
    else res.send(data);
  });
};
exports.findAll = (req, res) => {
  CourseStudent.getAll((err, data) => {
    if (err) res.sendStatus(500);
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  CourseStudent.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind == "not_found") res.sendStatus(404);
      else res.sendStatus(500);
    } else res.send(data);
  });
};
exports.findByCourseId = (req, res) => {
  CourseStudent.findByCourseId(req.params.id, (err, data) => {
    if (err) {
      if (err.kind == "not_found") res.sendStatus(404);
      else res.sendStatus(500);
    } else res.send(data);
  });
};
exports.updateOne = (req, res) => {
  CourseStudent.update(req.params.id, req.body, (err, data) => {
    if (err) res.sendStatus(500);
    else res.send(data);
  });
};

exports.deleteOne = (req, res) => {
  CourseStudent.delete(req.params.id, (err, data) => {
    if (err) res.sendStatus(500);
    else res.send(data);
  });
};
