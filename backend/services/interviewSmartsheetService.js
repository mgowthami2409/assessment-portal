const Smartsheet = require("smartsheet");
const smartsheet = Smartsheet.createClient({
  accessToken: process.env.SMARTSHEET_ACCESS_TOKEN,
});
const SHEET_ID = Number(process.env.SMARTSHEET_INTERVIEW_SHEET_ID);

let cachedColumns = null;

async function getSheetColumns() {
  if (cachedColumns) return cachedColumns;
  const sheet = await smartsheet.sheets.getSheet({ id: SHEET_ID });
  cachedColumns = {};
  sheet.columns.forEach(col => {
    cachedColumns[col.title] = col.id;
  });
  return cachedColumns;
}

// Helper function to safely get string value or empty string
function safeValue(val) {
  return val === undefined || val === null ? "" : val.toString();
}

async function addRowWithInterviewData(formData) {
  const columnMap = await getSheetColumns();
  const cells = [
    { columnId: columnMap.CandidateName, value: safeValue(formData.candidateName) },
    { columnId: columnMap.InterviewerName, value: safeValue(formData.interviewerName) },
    { columnId: columnMap.InterviewDate, value: safeValue(formData.interviewDate) },
    { columnId: columnMap.Position, value: safeValue(formData.position) },
    { columnId: columnMap.Location, value: safeValue(formData.location) },
    { columnId: columnMap.Strengths, value: safeValue(formData.strengths) },
    { columnId: columnMap.ImprovementAreas, value: safeValue(formData.improvementAreas) },
    { columnId: columnMap.FinalRecommendation, value: safeValue(formData.finalRecommendation) },
    { columnId: columnMap.OverallComments, value: safeValue(formData.overallComments) },
    { columnId: columnMap.ReviewingManagerName, value: safeValue(formData.reviewingManagerName) },
    { columnId: columnMap.DivisionHRName, value: safeValue(formData.divisionHRName) },
    { columnId: columnMap.HiringManagerSignature, value: safeValue(formData.hiringManager) },
    { columnId: columnMap.ReviewingManagerSignature, value: safeValue(formData.reviewingManager) },
    { columnId: columnMap.DivisionHRSignature, value: safeValue(formData.divisionHR) },
  ];
  const newRow = { toTop: true, cells };
  const addedRows = await smartsheet.sheets.addRows({
    sheetId: SHEET_ID,
    body: [newRow],
  });
  return addedRows.result[0].id.toString();
}

async function updateRowWithInterviewData(interviewId, formData) {
  const columnMap = await getSheetColumns();
  const cells = [
    { columnId: columnMap.CandidateName, value: safeValue(formData.candidateName) },
    { columnId: columnMap.InterviewerName, value: safeValue(formData.interviewerName) },
    { columnId: columnMap.InterviewDate, value: safeValue(formData.interviewDate) },
    { columnId: columnMap.Position, value: safeValue(formData.position) },
    { columnId: columnMap.Location, value: safeValue(formData.location) },
    { columnId: columnMap.Strengths, value: safeValue(formData.strengths) },
    { columnId: columnMap.ImprovementAreas, value: safeValue(formData.improvementAreas) },
    { columnId: columnMap.FinalRecommendation, value: safeValue(formData.finalRecommendation) },
    { columnId: columnMap.OverallComments, value: safeValue(formData.overallComments) },
    { columnId: columnMap.ReviewingManagerName, value: safeValue(formData.reviewingManagerName) },
    { columnId: columnMap.DivisionHRName, value: safeValue(formData.divisionHRName) },
    { columnId: columnMap.HiringManagerSignature, value: safeValue(formData.hiringManager) },
    { columnId: columnMap.ReviewingManagerSignature, value: safeValue(formData.reviewingManager) },
    { columnId: columnMap.DivisionHRSignature, value: safeValue(formData.divisionHR) },
  ];
  const rowMod = { id: Number(interviewId), cells };
  await smartsheet.sheets.updateRows({
    sheetId: SHEET_ID,
    body: [rowMod],
  });
  return interviewId;
}

async function getInterviewById(rowId) {
  const sheet = await smartsheet.sheets.getSheet({ id: SHEET_ID });
  const row = sheet.rows.find(r => r.id.toString() === rowId);
  if (!row) return null;
  const columnMap = await getSheetColumns();
  function getCellValue(columnName) {
    const colId = columnMap[columnName];
    const cell = row.cells.find(c => c.columnId === colId);
    return cell ? cell.value : "";
  }
  return {
    interviewId: row.id.toString(),
    candidateName: getCellValue("CandidateName"),
    interviewerName: getCellValue("InterviewerName"),
    interviewDate: getCellValue("InterviewDate"),
    position: getCellValue("Position"),
    location: getCellValue("Location"),
    strengths: getCellValue("Strengths"),
    improvementAreas: getCellValue("ImprovementAreas"),
    finalRecommendation: getCellValue("FinalRecommendation"),
    overallComments: getCellValue("OverallComments"),
    reviewingManagerName: getCellValue("ReviewingManagerName"),
    divisionHRName: getCellValue("DivisionHRName"),
    hiringManager: getCellValue("HiringManagerSignature"),
    reviewingManager: getCellValue("ReviewingManagerSignature"),
    divisionHR: getCellValue("DivisionHRSignature"),
  };
}

module.exports = {
  addRowWithInterviewData,
  updateRowWithInterviewData,
  getInterviewById,
};
