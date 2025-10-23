const express = require("express");
const usersController = require("../controllers/usersController")
const router = express.Router();

router.post("/login", usersController.login);
router.post("/logout", usersController.logout);
router.get("/me", usersController.me);
module.exports = router;