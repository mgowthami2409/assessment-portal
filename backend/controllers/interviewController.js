const interviewService = require("../services/interviewService");

exports.submitInterviewForm = async (req, res) => {
  try {
    const formData = JSON.parse(req.body.formData);
    // Expect all signatures base64 strings under 'signatures' JSON string
    const signatures = req.body.signatures ? JSON.parse(req.body.signatures) : {};
    const interviewId = req.body.interviewId; // optional ID for update

    const result = await interviewService.saveInterviewForm(formData, signatures, interviewId);

    res.json({ success: true, interviewId: result.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to save interview form." });
  }
};

exports.getInterviewById = async (req, res) => {
  try {
    const interview = await interviewService.getInterviewById(req.params.id);
    if (!interview)
      return res.status(404).json({ success: false, message: "Interview not found." });

    res.json({ success: true, interview });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching interview." });
  }
};

exports.shareInterviewForm = async (req, res) => {
  try {
    const { interviewId, emailTo, role } = req.body;

    await interviewService.shareFormViaEmail(interviewId, emailTo, role);

    res.json({ success: true, message: "Email sent to next approver." });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to share interview form." });
  }
};
