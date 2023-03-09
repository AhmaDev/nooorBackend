var express = require("express");
var router = express.Router();
const comment = require("../controllers/comment.controllers");

router.get("/comments", comment.findAll);
router.post("/addComment", comment.create);
router.get("/comment/:id", comment.findOne);
router.get("/lessonComment/:id", comment.findByLesson);
router.put("/comment/:id", comment.updateOne);
router.delete("/comment/:id", comment.deleteOne);

module.exports = router;
