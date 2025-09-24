const interviewService = require("../services/interviewService");

exports.submitInterviewForm = async (req, res) => {
  try {
    const { formData, signatures, interviewId } = req.body;
    const id = await interviewService.saveInterviewForm(formData, signatures, interviewId);
    res.json({ success: true, interviewId: id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to save interview form." });
  }
};

exports.getInterviewById = async (req, res) => {
  try {
    const interview = await interviewService.getInterviewById(req.params.id);
    if (!interview) {
      return res.status(404).json({ success: false, message: "Interview not found." });
    }
    res.json({ success: true, interview });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error fetching interview." });
  }
};
