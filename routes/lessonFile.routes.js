var express = require("express");
var router = express.Router();
const lessonFile = require("../controllers/lessonFile.controllers");
const uploader = require("../middlewares/upload.middleware");
var auth = require("../middlewares/auth.middlewares");

router.get("/lessonFiles", lessonFile.findAll);
router.post("/addLessonFile", uploader.single("file"), lessonFile.create);
router.post("/addAnswer", uploader.array("file", 3), lessonFile.addAnswer);
router.get("/lessonFile/:id", auth.roles("all"), lessonFile.findOne);
router.get("/studentAnswer", auth.roles("all"), lessonFile.findStudentAnswer);
router.get(
  "/lessonAnswers/:lessonFileId",
  auth.roles("all"),
  lessonFile.findLessonAnswers,
);
router.get("/courseFiles/:id", auth.roles("all"), lessonFile.findByCourseId);
router.put("/lessonFile/:id", lessonFile.updateOne);
router.delete("/lessonFile/:id", lessonFile.deleteOne);

module.exports = router;
