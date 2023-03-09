var express = require("express");
var router = express.Router();
const user = require("../controllers/user.controllers");
var auth = require("../middlewares/auth.middlewares");

router.get("/users/", auth.roles("Admin"), user.findAll);
router.post("/addUser/", user.create);
router.post("/notification/", auth.roles("Admin"), user.sendNotification);
router.post("/login", user.login);
router.post("/logout", user.logout);
router.get("/user/:id", user.findOne);
router.get("/checkPhoneNumber/:phone", user.checkPhoneNumber);
router.get("/usersByRole/:id", user.findByRoleId);
router.put("/user/:id", auth.roles("Admin"), user.updateOne);
router.put("/session/:key", auth.roles("all"), user.updateSession);
router.put("/updateUserPassword/:id", auth.roles("Admin"), user.updatePassword);
router.delete("/user/:id", auth.roles("Admin"), user.deleteOne);

module.exports = router;
