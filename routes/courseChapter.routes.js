var express = require("express");
var router = express.Router();
const courseChapter = require("../controllers/courseChapter.controllers");

router.get("/courseChapters", courseChapter.findAll);
router.post("/addCourseChapter", courseChapter.create);
router.get("/courseChapter/:id", courseChapter.findOne);
router.put("/courseChapter/:id", courseChapter.updateOne);
router.delete("/courseChapter/:id", courseChapter.deleteOne);

module.exports = router;
