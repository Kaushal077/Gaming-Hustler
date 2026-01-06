const { MongoClient, ServerApiVersion } = require("mongodb");

// Validate required environment variables
if (!process.env.DB_USER || !process.env.DB_PASSWORD) {
  console.error("❌ Missing DB_USER or DB_PASSWORD environment variables");
  process.exit(1);
}

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@gaming-cluster.1v6kksv.mongodb.net/?retryWrites=true&w=majority&appName=Gaming-Cluster`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  maxPoolSize: 10, // Connection pool for better performance
  minPoolSize: 2,
  serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  retryWrites: true,
  retryReads: true,
});

let db;
let isConnected = false;

const connectDB = async () => {
  try {
    if (isConnected) {
      console.log("♻️ Using existing MongoDB connection");
      return db;
    }
    
    await client.connect();
    db = client.db("Esports-Gaming");
    isConnected = true;
    
    // Verify connection with a ping
    await db.command({ ping: 1 });
    console.log("✅ Successfully connected to MongoDB!");
    return db;
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    isConnected = false;
    process.exit(1);
  }
};

const getDB = () => {
  if (!db || !isConnected) {
    throw new Error("Database not initialized. Call connectDB first.");
  }
  return db;
};

const closeDB = async () => {
  if (isConnected) {
    await client.close();
    isConnected = false;
    console.log("🔌 MongoDB connection closed");
  }
};

// Health check function
const checkDBHealth = async () => {
  try {
    if (!isConnected) return false;
    await db.command({ ping: 1 });
    return true;
  } catch {
    return false;
  }
};

module.exports = { connectDB, getDB, closeDB, checkDBHealth };
