const interviewSmartsheetService = require("./interviewSmartsheetService");

async function saveInterviewForm(formData, role) {
  if (!formData.interviewId) {
    // Create new row for Hiring Manager
    return await interviewSmartsheetService.addRowWithInterviewData(formData);
  } else {
    // Update same row for Reviewing Manager or Division HR
    return await interviewSmartsheetService.updateRowWithInterviewData(formData.interviewId, formData);
  }
}

async function getInterviewById(id) {
  return await interviewSmartsheetService.getInterviewById(id);
}
module.exports = { saveInterviewForm, getInterviewById };