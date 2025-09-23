const smartsheetService = require("../services/smartsheetService");

exports.handleAssessmentSubmission = async (req, res) => {
  try {
    const payload = JSON.parse(req.body.payload);
    const pdfFileBuffer = req.file.buffer;

    await smartsheetService.uploadPdfAndSaveRow(payload, pdfFileBuffer);

    res.json({ success: true, message: "Assessment saved and PDF uploaded to Smartsheet" });
  } catch (err) {
    console.error("Assessment submission error:", err);
    res.status(500).json({ success: false, message: err.message || "Error processing assessment" });
  }
};
