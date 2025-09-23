require("dotenv").config();

module.exports = {
  PORT: process.env.PORT || 9090,
  SMARTSHEET_API_TOKEN: process.env.SMARTSHEET_ACCESS_TOKEN,
  SMARTSHEET_BEHAVIORAL_SHEET_ID: process.env.SMARTSHEET_SHEET_ID,
};
