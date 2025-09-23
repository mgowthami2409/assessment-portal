const Smartsheet = require("smartsheet");
const nodemailer = require("nodemailer");

const smartsheet = Smartsheet.createClient({
  accessToken: process.env.SMARTSHEET_TOKEN,
});
const SHEET_ID = Number(process.env.SMARTSHEET_SHEETID);

async function saveInterviewForm(form, signatures, interviewId) {
  // Get sheet columns to map column titles to IDs
  const sheetInfo = await smartsheet.sheets.get({ id: SHEET_ID });
  const colMap = {};
  sheetInfo.columns.forEach(c => (colMap[c.title] = c.id));

  // Create cells to update/create covering all required fields
  const cells = [
    { columnId: colMap["CandidateName"], value: form.candidateName },
    { columnId: colMap["InterviewerName"], value: form.interviewerName },
    { columnId: colMap["Position"], value: form.position },
    { columnId: colMap["InterviewDate"], value: form.interviewDate },
    { columnId: colMap["Location"], value: form.location },
    { columnId: colMap["Strengths"], value: form.strengths },
    { columnId: colMap["ImprovementAreas"], value: form.improvementAreas },
    { columnId: colMap["FinalRecommendation"], value: form.finalRecommendation },
    { columnId: colMap["OverallComments"], value: form.overallComments },
    // Signatures and names
    { columnId: colMap["HiringManagerSignature"], value: signatures.hiringManager || null },
    { columnId: colMap["HiringManagerName"], value: form.hiringManagerName || null },
    { columnId: colMap["ReviewingManagerSignature"], value: signatures.reviewingManager || null },
    { columnId: colMap["ReviewingManagerName"], value: form.reviewingManagerName || null },
    { columnId: colMap["DivisionHRSignature"], value: signatures.divisionHR || null },
    { columnId: colMap["DivisionHRName"], value: form.divisionHRName || null },
    // You may add behavioralAnswers mapping as needed here
  ];

  const row = {
    id: interviewId ? Number(interviewId) : undefined,
    cells,
  };

  let response;
  if (interviewId) {
    // Update existing row
    response = await smartsheet.sheets.updateRow({
      sheetId: SHEET_ID,
      body: row,
    });
  } else {
    // Create new row if interviewId not provided
    row.toTop = true;
    response = await smartsheet.sheets.addRows({
      sheetId: SHEET_ID,
      body: [row],
    });
  }

  return { id: interviewId || response.result[0].id };
}

async function getInterviewById(id) {
  const sheetData = await smartsheet.sheets.get({ id: SHEET_ID, rowIds: [Number(id)] });
  if (!sheetData.rows.length) return null;

  const row = sheetData.rows[0];
  const colMap = {};
  sheetData.columns.forEach(c => (colMap[c.id] = c.title));

  // Map Smartsheet cells to a form object
  const form = {};
  row.cells.forEach(cell => {
    const colName = colMap[cell.columnId];
    if (colName) form[colName] = cell.value;
  });

  return form;
}

async function shareFormViaEmail(interviewId, emailTo, role) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const url = `${process.env.FRONTEND_URL}/interview-assessment?id=${interviewId}&role=${role}`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: emailTo,
    subject: "Interview Assessment Approval Needed",
    html: `<p>Please complete the Interview Assessment using the following link:</p><p><a href="${url}">${url}</a></p>`,
  };

  await transporter.sendMail(mailOptions);
}

module.exports = {
  saveInterviewForm,
  getInterviewById,
  shareFormViaEmail,
};
