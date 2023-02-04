var express = require("express");
var router = express.Router();
const courseDelegate = require("../controllers/courseDelegate.controllers");

router.get("/courseDelegates", courseDelegate.findAll);
router.post("/addCourseDelegate", courseDelegate.create);
router.get("/courseDelegate/:id", courseDelegate.findOne);
router.put("/courseDelegate/:id", courseDelegate.updateOne);
router.delete("/courseDelegate/:id", courseDelegate.deleteOne);

module.exports = router;
