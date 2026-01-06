const jwt = require("jsonwebtoken");
const { getDB } = require("../config/database");

// Verify JWT Token
const verifyJWT = (req, res, next) => {
  const authorization = req.headers.authorization;
  
  if (!authorization) {
    return res.status(401).json({ 
      error: true, 
      message: "Unauthorized access - No token provided" 
    });
  }

  const token = authorization.split(" ")[1];
  
  jwt.verify(token, process.env.ACCESS_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ 
        error: true, 
        message: "Forbidden - Invalid or expired token" 
      });
    }
    req.decoded = decoded;
    next();
  });
};

// Verify Admin
const verifyAdmin = async (req, res, next) => {
  const email = req.decoded.email;
  const db = getDB();
  const userCollection = db.collection("users");
  
  try {
    const user = await userCollection.findOne({ email });
    
    if (!user || user.role !== "admin") {
      return res.status(403).json({ 
        error: true, 
        message: "Forbidden - Admin access required" 
      });
    }
    
    next();
  } catch (error) {
    res.status(500).json({ 
      error: true, 
      message: "Error verifying admin status" 
    });
  }
};

// Verify Instructor (also allows admin and host roles)
const verifyInstructor = async (req, res, next) => {
  const email = req.decoded.email;
  const db = getDB();
  const userCollection = db.collection("users");
  
  try {
    const user = await userCollection.findOne({ email });
    const allowedRoles = ["instructor", "admin", "host"];
    
    if (!user || !allowedRoles.includes(user.role)) {
      return res.status(403).json({ 
        error: true, 
        message: "Forbidden - Host/Instructor access required" 
      });
    }
    
    next();
  } catch (error) {
    res.status(500).json({ 
      error: true, 
      message: "Error verifying instructor status" 
    });
  }
};

// Verify Student
const verifyStudent = async (req, res, next) => {
  const email = req.decoded.email;
  const db = getDB();
  const userCollection = db.collection("users");
  
  try {
    const user = await userCollection.findOne({ email });
    
    if (!user || user.role !== "student") {
      return res.status(403).json({ 
        error: true, 
        message: "Forbidden - Student access required" 
      });
    }
    
    next();
  } catch (error) {
    res.status(500).json({ 
      error: true, 
      message: "Error verifying student status" 
    });
  }
};

module.exports = {
  verifyJWT,
  verifyAdmin,
  verifyInstructor,
  verifyStudent
};
