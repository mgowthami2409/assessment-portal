const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer(); // memory storage

const assessmentController = require("../controllers/assessmentController");

router.post("/", upload.single("pdfFile"), assessmentController.handleAssessmentSubmission);

module.exports = router;
