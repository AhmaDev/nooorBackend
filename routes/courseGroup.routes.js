var express = require("express");
var router = express.Router();
const courseGroup = require("../controllers/courseGroup.controllers");

router.get("/courseGroups", courseGroup.findAll);
router.post("/addCourseGroup", courseGroup.create);
router.get("/courseGroup/:id", courseGroup.findOne);
router.put("/courseGroup/:id", courseGroup.updateOne);
router.delete("/courseGroup/:id", courseGroup.deleteOne);

module.exports = router;
