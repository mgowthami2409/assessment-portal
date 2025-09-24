const express = require("express");
const router = express.Router();
const interviewController = require("../controllers/interviewController");

// Save/update
router.post("/submit", interviewController.submitInterviewForm);

// Fetch existing form by ID
router.get("/:id", interviewController.getInterviewById);

module.exports = router;
