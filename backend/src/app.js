const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const { errorHandler, notFound } = require("./middleware/errorHandler");
const { checkDBHealth } = require("./config/database");

const app = express();

// CORS configuration for security
const corsOptions = {
  origin: process.env.CORS_ORIGIN || "*",
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json({ limit: "10mb" })); // Limit payload size
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Request logging in development
if (process.env.NODE_ENV !== "production") {
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
  });
}

// Health check endpoint
app.get("/", async (req, res) => {
  const dbHealthy = await checkDBHealth();
  res.json({ 
    message: "Gaming Hustlers API is running! 🎮",
    version: "2.0.0",
    status: dbHealthy ? "healthy" : "degraded",
    database: dbHealthy ? "connected" : "disconnected",
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use("/api", routes);

// Error Handling
app.use(notFound);
app.use(errorHandler);

module.exports = app;
