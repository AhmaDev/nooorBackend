var express = require("express");
var router = express.Router();
const delegate = require("../controllers/delegate.controllers");

router.get("/delegates", delegate.findAll);
router.post("/addDelegate", delegate.create);
router.get("/delegate/:id", delegate.findOne);
router.get("/delegateInfo/:id", delegate.findByUserId);
router.get("/delegateCourses/:id", delegate.courses);
router.put("/delegate/:id", delegate.updateOne);
router.delete("/delegate/:id", delegate.deleteOne);

module.exports = router;
