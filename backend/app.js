const express = require("express");
const cors = require("cors");
const { json, urlencoded } = require("body-parser");
const path = require("path");          // Add this require here
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

// Static serving for React frontend (add this block)
app.use(express.static(path.join(__dirname, "../frontend/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
});

// Comment out or remove old 404 handler because React will handle routing
// app.use((req, res) => {
//   res.status(404).json({ error: "Not Found" });
// });

app.listen(PORT, () => {
  console.log(`Backend server running at http://localhost:${PORT}`);
});
