/* ReferenceCheckForm.js */
import React from "react";
import suprajitLogo from "../assets/suprajit_logo_BG.png";

export default function ReferenceCheckForm() {
  const [signaturePreview, setSignaturePreview] = React.useState(null);

  // Branding colors
  const PRIMARY_RED = "#bd2331";
  const PRIMARY_BLUE = "#1e4489";
  const TEXT_GRAY = "#606060";
  const ORANGE = "#ef6724";

  const page = {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana",
    minHeight: "100vh",
    background: "linear-gradient(to bottom right, #f6f6f6, #ffffff)",
    padding: 20,
    display: "flex",
    justifyContent: "center",
  };

  const card = {
    width: "100%",
    maxWidth: 1100,
    background: "#fff",
    padding: 20,
    borderRadius: 10,
    boxShadow: "0 0 12px rgba(0,0,0,0.12)",
  };

  const sectionTitle = {
    color: PRIMARY_BLUE,
    fontWeight: 700,
    fontSize: 17,
    marginTop: 28,
    marginBottom: 4,
  };

  const underline = {
    height: 3,
    backgroundColor: PRIMARY_RED,
    marginBottom: 18,
  };

  const label = {
    fontSize: 14,
    color: TEXT_GRAY,
    fontWeight: 600,
    marginBottom: 4,
  };

  const inputStyle = {
    width: "100%",
    padding: 8,
    borderRadius: 4,
    border: "1px solid #ccc",
    fontSize: 14,
    boxSizing: "border-box",
    marginBottom: 10,
  };

  const tableCell = {
    border: "1px solid #d3d3d3",
    padding: 10,
    verticalAlign: "top",
  };

  const paramCellLeft = {
    ...tableCell,
    width: "30%",
    background: "#fafafa",
    fontWeight: 600,
    color: TEXT_GRAY,
  };

  const paramCell = {
    ...tableCell,
    width: "35%",
  };

  return (
    <div style={page}>
      <div style={card}>
        {/* ---------------- Header ---------------- */}
        <img src={suprajitLogo} alt="Suprajit Logo" style={{ height: 56, marginBottom: 12 }} />

        <h2
          style={{
            backgroundColor: PRIMARY_BLUE,
            color: "white",
            padding: "12px 10px",
            borderRadius: 6,
            textAlign: "center",
            margin: 0,
            fontSize: 28,
            marginBottom: 20,
          }}
        >
          Reference Check
        </h2>

        {/* ---------------- Basic Info ---------------- */}
        <div
          style={{
            display: "flex",
            gap: 12,
            marginTop: 16,
            flexWrap: "wrap",
          }}
        >
          <div style={{ flex: "1 1 200px" }}>
            <div style={label}>Date:</div>
            <input type="date" style={inputStyle} />
          </div>

          <div style={{ flex: "1 1 260px" }}>
            <div style={label}>Name of the Candidate:</div>
            <input type="text" style={inputStyle} />
          </div>

          <div style={{ flex: "1 1 240px" }}>
            <div style={label}>Hired Position:</div>
            <input type="text" style={inputStyle} />
          </div>

          <div style={{ flex: "1 1 240px" }}>
            <div style={label}>Reference Check Done By:</div>
            <input type="text" style={inputStyle} />
          </div>
        </div>

        <p style={{ marginTop: 12, marginBottom: 8, color: TEXT_GRAY, fontWeight: 600 }}>
          Following are the references given by the candidate:
        </p>

        {/* ---------------- Reference 1 & 2 Headings ---------------- */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            fontWeight: 700,
            color: PRIMARY_BLUE,
            marginBottom: 6,
            fontSize: 15,
          }}
        >
          <div style={{ textAlign: "center" }}>Reference 1</div>
          <div style={{ textAlign: "center" }}>Reference 2</div>
        </div>

        {/* ---------------- 2 Column Reference Table ---------------- */}
        <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 20 }}>
          <tbody>
            <tr>
              {/* Reference 1 */}
              <td style={tableCell}>
                <div style={label}>Name:</div>
                <input type="text" style={inputStyle} />

                <div style={label}>Designation:</div>
                <input type="text" style={inputStyle} />

                <div style={label}>Company:</div>
                <input type="text" style={inputStyle} />

                <div style={label}>Contact No:</div>
                <input type="text" style={inputStyle} />
              </td>

              {/* Reference 2 */}
              <td style={tableCell}>
                <div style={label}>Name:</div>
                <input type="text" style={inputStyle} />

                <div style={label}>Designation:</div>
                <input type="text" style={inputStyle} />

                <div style={label}>Company:</div>
                <input type="text" style={inputStyle} />

                <div style={label}>Contact No:</div>
                <input type="text" style={inputStyle} />
              </td>
            </tr>
          </tbody>
        </table>

        {/* ---------------- Parameters Section ---------------- */}
        <h2 style={sectionTitle}>Parameters</h2>
        <div style={underline}></div>

        {/* Table Headings */}
        <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 12 }}>
          <thead>
            <tr>
              <th style={{ ...tableCell, fontWeight: 700, textAlign: "center" }}>Parameter</th>
              <th style={{ ...tableCell, fontWeight: 700, textAlign: "center" }}>Reference 1</th>
              <th style={{ ...tableCell, fontWeight: 700, textAlign: "center" }}>Reference 2</th>
            </tr>
          </thead>

          <tbody>
            {[
              "In what capacity do you know the candidate?",
              "How long do you know the candidate?",
              "Strengths",
              "Areas for improvement",
              "Ability to get work done from the team",
              "Were they able to achieve their targets on time?",
              "Does the candidate plan their work well?",
              "Why do you think they left?",
              "Inter-personal relationship / attitude",
              "Achievements",
            ].map((p, i) => (
              <tr key={i}>
                <td style={paramCellLeft}>{p}</td>
                <td style={paramCell}>
                  <textarea style={{ ...inputStyle, minHeight: 60 }} />
                </td>
                <td style={paramCell}>
                  <textarea style={{ ...inputStyle, minHeight: 60 }} />
                </td>
              </tr>
            ))}

            {/* Rating Row */}
            <tr>
              <td style={paramCellLeft}>Overall rating on a scale of 10</td>
              <td style={paramCell}>
                <input type="number" min={0} max={10} style={{ ...inputStyle, width: 100 }} />
              </td>
              <td style={paramCell}>
                <input type="number" min={0} max={10} style={{ ...inputStyle, width: 100 }} />
              </td>
            </tr>
          </tbody>
        </table>

        {/* ---------- SIGNATURE SECTION (Blue Header + Small Upload Box) ---------- */}

        <h2 style={sectionTitle}>Signature</h2>
        <div style={{ height: 3, backgroundColor: PRIMARY_RED, marginBottom: 12 }} />

        {/* NAME + DESIGNATION BOX (Outside table) */}
        <div
          style={{
            border: "1px solid #d3d3d3",
            padding: 16,
            borderRadius: 6,
            background: "#fff",
            marginBottom: 20,
          }}
        >
          {/* Name */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontWeight: 600, marginBottom: 4, fontSize: 14 }}>Name</div>
            <input type="text" style={inputStyle} />
          </div>

          {/* Designation */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontWeight: 600, marginBottom: 4, fontSize: 14 }}>
              Designation – Department
            </div>
            <input type="text" style={inputStyle} />
          </div>
        </div>

        {/* ---------- SIGNATURE SECTION (Compact Left-Aligned Box + Blue Header) ---------- */}
        <table
          style={{
            width: 200, // <<< SMALL WIDTH (same as your signature block)
            height: 100,
            borderCollapse: "collapse",
            marginBottom: 30,
            marginLeft: 0, // <<< LEFT ALIGNED
          }}
        >
          <thead>
            <tr>
              <th
                style={{
                  background: "#36a9e1",
                  color: "#000",
                  padding: "10px 0",
                  textAlign: "center",
                  border: "1px solid #000",
                  fontSize: 16,
                  fontWeight: 600,
                }}
              >
                Signature
              </th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td
                style={{
                  border: "1px solid #000",
                  height: 80,
                  textAlign: "center",
                  verticalAlign: "middle",
                }}
              >
                {/* Hidden Input */}
                <input
                  type="file"
                  id="signatureInput"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (!file) return;
                    const reader = new FileReader();
                    reader.onload = (ev) => setSignaturePreview(ev.target.result);
                    reader.readAsDataURL(file);
                  }}
                />

                {/* Small Clickable Signature Box */}
                <div
                  onClick={() =>
                    document.getElementById("signatureInput").click()
                  }
                  style={{
                    width: 180,
                    height: 48,
                    border: "1px solid #000",
                    borderRadius: 4,
                    background: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 4,
                    cursor: "pointer",
                    margin: "0 auto", // <<< centers inside table cell
                  }}
                >
                  {signaturePreview ? (
                    <img
                      src={signaturePreview}
                      alt="Signature Preview"
                      style={{
                        maxHeight: 40,
                        maxWidth: "95%",
                        objectFit: "contain",
                      }}
                    />
                  ) : (
                    <span style={{ fontSize: 12, color: TEXT_GRAY }}>Choose file</span>
                  )}
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        {/* ---------------- Buttons ---------------- */}
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 12, marginTop: 20 }}>
          <button
            style={{
              backgroundColor: ORANGE,
              color: "white",
              padding: "8px 18px",
              borderRadius: 6,
              border: "none",
              cursor: "pointer",
              fontSize: 14,
            }}
          >
            Save
          </button>

          <button
            style={{
              backgroundColor: PRIMARY_BLUE,
              color: "white",
              padding: "8px 18px",
              borderRadius: 6,
              border: "none",
              cursor: "pointer",
              fontSize: 14,
            }}
          >
            Download PDF
          </button>
        </div>

        <p
          style={{
            textAlign: "center",
            marginTop: 26,
            fontSize: 13,
            color: TEXT_GRAY,
          }}
        >
          Powered by <strong>IS&amp;T</strong>
        </p>
      </div>
    </div>
  );
}
