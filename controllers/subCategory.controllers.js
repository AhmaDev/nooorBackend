const SubCategory = require("../models/subCategory.models");
exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Body is empty",
    });
  }
  const subCategory = new SubCategory({
    subCategoryTitle: req.body.subCategoryTitle,
    categoryId: req.body.categoryId,
  });
  SubCategory.create(subCategory, (err, data) => {
    if (err) res.sendStatus(500);
    else res.send(data);
  });
};
exports.findAll = (req, res) => {
  SubCategory.getAll((err, data) => {
    if (err) res.sendStatus(500);
    else res.send(data);
  });
};
exports.findAllByCatId = (req, res) => {
  SubCategory.findAllByCatId(req.params.id, (err, data) => {
    if (err) res.sendStatus(500);
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  SubCategory.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind == "not_found") res.sendStatus(404);
      else res.sendStatus(500);
    } else res.send(data);
  });
};
exports.updateOne = (req, res) => {
  SubCategory.update(req.params.id, req.body, (err, data) => {
    if (err) res.sendStatus(500);
    else res.send(data);
  });
};
exports.updateIcon = (req, res) => {
  SubCategory.updateIcon(req.params.id, req.file, (err, data) => {
    if (err) res.sendStatus(500);
    else res.send(data);
  });
};

exports.deleteOne = (req, res) => {
  SubCategory.delete(req.params.id, (err, data) => {
    if (err) res.sendStatus(500);
    else res.send(data);
  });
};
