var express = require("express");
var router = express.Router();
const courseStudent = require("../controllers/courseStudent.controllers");

router.get("/courseStudents", courseStudent.findAll);
router.post("/addCourseStudent", courseStudent.create);
router.get("/courseStudent/:id", courseStudent.findOne);
router.put("/courseStudent/:id", courseStudent.updateOne);
router.delete("/courseStudent/:id", courseStudent.deleteOne);

module.exports = router;
