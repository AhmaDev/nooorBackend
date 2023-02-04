var express = require("express");
var router = express.Router();
const user = require("../controllers/user.controllers");
var auth = require("../middlewares/auth.middlewares");

router.get("/users/", auth.roles("Admin"), user.findAll);
router.post("/addUser/", auth.roles("Admin"), user.create);
router.post("/login", user.login);
router.post("/logout", auth.roles("Admin"), user.logout);
router.get("/user/:id", user.findOne);
router.get("/usersByRole/:id", user.findByRoleId);
router.put("/user/:id", auth.roles("Admin"), user.updateOne);
router.put("/updateUserPassword/:id", auth.roles("Admin"), user.updatePassword);
router.delete("/user/:id", auth.roles("Admin"), user.deleteOne);

module.exports = router;
