var express = require("express");
var router = express.Router();
const category = require("../controllers/category.controllers");

router.get("/categories", category.findAll);
router.post("/addCategory", category.create);
router.get("/category/:id", category.findOne);
router.put("/category/:id", category.updateOne);
router.delete("/category/:id", category.deleteOne);

module.exports = router;
