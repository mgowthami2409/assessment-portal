const express = require("express");
const router = express.Router();
const { submitInterviewForm } = require("../controllers/interviewController");

// Use POST, not GET
router.post("/submit", submitInterviewForm);

module.exports = router;
