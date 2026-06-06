const express = require("express");
const authController = require("../controllers/auth.controller");

const router = express.Router();

// register API - POST /api/auth/register
router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
router.post("/logout", authController.logoutUser);



module.exports = router;
