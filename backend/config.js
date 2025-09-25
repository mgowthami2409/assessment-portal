require("dotenv").config();

module.exports = {
  PORT: process.env.PORT || 9090,
  SMARTSHEET_API_TOKEN: process.env.SMARTSHEET_ACCESS_TOKEN,
  SMARTSHEET_BEHAVIORAL_SHEET_ID: process.env.SMARTSHEET_SHEET_ID,
  // Interview sheet id used by interviewSmartsheetService (optional; service currently reads process.env directly)
  SMARTSHEET_INTERVIEW_SHEET_ID: process.env.SMARTSHEET_INTERVIEW_SHEET_ID,
};
