var express = require("express");
var router = express.Router();
const subCategory = require("../controllers/subCategory.controllers");
const uploader = require("../middlewares/upload.middleware");

router.get("/subCategories", subCategory.findAll);
router.get("/subCategories/:id", subCategory.findAllByCatId);
router.post("/addSubCategory", subCategory.create);
router.get("/subCategory/:id", subCategory.findOne);
router.put("/subCategory/:id", subCategory.updateOne);
router.put(
  "/subCategoryIcon/:id",
  uploader.single("file"),
  subCategory.updateIcon,
);
router.delete("/subCategory/:id", subCategory.deleteOne);

module.exports = router;
