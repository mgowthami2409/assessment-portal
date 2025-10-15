const express = require("express");
const multer = require("multer");
const axios = require("axios");
const config = require("../config");
const {
  submitInterviewForm,
  fetchInterviewById,
  shareInterview,
  uploadSignatureAttachment,
  getSignatureUrl,
  // getAllSignatures,
} = require("../controllers/interviewController");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// Submit or update interview form (without files)
router.post("/submit", submitInterviewForm);

// Fetch interview form data by id
router.get("/:id", fetchInterviewById);

// Share interview by email
router.post("/share", shareInterview);

// Upload signature file as attachment (with multer file upload middleware)
router.post("/:id/signature", upload.single("file"), uploadSignatureAttachment);

// Get signature URL for role and interview row
router.get("/:rowId/signature/:role", getSignatureUrl);

// router.get("/:rowId/signatures", getAllSignatures);

// New route: Proxy signature image by role on a row through backend
router.get("/:rowId/signature/:role/image", async (req, res) => {
  const { rowId, role } = req.params;
  if (!rowId || !role) return res.status(400).send("Missing rowId or role");

  try {
    // 1. List attachments on the row
    const attachmentsRes = await axios.get(
      `https://api.smartsheet.com/2.0/sheets/${config.SMARTSHEET_INTERVIEW_SHEET_ID}/rows/${rowId}/attachments`,
      {
        headers: { Authorization: `Bearer ${config.SMARTSHEET_API_TOKEN}` },
      }
    );

    // 2. Find the attachment by role (case-insensitive)
    const attachment = attachmentsRes.data.data.find(
      (att) => att.name && att.name.toLowerCase().includes(role.toLowerCase())
    );

    if (!attachment) return res.status(404).send("Signature not found");

    // 3. Get attachment details for the download URL
    const detailRes = await axios.get(
      `https://api.smartsheet.com/2.0/sheets/${config.SMARTSHEET_INTERVIEW_SHEET_ID}/attachments/${attachment.id}`,
      {
        headers: { Authorization: `Bearer ${config.SMARTSHEET_API_TOKEN}` },
      }
    );

    const imageUrl = detailRes.data.url;

    // 4. Fetch the image binary and stream to client
    const imageResponse = await axios.get(imageUrl, { responseType: "stream" });

    res.setHeader("Content-Type", attachment.mimeType);
    imageResponse.data.pipe(res);
  } catch (error) {
    console.error("Error proxying signature image:", error.response?.data || error.message);
    res.status(500).send("Failed to fetch signature image");
  }
});

module.exports = router;