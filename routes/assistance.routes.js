var express = require("express");
var router = express.Router();
const assistance = require("../controllers/assistance.controllers");

router.get("/assistances", assistance.findAll);
router.post("/addAssistance", assistance.create);
router.get("/assistance/:id", assistance.findOne);
router.put("/assistance/:id", assistance.updateOne);
router.delete("/assistance/:id", assistance.deleteOne);

module.exports = router;
