const express = require("express");
const multer = require("multer");
const {
  submitInterviewForm,
  fetchInterviewById,
  shareInterview,
  uploadSignatureAttachment,
  getSignatureUrl,
} = require("../controllers/interviewController");

const router = express.Router();
const upload = multer({ dest: "uploads/" }); // Temporary local storage

// 📝 Submit or update interview form
router.post("/submit", submitInterviewForm);

// 🔍 Fetch interview by row id
router.get("/:id", fetchInterviewById);

// 📤 Share interview via email
router.post("/share", shareInterview);

// 🖋 Upload signature attachment (to Smartsheet)
router.post("/:id/signatureAttachment", upload.single("file"), uploadSignatureAttachment);

// (Optional backup route name if frontend still calls this)
router.post("/:id/upload-signature", upload.single("file"), uploadSignatureAttachment);

// 🔗 Retrieve signature attachment URL
router.get("/", getSignatureUrl);

module.exports = router;