var express = require("express");
var router = express.Router();
const lessonFileAnswer = require("../controllers/lessonFileAnswer.controllers");

router.get("/lessonFileAnswers", lessonFileAnswer.findAll);
router.post("/addLessonFileAnswer", lessonFileAnswer.create);
router.get("/lessonFileAnswer/:id", lessonFileAnswer.findOne);
router.put("/lessonFileAnswer/:id", lessonFileAnswer.updateOne);
router.delete("/lessonFileAnswer/:id", lessonFileAnswer.deleteOne);

module.exports = router;
