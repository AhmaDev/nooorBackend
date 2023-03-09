var express = require("express");
var router = express.Router();
const lessonFileAnswerImage = require("../controllers/lessonFileAnswerImage.controllers");
const uploader = require("../middlewares/upload.middleware");
var auth = require("../middlewares/auth.middlewares");

router.get("/lessonFileAnswerImages", lessonFileAnswerImage.findAll);
router.post("/addLessonFileAnswerImage", lessonFileAnswerImage.create);
router.get("/lessonFileAnswerImage/:id", lessonFileAnswerImage.findOne);
router.put(
  "/lessonFileAnswerImage/:id",
  uploader.single("file"),
  lessonFileAnswerImage.updateOne,
);
router.delete("/lessonFileAnswerImage/:id", lessonFileAnswerImage.deleteOne);

module.exports = router;
