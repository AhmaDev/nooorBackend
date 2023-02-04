var express = require("express");
var router = express.Router();
const session = require("../controllers/session.controllers");
var auth = require("../middlewares/auth.middlewares");

router.get("/sessions", auth.roles("Admin"), session.findAll);
router.post("/addSession", auth.roles("Admin"), session.create);
router.get("/session/:id", auth.roles("Admin"), session.findOne);
router.get("/userSessions/:id", auth.roles("Admin"), session.findByUserId);
router.put("/session/:id", auth.roles("Admin"), session.updateOne);
router.delete("/session/:id", auth.roles("Admin"), session.deleteOne);
router.delete("/userSessions/:id", auth.roles("Admin"), session.deleteByUser);

module.exports = router;
