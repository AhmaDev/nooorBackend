var express = require("express");
var router = express.Router();
const lessonFile = require("../controllers/lessonFile.controllers");
const uploader = require("../middlewares/upload.middleware");

router.get("/lessonFiles", lessonFile.findAll);
router.post("/addLessonFile", uploader.single("file"), lessonFile.create);
router.get("/lessonFile/:id", lessonFile.findOne);
router.get("/courseFiles/:id", lessonFile.findByCourseId);
router.put("/lessonFile/:id", lessonFile.updateOne);
router.delete("/lessonFile/:id", lessonFile.deleteOne);

module.exports = router;
