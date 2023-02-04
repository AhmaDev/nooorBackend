var express = require("express");
var router = express.Router();
const student = require("../controllers/student.controllers");

router.get("/students", student.findAll);
router.post("/addStudent", student.create);
router.get("/student/:id", student.findOne);
router.put("/student/:id", student.updateOne);
router.delete("/student/:id", student.deleteOne);

module.exports = router;
