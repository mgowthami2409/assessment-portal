const smartsheetService = require("../services/interviewSmartsheetService");
// const smartsheet = require("smartsheet");
const fs = require("fs");
const { getInterviewById, saveInterviewForm, getSignatureAttachment, attachFileToRow } = require("../services/interviewService");
const config = require("../config");

// Controller to submit or update interview form and upload associated signatures
async function submitInterviewForm(req, res) {
  try {
    const { formData = {}, signatures = {}, interviewId = null, role } = req.body;

    // Validate Smartsheet configuration
    if (!config.SMARTSHEET_API_TOKEN || !config.SMARTSHEET_INTERVIEW_SHEET_ID) {
      const msg = 'Smartsheet config missing.';
      console.error(msg);
      return res.status(500).json({ success: false, error: msg });
    }

    // Merge signature placeholders into form data (may be optional depending on usage)
    if (signatures.hiringManager) formData.hiringManager = signatures.hiringManager;
    if (signatures.reviewingManager) formData.reviewingManager = signatures.reviewingManager;
    if (signatures.divisionHR) formData.divisionHR = signatures.divisionHR;

    // Save or update interview data
    const savedId = await saveInterviewForm(formData, role);

    // Attach each signature file as an attachment in Smartsheet
    for (const sigRole of ["hiringManager", "reviewingManager", "divisionHR"]) {
      if (signatures[sigRole] && signatures[sigRole].buffer) {
        await attachFileToRow(
          savedId,
          signatures[sigRole].buffer,
          `${sigRole}-signature-${Date.now()}-${signatures[sigRole].originalname}`,
          signatures[sigRole].mimetype
        );
      }
    }

    res.status(200).json({ success: true, interviewId: savedId });
  } catch (error) {
    console.error("submitInterviewForm error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
}

// Fetch interview by row id with fallback mocks in development
async function fetchInterviewById(req, res) {
  const { id } = req.params;
  try {
    const interview = await getInterviewById(id);

    if (!interview) {
      return res.status(404).json({ success: false, message: "Interview not found" });
    }

    res.json({ success: true, interview });
  } catch (error) {
    console.error("fetchInterviewById error:", error);
    if ((!config.SMARTSHEET_API_TOKEN || !config.SMARTSHEET_INTERVIEW_SHEET_ID) && process.env.NODE_ENV === "development") {
      // Dev mock
      return res.json({
        success: true,
        interview: {
          interviewId: id,
          candidateName: "Dev Candidate",
          // ... other mock data
        },
        note: "development-mock"
      });
    }

    res.status(500).json({ success: false, error: error.message });
  }
}

// Share interview link via email with SMTP fallback
async function shareInterview(req, res) {
  try {
    const { interviewId, toEmail } = req.body;
    if (!interviewId || !toEmail) return res.status(400).json({ success: false, error: "interviewId and toEmail required" });

    const link = `${req.protocol}://${req.get("host")}/interview/${interviewId}`;
    const subject = "Interview Assessment";
    const body = `Please review the interview at: ${link}`;

    if (process.env.SMTP_HOST && process.env.SMTP_USER) {
      const nodemailer = require("nodemailer");
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: process.env.SMTP_PORT === "465",
        auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
      });

      const info = await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: toEmail,
        subject,
        text: body,
      });

      return res.json({ success: true, provider: "smtp", info });
    } else {
      // Fallback mailto:
      const mailtoUrl = `mailto:${encodeURIComponent(toEmail)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      return res.json({ success: true, provider: "mailto", mailto: mailtoUrl });
    }
  } catch (error) {
    console.error("shareInterview error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
}

// Upload signature file as attachment
async function uploadSignatureAttachment(req, res) {
  try {
    const { id } = req.params;
    const { role } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    // Call attachFileToRow from smartsheetService
    const attachment = await smartsheetService.attachFileToRow(
      id,
      fs.readFileSync(file.path), // read file buffer from temp path
      `${role}_signature-${Date.now()}-${file.originalname}`,
      file.mimetype
    );

    // Delete temp file
    fs.unlinkSync(file.path);

    res.json({ success: true, attachment });
  } catch (error) {
    console.error("Error uploading signature:", error);
    res.status(500).json({ success: false, message: "Signature upload failed", error: error.message });
  }
}

// Get signature attachment URL for given role & row id
async function getSignatureUrl(req, res) {
  try {
    const { id, role } = req.params;
    if (!id || !role) return res.status(400).json({ success: false, error: "id and role required" });

    const url = await getSignatureAttachment(id, role);
    if (!url) return res.status(404).json({ success: false, error: "Signature not found" });

    res.json({ success: true, url });
  } catch (error) {
    console.error("getSignatureUrl error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
}

module.exports = {
  submitInterviewForm,
  fetchInterviewById,
  shareInterview,
  uploadSignatureAttachment,
  getSignatureUrl,
};