const jwt = require("jsonwebtoken");
const { getDB } = require("../config/database");

// Validate ACCESS_SECRET exists
if (!process.env.ACCESS_SECRET) {
  console.error("❌ ACCESS_SECRET environment variable is required");
}

// Generate JWT Token
const generateToken = (req, res) => {
  try {
    const user = req.body;
    
    // Validate required fields
    if (!user || !user.email) {
      return res.status(400).json({ 
        error: true, 
        message: "Email is required to generate token" 
      });
    }

    // Check if ACCESS_SECRET is configured
    if (!process.env.ACCESS_SECRET) {
      console.error("ACCESS_SECRET not configured");
      return res.status(500).json({ 
        error: true, 
        message: "Server configuration error" 
      });
    }

    const token = jwt.sign(
      { email: user.email, name: user.name }, 
      process.env.ACCESS_SECRET, 
      { expiresIn: "24h" }
    );
    
    res.json({ token, expiresIn: "24h" });
  } catch (error) {
    console.error("Token generation error:", error);
    res.status(500).json({ 
      error: true, 
      message: "Error generating token" 
    });
  }
};

// Check if email exists
const checkEmail = async (req, res) => {
  const { email } = req.query;
  
  if (!email) {
    return res.status(400).json({ 
      error: true, 
      message: "Email is required" 
    });
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ 
      error: true, 
      message: "Invalid email format" 
    });
  }

  try {
    const db = getDB();
    const userCollection = db.collection("users");
    const existingUser = await userCollection.findOne({ email });
    
    res.json({ exists: !!existingUser });
  } catch (error) {
    console.error("Check email error:", error);
    res.status(500).json({ 
      error: true, 
      message: "Error checking email" 
    });
  }
};

module.exports = {
  generateToken,
  checkEmail
};
