const express = require("express");
const usersController = require("../controllers/usersController")
const router = express.Router();

router.post("/login", usersController.login);
router.post("/logout", usersController.logout);
router.post("/register", usersController.register);
router.get("/me", usersController.me);
router.post("/forgot-password", usersController.forgotPassword);
router.post("/reset-password", usersController.resetPassword);
module.exports = router;