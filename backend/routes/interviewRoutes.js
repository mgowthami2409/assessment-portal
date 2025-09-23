const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer(); // for multipart form data

const interviewController = require("../controllers/interviewController");

router.post(
  "/submit",
  upload.none(), // expecting non-file multipart data as base64 strings
  interviewController.submitInterviewForm
);

router.get("/:id", interviewController.getInterviewById);

router.post("/:id/share", interviewController.shareInterviewForm);

module.exports = router;
