const express = require("express");
const router = express.Router();
const { submitInterviewForm, fetchInterviewById, shareInterview } = require("../controllers/interviewController");

// Submit or update interview form
router.post("/submit", submitInterviewForm);

// Fetch a saved interview by Smartsheet row id
router.get("/:id", fetchInterviewById);

// Share interview by email (uses SMTP when configured, otherwise returns mailto fallback)
router.post("/share", shareInterview);

module.exports = router;
