const { saveInterviewForm, getInterviewById } = require("../services/interviewService");

async function submitInterviewForm(req, res) {
  try {
    const { formData, role } = req.body;
    const result = await saveInterviewForm(formData, role);
    res.status(200).json({ success: true, interviewId: result });
  } catch (err) {
    console.error("Error submitting interview form:", err);
    res.status(500).json({ success: false, error: err.message });
  }
}

async function fetchInterviewById(req, res) {
  try {
    const interview = await getInterviewById(req.params.id);
    if (!interview) {
      return res.status(404).json({ success: false, message: "Interview not found" });
    }
    res.status(200).json({ success: true, interview });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

module.exports = { submitInterviewForm, fetchInterviewById };
