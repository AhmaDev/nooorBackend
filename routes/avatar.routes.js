var express = require("express");
var router = express.Router();
const avatar = require("../controllers/avatar.controllers");
var auth = require("../middlewares/auth.middlewares");
const uploader = require("../middlewares/upload.middleware");

router.get("/avatars", avatar.findAll);
router.post(
  "/addAvatar",
  auth.roles("Admin"),
  uploader.single("file"),
  avatar.create,
);
router.get("/avatar/:id", avatar.findOne);
router.put("/avatar/:id", auth.roles("Admin"), avatar.updateOne);
router.delete("/avatar/:id", auth.roles("Admin"), avatar.deleteOne);

module.exports = router;
