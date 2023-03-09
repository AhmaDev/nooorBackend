var express = require("express");
var router = express.Router();
const teacher = require("../controllers/teacher.controllers");

router.get("/teachers", teacher.findAll);
router.post("/addTeacher", teacher.create);
router.get("/teacher/:id", teacher.findOne);
router.get("/teacherInfo/:id", teacher.findByUserId);
router.put("/teacher/:id", teacher.updateOne);
router.delete("/teacher/:id", teacher.deleteOne);

module.exports = router;
