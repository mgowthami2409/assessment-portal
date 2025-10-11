const path = require("path");
const axios = require("axios");
const FormData = require("form-data");
const smartsheet = require("smartsheet");
const fs = require("fs");


const SHEET_ID = process.env.SMARTSHEET_INTERVIEW_SHEET_ID

const addAttachmentToRow = async ({ rowId, filePath, fileName, contentType }) => {
  const readStream = fs.createReadStream(filePath);
  const response = await smartsheetClient.attachments.addAttachmentToRow({
    sheetId: SHEET_ID,
    rowId,
    fileName,
    contentType,
    file: readStream,
  });
  return response;
};

const smartsheetClient = smartsheet.createClient({
  accessToken: process.env.SMARTSHEET_ACCESS_TOKEN,
});

let cachedColumns = null;

async function getSheetColumns() {
  if (cachedColumns) return cachedColumns;
  const sheet = await smartsheetClient.sheets.getSheet({ id: SHEET_ID });

  cachedColumns = {};
  sheet.columns.forEach((col) => {
    cachedColumns[col.title] = col.id;
  });
  return cachedColumns;
}

function safeValue(val) {
  return val === undefined || val === null ? "" : String(val);
}

function safeJSONStringify(val) {
  try {
    return val ? JSON.stringify(val) : "";
  } catch {
    return "";
  }
}

function safeJSONParse(val) {
  try {
    return val ? JSON.parse(val) : null;
  } catch {
    return null;
  }
}

/**
 * Adds a new row with the given interview data to the sheet
 */
async function addRowWithInterviewData(formData) {
  const columnMap = await getSheetColumns();

  const cells = [
    { columnId: columnMap["CandidateName"], value: safeValue(formData.candidateName) },
    { columnId: columnMap["InterviewerName"], value: safeValue(formData.interviewerName) },
    { columnId: columnMap["InterviewDate"], value: safeValue(formData.interviewDate) },
    { columnId: columnMap["Position"], value: safeValue(formData.position) },
    { columnId: columnMap["Location"], value: safeValue(formData.location) },
    { columnId: columnMap["Strengths"], value: safeValue(formData.strengths) },
    { columnId: columnMap["ImprovementAreas"], value: safeValue(formData.improvementAreas) },
    { columnId: columnMap["FinalRecommendation"], value: safeValue(formData.finalRecommendation) },
    { columnId: columnMap["OverallComments"], value: safeValue(formData.overallComments) },
    { columnId: columnMap["ReviewingManagerName"], value: safeValue(formData.reviewingManagerName) },
    { columnId: columnMap["DivisionHRName"], value: safeValue(formData.divisionHRName) },
    { columnId: columnMap["HiringManagerRecommendation"], value: safeValue(formData.hiringManagerRecommendation) },
    { columnId: columnMap["StrengthsHM"], value: safeValue(formData.strengthsHM) },
    { columnId: columnMap["ImprovementAreasHM"], value: safeValue(formData.improvementAreasHM) },
    { columnId: columnMap["OverallCommentsHM"], value: safeValue(formData.overallCommentsHM) },
  ];

  // Add optional JSON columns if present
  if (columnMap["Competencies"] && formData.competencies) {
    cells.push({
      columnId: columnMap["Competencies"],
      value: safeJSONStringify(formData.competencies),
    });
  }

  if (columnMap["BehavioralAnswers"] && formData.behavioralAnswers) {
    cells.push({
      columnId: columnMap["BehavioralAnswers"],
      value: safeJSONStringify(formData.behavioralAnswers),
    });
  }

  const newRow = { toTop: true, cells };
  const addedRows = await smartsheetClient.sheets.addRows({ sheetId: SHEET_ID, body: [newRow] });

  return String(addedRows.result[0].id);
}

/**
 * Updates an existing row by row id with the given data
 */
async function updateRowWithInterviewData(rowId, formData) {
  const columnMap = await getSheetColumns();

  const cells = [
    { columnId: columnMap["CandidateName"], value: safeValue(formData.candidateName) },
    { columnId: columnMap["InterviewerName"], value: safeValue(formData.interviewerName) },
    { columnId: columnMap["InterviewDate"], value: safeValue(formData.interviewDate) },
    { columnId: columnMap["Position"], value: safeValue(formData.position) },
    { columnId: columnMap["Location"], value: safeValue(formData.location) },
    { columnId: columnMap["Strengths"], value: safeValue(formData.strengths) },
    { columnId: columnMap["ImprovementAreas"], value: safeValue(formData.improvementAreas) },
    { columnId: columnMap["FinalRecommendation"], value: safeValue(formData.finalRecommendation) },
    { columnId: columnMap["OverallComments"], value: safeValue(formData.overallComments) },
    { columnId: columnMap["ReviewingManagerName"], value: safeValue(formData.reviewingManagerName) },
    { columnId: columnMap["DivisionHRName"], value: safeValue(formData.divisionHRName) },
    { columnId: columnMap["HiringManagerRecommendation"], value: safeValue(formData.hiringManagerRecommendation) },
    { columnId: columnMap["StrengthsHM"], value: safeValue(formData.strengthsHM) },
    { columnId: columnMap["ImprovementAreasHM"], value: safeValue(formData.improvementAreasHM) },
    { columnId: columnMap["OverallCommentsHM"], value: safeValue(formData.overallCommentsHM) },
  ];

  if (columnMap["Competencies"] && formData.competencies) {
    cells.push({
      columnId: columnMap["Competencies"],
      value: safeJSONStringify(formData.competencies),
    });
  }

  if (columnMap["BehavioralAnswers"] && formData.behavioralAnswers) {
    cells.push({
      columnId: columnMap["BehavioralAnswers"],
      value: safeJSONStringify(formData.behavioralAnswers),
    });
  }

  const updateRequest = {
    id: Number(rowId),
    cells,
  };

  await smartsheetClient.sheets.updateRows({ sheetId: SHEET_ID, body: [updateRequest] });
  return String(rowId);
}

/**
 * Retrieves a full interview data object by row Id
 */
async function getInterviewById(rowId) {
  const sheet = await smartsheetClient.sheets.getSheet({ id: SHEET_ID });

  const row = sheet.rows.find((r) => String(r.id) === String(rowId));
  if (!row) return null;

  const columnMap = await getSheetColumns();

  function getCellValue(colName) {
    const colId = columnMap[colName];
    const cell = row.cells.find((c) => c.columnId === colId);
    return cell ? cell.value : "";
  }

  return {
    interviewId: String(row.id),
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
    hiringManagerRecommendation: getCellValue("HiringManagerRecommendation"),
    competencies: safeJSONParse(getCellValue("Competencies")),
    behavioralAnswers: safeJSONParse(getCellValue("BehavioralAnswers")),
    strengthsHM: getCellValue("StrengthsHM"),
    improvementAreasHM: getCellValue("ImprovementAreasHM"),
    overallCommentsHM: getCellValue("OverallCommentsHM"),
  };
}

/**
 * Attach a file (signature/pdf) to a row in the Smartsheet.
 */
async function attachFileToRow(rowId, fileBuffer, filename, mimeType) {
  const tempFilePath = path.join(__dirname, `${Date.now()}_${filename}`);
  fs.writeFileSync(tempFilePath, fileBuffer);

  try {
    const form = new FormData();
    form.append("file", fs.createReadStream(tempFilePath), {
      filename,
      contentType: mimeType,
    });

    const url = `https://api.smartsheet.com/2.0/sheets/${SHEET_ID}/rows/${rowId}/attachments`;
    // const url = `https://api.smartsheet.com/2.0/sheets/${SHEET_ID}/rows`;

    const response = await axios.post(url, form, {
      headers: {
        ...form.getHeaders(),
        Authorization: `Bearer ${process.env.SMARTSHEET_ACCESS_TOKEN}`,
      },
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
      timeout: 300000,
    });

    return response.data.result[0]; // attachment meta info
  } catch (error) {
    console.error("Error attaching file:", error.response?.data || error.message);
    throw error;
  } finally {
    fs.unlinkSync(tempFilePath);
  }
}

/**
 * Save or update interview form and return row id
 */
async function saveInterviewForm(formData, role) {
  const rowId = formData.interviewId || null;
  if (rowId) {
    return updateRowWithInterviewData(rowId, formData);
  } else {
    return addRowWithInterviewData(formData);
  }
}

async function getSignatureAttachment(rowId, role) {
  try {
    const response = await smartsheetClient.sheets.attachments.listAttachments({
      sheetId: Number(SHEET_ID),
      rowId: Number(rowId),
    });

    if (!response.data || response.data.length === 0) return null;

    const attachment = response.data.find((att) => att.name.includes(role));
    return attachment ? attachment.url : null;
  } catch (error) {
    console.error(`Error in getSignatureAttachment for row ${rowId} role ${role}:`, error);
    throw error;
  }
}

module.exports = {
  getSheetColumns,
  addRowWithInterviewData,
  updateRowWithInterviewData,
  getInterviewById,
  attachFileToRow,
  saveInterviewForm,
  getSignatureAttachment,
  addAttachmentToRow,
};