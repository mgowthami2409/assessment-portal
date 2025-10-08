const express = require("express");
const router = express.Router();
// const { submitInterviewForm, fetchInterviewById, shareInterview } = require("../controllers/interviewController");
const { submitInterviewForm, fetchInterviewById, shareInterview, uploadSignatureAttachment, getSignatureUrl } = require("../controllers/interviewController");
const multer = require("multer");
const upload = multer();

// Submit or update interview form
router.post("/submit", submitInterviewForm);

// Fetch a saved interview by Smartsheet row id
router.get("/:id", fetchInterviewById);

// Share interview by email (uses SMTP when configured, otherwise returns mailto fallback)
router.post("/share", shareInterview);

// Add at the end, after fetchInterviewById
// router.post("/:id/signatureAttachment", uploadSignatureAttachment);
router.post("/:id/signatureAttachment", upload.single("file"), uploadSignatureAttachment);

// Get signature attachment URL for a role in an interview
router.get("/:id/signature/:role", getSignatureUrl);

module.exports = router;
