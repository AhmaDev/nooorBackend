var express = require("express");
var router = express.Router();
const lesson = require("../controllers/lesson.controllers");
const multer = require("multer");
const ffmpeg = require("fluent-ffmpeg");
const fs = require("fs");
const path = require("path");
const upload = multer({
  dest: path.join(__dirname, "..", "uploads/"),
});
const uploader = require("../middlewares/upload.middleware");
var auth = require("../middlewares/auth.middlewares");

router.get("/lessons", lesson.findAll);
router.post("/addLesson", lesson.create);
router.get("/lesson/:id", auth.roles("all"), lesson.findOne);
router.get("/courseLessons/:id", auth.roles("all"), lesson.findByCourseId);
router.put("/lesson/:id", lesson.updateOne);
router.put("/lessonImage/:id", uploader.single("file"), lesson.updateImage);
router.delete("/lesson/:id", lesson.deleteOne);

router.post("/videoUpload", upload.single("video"), (req, res) => {
  const video = req.file;
  let file = `${Date.now()}_${video.originalname}`;
  let fileName = `uploads/videos/` + file;
  ffmpeg(video.path)
    .on("end", () => {
      res.send({
        status: 200,
        message: "Uploaded Successfully!",
        path: file,
      });
    })
    .on("error", (err) => {
      res.send(`Error compressing video: ${err}`);
    })
    .save(path.join(__dirname, "..", `${fileName}`))
    .size("854x480")
    .videoBitrate("512k")
    .audioBitrate("128k")
    .on("progress", (progress) => {
      console.log(`Processing: ${progress.percent}% done`);
    })
    .on("end", () => {
      // Remove the original file after it has been compressed
      fs.unlinkSync(video.path);
    });
});

module.exports = router;
