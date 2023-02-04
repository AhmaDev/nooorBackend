var express = require("express");
var router = express.Router();
const course = require("../controllers/course.controllers");
const uploader = require("../middlewares/upload.middleware");

router.get("/courses", course.findAll);
router.post("/addCourse", course.create);
router.get("/course/:id", course.findOne);
router.delete("/course/:id", course.deleteOne);
router.put(
  "/courseImage/:id",
  uploader.single("file"),
  course.updateCourseImage,
);

module.exports = router;
