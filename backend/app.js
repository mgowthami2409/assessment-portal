const express = require("express");
const cors = require("cors");
const { json, urlencoded } = require("body-parser");
const { PORT } = require("./config");

// Import routes
const assessmentRoutes = require("./routes/assessmentRoutes");
const interviewRoutes = require("./routes/interviewRoutes"); // New interview assessment routes

const app = express();

// Enable CORS for all origins (adjust if needed)
app.use(cors());

// Parse JSON request bodies
app.use(json());

// Parse URL-encoded request bodies (optional, useful for form posts)
app.use(urlencoded({ extended: true }));

// API routes
app.use("/api/assessments", assessmentRoutes);  // Behavioral assessment API
app.use("/api/interview", interviewRoutes);     // Interview assessment API

// Default route or 404 handler (optional)
app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

app.listen(PORT, () => {
  console.log(`Backend server running at http://localhost:${PORT}`);
});
