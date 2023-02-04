var express = require("express");
var router = express.Router();
const setting = require("../controllers/setting.controllers");

router.get("/settings", setting.findAll);
router.post("/addSetting", setting.create);
router.get("/setting/:id", setting.findOne);
router.put("/setting/:id", setting.updateOne);
router.delete("/setting/:id", setting.deleteOne);

module.exports = router;
