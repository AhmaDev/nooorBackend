var express = require("express");
var router = express.Router();
const province = require("../controllers/province.controllers");

router.get("/provinces", province.findAll);
router.post("/addProvince", province.create);
router.get("/province/:id", province.findOne);
router.put("/province/:id", province.updateOne);
router.delete("/province/:id", province.deleteOne);

module.exports = router;
