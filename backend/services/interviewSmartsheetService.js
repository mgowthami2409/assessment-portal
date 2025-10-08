const Smartsheet = require("smartsheet");
const fs = require("fs");
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

function safeValue(val) {
  return val === undefined || val === null ? "" : val.toString();
}

function safeJSONStringify(val) {
  try {
    return val ? JSON.stringify(val) : "";
  } catch (e) {
    console.warn("JSON stringify error", e);
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
    { columnId: columnMap.HiringManagerRecommendation, value: safeValue(formData.hiringManagerRecommendation) },

    // Signature fields
    { columnId: columnMap.HiringManagerSignature, value: safeValue(formData.hiringManager) },
    { columnId: columnMap.ReviewingManagerSignature, value: safeValue(formData.reviewingManager) },
    { columnId: columnMap.DivisionHRSignature, value: safeValue(formData.divisionHR) },
  ];

  // JSON blobs
  // if (columnMap.CompetencyNames && formData.competencyNames) {
  //   cells.push({ columnId: columnMap.CompetencyNames, value: safeJSONStringify(formData.competencyNames) });
  // }
  if (columnMap.Competencies && formData.competencies) {
    cells.push({
      columnId: columnMap.Competencies,
      value: safeJSONStringify(formData.competencies),
    });
  }

  if (columnMap.BehavioralAnswers && formData.behavioralAnswers) {
    cells.push({ columnId: columnMap.BehavioralAnswers, value: safeJSONStringify(formData.behavioralAnswers) });
  }

  const newRow = { toTop: true, cells };
  const addedRows = await smartsheet.sheets.addRows({ sheetId: SHEET_ID, body: [newRow] });
  return addedRows.result[0].id.toString(); // Return the newly created Smartsheet row ID (interviewId)
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
    { columnId: columnMap.HiringManagerRecommendation, value: safeValue(formData.hiringManagerRecommendation) },

    // Signature fields
    { columnId: columnMap.HiringManagerSignature, value: safeValue(formData.hiringManager) },
    { columnId: columnMap.ReviewingManagerSignature, value: safeValue(formData.reviewingManager) },
    { columnId: columnMap.DivisionHRSignature, value: safeValue(formData.divisionHR) },
  ];

  // if (columnMap.CompetencyNames && formData.competencyNames) {
  //   cells.push({ columnId: columnMap.CompetencyNames, value: safeJSONStringify(formData.competencyNames) });
  // }
  if (columnMap.Competencies && formData.competencies) {
    cells.push({
      columnId: columnMap.Competencies,
      value: safeJSONStringify(formData.competencies),
    });
  }

  if (columnMap.BehavioralAnswers && formData.behavioralAnswers) {
    cells.push({ columnId: columnMap.BehavioralAnswers, value: safeJSONStringify(formData.behavioralAnswers) });
  }

  const rowMod = { id: Number(interviewId), cells };
  await smartsheet.sheets.updateRows({ sheetId: SHEET_ID, body: [rowMod] });
  return interviewId; // Return the existing interviewId for continuity
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
    hiringManagerRecommendation: getCellValue("HiringManagerRecommendation"),

    // Signature data
    hiringManager: getCellValue("HiringManagerSignature"),
    reviewingManager: getCellValue("ReviewingManagerSignature"),
    divisionHR: getCellValue("DivisionHRSignature"),

    // competencyNames: safeJSONParse(getCellValue("CompetencyNames")),
    competencies: safeJSONParse(getCellValue("Competencies")),
    behavioralAnswers: safeJSONParse(getCellValue("BehavioralAnswers")),
  };
}

async function uploadRowAttachment(rowId, file, role) {
  const sheetId = SHEET_ID;

  if (!file || !rowId) {
    throw new Error("File and Row ID are required to upload attachment");
  }

  // Convert the buffer to readable stream
  const bufferStream = new stream.PassThrough();
  bufferStream.end(file.buffer);

  try {
    const result = await smartsheet.sheets.attachments.attachFileToRow({
      sheetId,
      rowId: Number(rowId),
      file: bufferStream, // stream of file data
      fileName: `${role}-signature-${Date.now()}-${file.originalname}`,
      mimeType: file.mimetype,
    });

    return result.result[0];  // Return the uploaded attachment info
  } catch (err) {
    console.error("Smartsheet attachment upload failed:", err);
    throw err;
  }
}
  
async function saveInterviewForm(formData, role) {
  // if formData has an interviewId, update existing Smartsheet row
  const interviewId = formData.interviewId || null;

  if (interviewId) {
    console.log(`Updating Smartsheet row ${interviewId}`);
    return await updateRowWithInterviewData(interviewId, formData);
  } else {
    console.log(`Creating new Smartsheet row`);
    return await addRowWithInterviewData(formData);
  }
}
async function submitInterviewForm(req, res) {
  try {
    const bodyFormData = req.body.formData || {};
    const signatures = req.body.signatures || {};
    const interviewId = req.body.interviewId || null;
    const role = req.body.role;

    if (!process.env.SMARTSHEET_API_TOKEN || !process.env.SMARTSHEET_INTERVIEW_SHEET_ID) {
      const msg = 'Smartsheet configuration missing.';
      console.error(msg);
      return res.status(500).json({ success: false, error: msg });
    }

    // Save the form (creates or updates the row)
    const savedInterviewId = await saveInterviewForm(bodyFormData, role);

    // Upload each signature as attachment if provided
    const signatureRoles = ["hiringManager", "reviewingManager", "divisionHR"];
    for (const sigRole of signatureRoles) {
      if (signatures[sigRole] && signatures[sigRole].buffer) {
        await uploadRowAttachment(
          savedInterviewId,
          signatures[sigRole],
          sigRole
        );
      }
    }

    res.status(200).json({ success: true, interviewId: savedInterviewId });
  } catch (err) {
    console.error("Error submitting interview form:", err);
    res.status(500).json({ success: false, error: err.message });
  }
}

// Get URL of signature attachment by role for a row
async function getSignatureAttachmentUrl(rowId, role) {
  const attachmentsResponse = await smartsheet.attachments.listAttachments({
    sheetId: SHEET_ID,
    rowId: Number(rowId),
  });

  if (!attachmentsResponse.data || attachmentsResponse.data.length === 0) return null;

  // Find attachment with role in filename (uploaded with role name)
  const attachment = attachmentsResponse.data.find(att => att.name && att.name.includes(role));

  if (!attachment) return null;

  // Smartsheet provides a URL field for direct attachment access
  return attachment.url || null;
}

module.exports = {
  addRowWithInterviewData, updateRowWithInterviewData, getInterviewById, uploadRowAttachment, saveInterviewForm, getSignatureAttachmentUrl
};
