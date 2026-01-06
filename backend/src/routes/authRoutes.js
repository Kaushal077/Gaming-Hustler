const express = require("express");
const router = express.Router();
const { generateToken, checkEmail } = require("../controllers/authController");

// POST /api/auth/token - Generate JWT token
router.post("/token", generateToken);

// GET /api/auth/check-email - Check if email exists
router.get("/check-email", checkEmail);

module.exports = router;
