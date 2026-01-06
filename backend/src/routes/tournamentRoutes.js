const express = require("express");
const router = express.Router();
const { verifyJWT, verifyAdmin, verifyInstructor } = require("../middleware/auth");
const {
  getAllTournaments,
  getFeaturedTournaments,
  getTournamentById,
  createTournament,
  updateTournament,
  deleteTournament,
  registerForTournament,
  getTournamentsByHost,
  getAllTournamentsAdmin,
  updateTournamentStatus
} = require("../controllers/tournamentController");

// Public routes - ORDER MATTERS! Specific routes before parameterized routes
router.get("/", getAllTournaments);
router.get("/featured", getFeaturedTournaments);

// Admin routes (must be before /:id)
router.get("/admin/all", verifyJWT, verifyAdmin, getAllTournamentsAdmin);

// Host routes (must be before /:id)
router.get("/host/:email", verifyJWT, getTournamentsByHost);

// Parameterized routes
router.get("/:id", getTournamentById);
router.post("/:id/register", verifyJWT, registerForTournament);
router.put("/:id", verifyJWT, verifyInstructor, updateTournament);
router.delete("/:id", verifyJWT, verifyInstructor, deleteTournament);
router.patch("/:id/status", verifyJWT, verifyAdmin, updateTournamentStatus);

// Create tournament
router.post("/", verifyJWT, verifyInstructor, createTournament);

module.exports = router;
