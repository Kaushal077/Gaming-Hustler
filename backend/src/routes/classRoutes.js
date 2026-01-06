const express = require("express");
const router = express.Router();
const {
  createClass,
  getAllClasses,
  getAllClassesForManagement,
  getClassesByInstructor,
  getClassById,
  updateClass,
  changeClassStatus,
  deleteClass,
  getPopularClasses
} = require("../controllers/classController");
const { verifyJWT, verifyAdmin, verifyInstructor } = require("../middleware/auth");

// POST /api/classes - Create new class (instructor only)
router.post("/", verifyJWT, verifyInstructor, createClass);

// GET /api/classes - Get all approved classes
router.get("/", getAllClasses);

// GET /api/classes/manage - Get all classes for management (admin only)
router.get("/manage", getAllClassesForManagement);

// GET /api/classes/popular - Get popular classes
router.get("/popular", getPopularClasses);

// GET /api/classes/instructor/:email - Get classes by instructor
router.get("/instructor/:email", verifyJWT, verifyInstructor, getClassesByInstructor);

// GET /api/classes/:id - Get class by ID
router.get("/:id", getClassById);

// PUT /api/classes/:id - Update class (instructor only)
router.put("/:id", verifyJWT, verifyInstructor, updateClass);

// PATCH /api/classes/:id/status - Change class status (admin only)
router.patch("/:id/status", verifyJWT, verifyAdmin, changeClassStatus);

// DELETE /api/classes/:id - Delete class (instructor only)
router.delete("/:id", verifyJWT, verifyInstructor, deleteClass);

module.exports = router;
