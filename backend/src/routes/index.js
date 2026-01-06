const express = require("express");
const router = express.Router();

const authRoutes = require("./authRoutes");
const userRoutes = require("./userRoutes");
const classRoutes = require("./classRoutes");
const tournamentRoutes = require("./tournamentRoutes");
const legacyRoutes = require("./legacyRoutes");

// Route prefixes - New API routes
router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/classes", classRoutes);
router.use("/tournaments", tournamentRoutes);

// Legacy routes (no prefix) for backward compatibility with frontend
router.use("/", legacyRoutes);

module.exports = router;
