var express = require("express");
var router = express.Router();
const courseChapter = require("../controllers/courseChapter.controllers");
var auth = require("../middlewares/auth.middlewares");

router.get("/courseChapters", auth.roles("all"), courseChapter.findAll);
router.post("/addCourseChapter", auth.roles("Admin"), courseChapter.create);
router.get("/courseChapter/:id", auth.roles("all"), courseChapter.findOne);
router.put("/courseChapter/:id", auth.roles("Admin"), courseChapter.updateOne);
router.delete(
  "/courseChapter/:id",
  auth.roles("Admin"),
  courseChapter.deleteOne,
);

module.exports = router;
