// Script to set a user as admin
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require("mongodb");

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@gaming-cluster.1v6kksv.mongodb.net/?retryWrites=true&w=majority&appName=Gaming-Cluster`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function setAdmin(email) {
  try {
    await client.connect();
    const db = client.db("Esports-Gaming");
    const userCollection = db.collection("users");
    
    // First check if user exists
    const user = await userCollection.findOne({ email });
    
    if (!user) {
      // Create user with admin role if not exists
      const result = await userCollection.insertOne({
        email,
        role: "admin",
        name: "Admin",
        createdAt: new Date()
      });
      console.log(`✅ Admin user created for: ${email}`);
      console.log(result);
    } else {
      // Update existing user to admin
      const result = await userCollection.updateOne(
        { email },
        { $set: { role: "admin" } }
      );
      console.log(`✅ User ${email} is now an admin`);
      console.log(result);
    }
  } catch (error) {
    console.error("❌ Error setting admin:", error);
  } finally {
    await client.close();
  }
}

// Set the admin
const adminEmail = process.argv[2] || "kaushalmandal13590@gmail.com";
console.log(`Setting ${adminEmail} as admin...`);
setAdmin(adminEmail);
