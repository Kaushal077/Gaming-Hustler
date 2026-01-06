const { ObjectId } = require("mongodb");
const { getDB } = require("../config/database");

// Create new user
const createUser = async (req, res) => {
  try {
    const newUser = req.body;
    const db = getDB();
    const userCollection = db.collection("users");

    // Check if user already exists
    const existingUser = await userCollection.findOne({ email: newUser.email });
    if (existingUser) {
      return res.status(409).json({ 
        error: true, 
        message: "User already exists" 
      });
    }

    const result = await userCollection.insertOne(newUser);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ 
      error: true, 
      message: "Error creating user" 
    });
  }
};

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const db = getDB();
    const userCollection = db.collection("users");
    const users = await userCollection.find({}).toArray();
    
    res.json(users);
  } catch (error) {
    res.status(500).json({ 
      error: true, 
      message: "Error fetching users" 
    });
  }
};

// Get user by ID
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ 
        error: true, 
        message: "Invalid user ID" 
      });
    }

    const db = getDB();
    const userCollection = db.collection("users");
    const user = await userCollection.findOne({ _id: new ObjectId(id) });

    if (!user) {
      return res.status(404).json({ 
        error: true, 
        message: "User not found" 
      });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ 
      error: true, 
      message: "Error fetching user" 
    });
  }
};

// Get user by email
const getUserByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const db = getDB();
    const userCollection = db.collection("users");
    const user = await userCollection.findOne({ email });

    if (!user) {
      return res.status(404).json({ 
        error: true, 
        message: "User not found" 
      });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ 
      error: true, 
      message: "Error fetching user" 
    });
  }
};

// Update user
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = req.body;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ 
        error: true, 
        message: "Invalid user ID" 
      });
    }

    const db = getDB();
    const userCollection = db.collection("users");
    
    const updateDoc = {
      $set: {
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.option || updatedUser.role,
        address: updatedUser.address,
        phone: updatedUser.phone,
        about: updatedUser.about,
        photoUrl: updatedUser.photoUrl,
        skills: updatedUser.skills || null,
      },
    };

    const result = await userCollection.updateOne(
      { _id: new ObjectId(id) },
      updateDoc,
      { upsert: true }
    );

    res.json(result);
  } catch (error) {
    res.status(500).json({ 
      error: true, 
      message: "Error updating user" 
    });
  }
};

// Delete user
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ 
        error: true, 
        message: "Invalid user ID" 
      });
    }

    const db = getDB();
    const userCollection = db.collection("users");
    const result = await userCollection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ 
        error: true, 
        message: "User not found" 
      });
    }

    res.json(result);
  } catch (error) {
    res.status(500).json({ 
      error: true, 
      message: "Error deleting user" 
    });
  }
};

// Get popular instructors
const getPopularInstructors = async (req, res) => {
  try {
    const db = getDB();
    const classesCollection = db.collection("classes");
    
    const pipeline = [
      {
        $group: {
          _id: "$instructorEmail",
          totalEnrolled: { $sum: "$totalEnrolled" },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "email",
          as: "instructor",
        },
      },
      {
        $project: {
          _id: 0,
          instructor: {
            $arrayElemAt: ["$instructor", 0],
          },
          totalEnrolled: 1,
        },
      },
      {
        $sort: {
          totalEnrolled: -1,
        },
      },
      {
        $limit: 6,
      },
    ];
    
    const result = await classesCollection.aggregate(pipeline).toArray();
    res.json(result);
  } catch (error) {
    res.status(500).json({ 
      error: true, 
      message: "Error fetching popular instructors" 
    });
  }
};

// Get all instructors
const getAllInstructors = async (req, res) => {
  try {
    const db = getDB();
    const userCollection = db.collection("users");
    const instructors = await userCollection.find({ role: "instructor" }).toArray();
    res.json(instructors);
  } catch (error) {
    res.status(500).json({ 
      error: true, 
      message: "Error fetching instructors" 
    });
  }
};

// Set user as admin
const setAdmin = async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ 
        error: true, 
        message: "Email is required" 
      });
    }

    const db = getDB();
    const userCollection = db.collection("users");
    
    const result = await userCollection.updateOne(
      { email },
      { $set: { role: "admin" } },
      { upsert: false }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ 
        error: true, 
        message: "User not found" 
      });
    }

    res.json({ 
      success: true, 
      message: `User ${email} is now an admin` 
    });
  } catch (error) {
    res.status(500).json({ 
      error: true, 
      message: "Error setting admin" 
    });
  }
};

// Check if email exists
const checkEmail = async (req, res) => {
  try {
    const { email } = req.query;
    
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const db = getDB();
    const userCollection = db.collection("users");
    const existingUser = await userCollection.findOne({ email });
    
    res.json({ exists: !!existingUser });
  } catch (error) {
    res.status(500).json({ 
      error: true, 
      message: "Error checking email" 
    });
  }
};

module.exports = {
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
};
