var express = require("express");
var router = express.Router();
const courseQuiz = require("../controllers/courseQuiz.controllers");

router.get("/courseQuizes", courseQuiz.findAll);
router.post("/addCourseQuiz", courseQuiz.create);
router.get("/courseQuiz/:id", courseQuiz.findOne);
router.put("/courseQuiz/:id", courseQuiz.updateOne);
router.delete("/courseQuiz/:id", courseQuiz.deleteOne);

module.exports = router;
