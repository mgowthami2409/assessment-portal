const Smartsheet = require("smartsheet");
const smartsheet = Smartsheet.createClient({
  accessToken: process.env.SMARTSHEET_ACCESS_TOKEN,
});
const SHEET_ID = Number(process.env.SMARTSHEET_BEHAVIORAL_SHEET_ID);
// console.log("Available smartsheet methods:");
// console.log("sheets:", Object.keys(smartsheet.sheets));
// console.log("attachments:", smartsheet.attachments ? Object.keys(smartsheet.attachments) : "no attachments");

async function getSheetColumns() {
  try {
    if (!SHEET_ID || isNaN(SHEET_ID)) {
      throw new Error("❌ SHEET_ID is missing or invalid. Check your .env file.");
    }

    const sheet = await smartsheet.sheets.getSheet({ id: SHEET_ID });
    if (!sheet || !sheet.columns) {
      console.error("❌ Smartsheet getSheet failed:", sheet);
      throw new Error("Smartsheet did not return columns. Check sheet ID and token permissions.");
    }

    const columnMap = {};
    sheet.columns.forEach((col) => {
      columnMap[col.title] = col.id;
    });
    return columnMap;
  } catch (err) {
    console.error("❌ Error in getSheetColumns:", err.message);
   throw err;
  }
}

async function addRowWithData(payload) {
  const columnMap = await getSheetColumns();

  const cells = [
    { columnId: columnMap["EmployeeName"], value: payload.employeeName },
    { columnId: columnMap["Unit"], value: payload.unit },
    { columnId: columnMap["ManagerName"], value: payload.managerName },
    { columnId: columnMap["Department"], value: payload.department },
    { columnId: columnMap["TotalScore"], value: payload.totalScore },
  ];

  const newRow = {
    toTop: true,
    cells,
  };

  const addedRows = await smartsheet.sheets.addRows({
    sheetId: SHEET_ID,
    body: [newRow],
  });
  return addedRows.result[0].id;
}

const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
const path = require("path");

async function attachPdfToRow(rowId, pdfBuffer) {
  // Save pdfBuffer temporarily to disk
  const tempFilePath = path.join(__dirname, `assessment_${Date.now()}.pdf`);
  fs.writeFileSync(tempFilePath, pdfBuffer);

  try {
    const form = new FormData();
    form.append("file", fs.createReadStream(tempFilePath));

    const url = `https://api.smartsheet.com/2.0/sheets/${SHEET_ID}/rows/${rowId}/attachments`;

    const response = await axios.post(url, form, {
      headers: {
        ...form.getHeaders(),
        Authorization: `Bearer ${process.env.SMARTSHEET_ACCESS_TOKEN}`,
      },
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
      timeout: 300000
    });

    console.log("✅ PDF attached successfully:", response.data);
    return response.data;
  } catch (err) {
    console.error("❌ Error attaching PDF:", err.response ? err.response.data : err.message);
    throw err;
  } finally {
    // Clean up temporary file
    fs.unlinkSync(tempFilePath);
  }
}

async function uploadPdfAndSaveRow(payload, pdfBuffer) {
  const rowId = await addRowWithData(payload);
  await attachPdfToRow(rowId, pdfBuffer);
}

module.exports = {
  getSheetColumns,
  addRowWithData,
  attachPdfToRow,
  uploadPdfAndSaveRow,
};
