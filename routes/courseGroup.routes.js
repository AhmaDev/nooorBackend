var express = require("express");
var router = express.Router();
const courseGroup = require("../controllers/courseGroup.controllers");
var auth = require("../middlewares/auth.middlewares");

router.get("/courseGroups", courseGroup.findAll);
router.post("/addCourseGroup", courseGroup.create);
router.get("/courseGroup/:id", auth.roles("all"), courseGroup.findOne);
router.put("/courseGroup/:id", courseGroup.updateOne);
router.delete("/courseGroup/:id", courseGroup.deleteOne);

module.exports = router;
