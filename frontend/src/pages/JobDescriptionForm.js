/* JobDescriptionForm.js */
import React from "react";
import suprajitLogo from "../assets/suprajit_logo_BG.png";

export default function JobDescriptionForm() {
  const PRIMARY_BLUE = "#1e4489";
  const PRIMARY_RED = "#bd2331";
  const TEXT_GRAY = "#606060";

  const label = {
    fontWeight: 600,
    color: TEXT_GRAY,
    marginBottom: 4,
    fontSize: 14,
    display: "block",
  };

  const input = {
    width: "100%",
    padding: 8,
    borderRadius: 5,
    border: "1px solid #ccc",
    fontSize: 14,
    boxSizing: "border-box",
    marginBottom: 12,
  };

  // Updated heading style (matching Reference Check form)
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
    marginBottom: 14,
  };

  return (
    <div
      style={{
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana",
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #f6f6f6, #ffffff)",
        padding: 20,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 900,
          background: "#fff",
          padding: 20,
          borderRadius: 10,
          boxShadow: "0 0 10px rgba(0,0,0,0.12)",
        }}
      >
        {/* Logo */}
        <img
          src={suprajitLogo}
          alt="Suprajit Logo"
          style={{ height: 52, marginBottom: 12 }}
        />

        {/* Header */}
        <h1
          style={{
            backgroundColor: PRIMARY_BLUE,
            color: "#fff",
            textAlign: "center",
            padding: "12px 10px",
            borderRadius: 8,
            marginTop: 0,
            marginBottom: 20,
            fontSize: 28,
            fontWeight: 700,
          }}
        >
          Job Description Form
        </h1>

        {/* === JOB DESCRIPTION TABLE === */}
        {/* <h2 style={sectionTitle}>Job Description</h2> */}
        {/* <div style={underline}></div> */}

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginBottom: 15,
            fontSize: 14,
          }}
        >
          <tbody>
            {/* Row 1 */}
            <tr>
              <td style={{ border: "1px solid #ccc", padding: 10 }}>
                <label style={label}>Designation:</label>
                <input type="text" style={input} />
              </td>
              <td style={{ border: "1px solid #ccc", padding: 10 }}>
                <label style={label}>Department:</label>
                <input type="text" style={input} />
              </td>
            </tr>

            {/* Row 2 */}
            <tr>
              <td style={{ border: "1px solid #ccc", padding: 10 }}>
                <label style={label}>Reporting Officer:</label>
                <input type="text" style={input} />
              </td>
              <td style={{ border: "1px solid #ccc", padding: 10 }}>
                <label style={label}>Reviewing Officer:</label>
                <input type="text" style={input} />
              </td>
            </tr>

            {/* Row 3 */}
            <tr>
              <td style={{ border: "1px solid #ccc", padding: 10 }}>
                <label style={label}>Region / State / City:</label>
                <input type="text" style={input} />
              </td>
              <td style={{ border: "1px solid #ccc", padding: 10 }}>
                <label style={label}>Work Location:</label>
                <input type="text" style={input} />
              </td>
            </tr>
          </tbody>
        </table>

        {/* === SUMMARY === */}
        <h2 style={sectionTitle}>Role Summary</h2>
        <div style={underline}></div>
        <textarea rows={4} style={input}></textarea>

        {/* === ROLES AND RESPONSIBILITIES === */}
        <h2 style={sectionTitle}>Roles & Responsibilities</h2>
        <div style={underline}></div>
        <textarea rows={5} style={input}></textarea>

        {/* === REQUIRED QUALIFICATIONS === */}
        <h2 style={sectionTitle}>Required Qualifications</h2>
        <div style={underline}></div>

        <label style={label}>Education:</label>
        <input type="text" style={input} />

        <label style={label}>Experience:</label>
        <input type="text" style={input} />

        <label style={label}>Skills:</label>
        <textarea rows={3} style={input}></textarea>

        <label style={label}>Other Requirements:</label>
        <textarea rows={3} style={input}></textarea>

        {/* === KEY COMPETENCIES === */}
        <h2 style={sectionTitle}>Key Competencies</h2>
        <div style={underline}></div>
        <textarea rows={3} style={input}></textarea>

        {/* Buttons */}
        <div style={{ textAlign: "center", marginTop: 25 }}>
          <button
            style={{
              backgroundColor: "#ef6724",
              color: "#fff",
              padding: "8px 18px",
              borderRadius: 6,
              border: "none",
              fontSize: 14,
              cursor: "pointer",
              marginRight: 12,
            }}
          >
            Submit
          </button>

          <button
            style={{
              backgroundColor: PRIMARY_BLUE,
              color: "#fff",
              padding: "8px 18px",
              borderRadius: 6,
              border: "none",
              fontSize: 14,
              cursor: "pointer",
            }}
          >
            Download PDF
          </button>
        </div>

        {/* Footer */}
        <p
          style={{
            textAlign: "center",
            marginTop: 25,
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
