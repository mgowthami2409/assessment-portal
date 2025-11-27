import React from "react";
import { useNavigate } from "react-router-dom";
import itLogo from "../assets/it-logo.png";
import suprajitLogo from "../assets/suprajit_logo_BG.png";

export default function HomePage() {
  const navigate = useNavigate();

  // BRAND COLORS
  const PRIMARY_RED = "#bd2331";
  const PRIMARY_BLUE = "#1e4489";
  const GRAY = "#606060";
  const PURPLE = "#5a2e9d";
  const GREEN = "#8fc63d";
  const SKYBLUE = "#3fabe0"; // corrected (you typed 3fabeo earlier)
  const ORANGE = "#ef6724";

  const cardBaseStyle = {
    padding: 45,
    borderRadius: 16,
    textAlign: "center",
    fontSize: 22,
    fontWeight: 600,
    color: "white",
    cursor: "pointer",
    userSelect: "none",
    transition: "all 0.25s ease",
    boxShadow: "0 6px 18px rgba(0,0,0,0.18)",
  };

  return (
    <div style={{ padding: 30 }}>
      {/* Logos Row */}
      <div style={{ display: "flex", justifyContent: "center", gap: 800, marginBottom: 20 }}>
        <img src={suprajitLogo} alt="Suprajit Logo" style={{ height: 50 }} />
        <img src={itLogo} alt="IT Logo" style={{ height: 50 }} />
      </div>

      {/* Page Title */}
      <h2
        style={{
          textAlign: "center",
          marginTop: 80,
          marginBottom: 50,
          color: PRIMARY_RED,
          fontWeight: "bold",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana",
          fontSize: 24,
          letterSpacing: "1px",
        }}
      >
        ASSESSMENTS
      </h2>

      {/* Cards Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(380px, 1fr))",
          gap: 30,
          justifyContent: "center",
          maxWidth: 1100,
          margin: "0 auto",
        }}
      >
        {/* Behavioral Assessment */}
        <div
          onClick={() => navigate("/behavioral-assessment")}
          style={{ ...cardBaseStyle, backgroundColor: PRIMARY_BLUE }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = SKYBLUE)}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = PRIMARY_BLUE)}
        >
          Behavioral Assessment Form
        </div>

        {/* Interview Assessment */}
        <div
          onClick={() => navigate("/interview")}
          style={{ ...cardBaseStyle, backgroundColor: PURPLE }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = GREEN)}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = PURPLE)}
        >
          Interview Assessment Form
        </div>

        {/* Job Description */}
        <div
          onClick={() => navigate("/job-description")}
          style={{ ...cardBaseStyle, backgroundColor: ORANGE }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = GREEN)}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = ORANGE)}
        >
          Job Description Form
        </div>

        {/* Reference Check */}
        <div
          onClick={() => navigate("/reference-check")}
          style={{ ...cardBaseStyle, backgroundColor: SKYBLUE }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = PRIMARY_BLUE)}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = SKYBLUE)}
        >
          Reference Check Form
        </div>
      </div>

      {/* Footer */}
      <p style={{ textAlign: "center", marginTop: 150, fontSize: 14, color: GRAY }}>
        Powered by <strong>IS&amp;T</strong>
      </p>
    </div>
  );
}
