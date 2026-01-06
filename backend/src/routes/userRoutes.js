const express = require("express");
const router = express.Router();
const {
  createUser,
  getAllUsers,
  getUserById,
  getUserByEmail,
  updateUser,
  deleteUser,
  getPopularInstructors,
  getAllInstructors,
  setAdmin,
  checkEmail
} = require("../controllers/userController");
const { verifyJWT, verifyAdmin } = require("../middleware/auth");

// POST /api/users - Create new user
router.post("/", createUser);

// GET /api/users - Get all users (admin only)
router.get("/", getAllUsers);

// GET /api/users/check-email - Check if email exists
router.get("/check-email", checkEmail);

// GET /api/users/instructors - Get all instructors
router.get("/instructors", getAllInstructors);

// GET /api/users/popular-instructors - Get popular instructors
router.get("/popular-instructors", getPopularInstructors);

// POST /api/users/set-admin - Set user as admin
router.post("/set-admin", setAdmin);

// GET /api/users/:id - Get user by ID
router.get("/:id", getUserById);

// GET /api/users/email/:email - Get user by email
router.get("/email/:email", verifyJWT, getUserByEmail);

// PUT /api/users/:id - Update user (admin only)
router.put("/:id", verifyJWT, verifyAdmin, updateUser);

// DELETE /api/users/:id - Delete user (admin only)
router.delete("/:id", verifyJWT, verifyAdmin, deleteUser);

module.exports = router;
