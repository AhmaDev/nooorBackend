const Course = require("../models/course.models");
exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Body is empty",
    });
  }
  const course = new Course({
    title: req.body.title,
    description: req.body.description,
    createdBy: req.body.createdBy,
    price: req.body.price,
    rating: req.body.rating,
    categoryId: req.body.categoryId,
    subCategoryId: req.body.subCategoryId,
    platformPrice: req.body.platformPrice,
    iapId: req.body.iapId,
  });
  Course.create(course, (err, data) => {
    if (err) res.sendStatus(500);
    else res.send(data);
  });
};
exports.findAll = (req, res) => {
  Course.getAll(req, (err, data) => {
    if (err) {
      if (err.kind == "not_found") res.sendStatus(404);
      else res.sendStatus(500);
    } else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Course.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind == "not_found") res.sendStatus(404);
      else res.sendStatus(500);
    } else res.send(data);
  });
};
exports.updateOne = (req, res) => {
  Course.update(req.params.id, req.body, (err, data) => {
    if (err) res.sendStatus(500);
    else res.send(data);
  });
};
exports.updateCourseImage = (req, res) => {
  Course.updateCourseImage(req.params.id, req.body, req.file, (err, data) => {
    if (err) res.sendStatus(500);
    else res.send(data);
  });
};

exports.deleteOne = (req, res) => {
  Course.delete(req.params.id, (err, data) => {
    if (err) res.sendStatus(500);
    else res.send(data);
  });
};
