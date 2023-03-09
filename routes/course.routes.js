var express = require("express");
var router = express.Router();
const course = require("../controllers/course.controllers");
const uploader = require("../middlewares/upload.middleware");
var auth = require("../middlewares/auth.middlewares");

router.get("/courses", course.findAll);
router.get("/myCourses/:id", auth.roles("all"), course.myCourses);
router.get("/courseCards/:id", course.getCourseCodes);
router.get("/generateCodes/:length", auth.roles("Admin"), course.generateCodes);
router.post("/addCourse", auth.roles("Admin"), course.create);
router.post("/checkRedeemCode", auth.roles("all"), course.checkRedeemCode);
router.post("/redeem", auth.roles("Student"), course.redeem);
router.get("/course/:id", auth.roles("all"), course.findOne);
router.put("/course/:id", auth.roles("Admin"), course.updateOne);
router.delete("/course/:id", auth.roles("Admin"), course.deleteOne);
router.put(
  "/courseImage/:id",
  uploader.single("file"),
  course.updateCourseImage,
);

module.exports = router;
