import React from "react";
import { useNavigate } from "react-router-dom";
import suprajitLogo from '../assets/suprajit_logo_BG.png';

const colors = {
  primaryRed: "#bd2331",
  primaryBlue: "#1e4489",
  darkGrey: "#606060",
  secondaryPurple: "#5a2e9d",
  secondaryGreen: "#8fc63d",
  secondaryCyan: "#3fabe0",
  secondaryOrange: "#ef6724",
};

export default function InterviewInstructions() {
  const navigate = useNavigate();

  const handleFormSelect = (level) => {
    navigate(`/interview/${level}`);
  };

  return (
    <>
    <div style={{ display: "flex", justifyContent: "left", gap: 800,  marginTop: 20, marginLeft: 50 }}>
        <img src={suprajitLogo} alt="Suprajit Logo" style={{ height: 60 }} />
    </div>
    <div
      style={{
        maxWidth: 1100,
        margin: "10px auto",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana",
        color: colors.darkGrey,
        padding: 10,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", marginBottom: 30 }}>
        <h2 style={{ color: colors.primaryBlue, margin: 0, marginRight: "auto", marginLeft: "auto" }}>
          Instruction to the Interviewer
        </h2>
      </div>

      <div
        style={{
          backgroundColor: colors.primaryBlue,
          color: "white",
          borderRadius: 8,
          padding: 30,
          fontSize: 16,
          lineHeight: 1.5,
          marginBottom: 30,
        }}
      >
        <p>Take time during the interview to fully describe the position and the organization, allowing the candidate to ask questions as needed.</p>
        <h3 style={{ marginTop: 20 }}>
          Notes on what to talk about
        </h3>
        <ul style={{ marginTop: 10, paddingLeft: 20 }}>
          <li><strong>Information About Suprajit:</strong> About our business and prospects.</li>
          <li><strong>Brief about the Position:</strong> Responsibilities and career opportunities.</li>
          <li><strong>Company Culture:</strong> Employee vision.</li>
          <li><strong>Career Path:</strong> Explain the future job prospect of this position.</li>
        </ul>
      </div>

      <h3 style={{ color: colors.primaryRed, marginBottom: 20 }}>
        Select Interview Assessment Form
      </h3>

      <div style={{ display: "flex", gap: 16 }}>
        <button
          onClick={() => handleFormSelect("entry")}
          style={{
            flex: 1,
            padding: "14px 0",
            backgroundColor: colors.secondaryPurple,
            color: "white",
            fontSize: 18,
            fontWeight: 600,
            borderRadius: 8,
            cursor: "pointer",
            border: "none",
            transition: "background-color 0.3s ease",
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.secondaryGreen}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = colors.secondaryPurple}
        >
          Interview Assessment Form - <br/>Entry Level
        </button>

        <button
          onClick={() => handleFormSelect("mid")}
          style={{
            flex: 1,
            padding: "14px 0",
            backgroundColor: colors.secondaryCyan,
            color: "white",
            fontSize: 18,
            fontWeight: 600,
            borderRadius: 8,
            cursor: "pointer",
            border: "none",
            transition: "background-color 0.3s ease",
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.secondaryOrange}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = colors.secondaryCyan}
        >
          {/* Interview Assessment Form - Mid Level */}
          Interview Assessment Form - <br/>Mid Level
        </button>

        <button
          onClick={() => handleFormSelect("senior")}
          style={{
            flex: 1,
            padding: "14px 0",
            backgroundColor: colors.primaryRed,
            color: "white",
            fontSize: 18,
            fontWeight: 600,
            borderRadius: 8,
            cursor: "pointer",
            border: "none",
            transition: "background-color 0.3s ease",
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.secondaryBlue}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = colors.primaryRed}
        >
          Interview Assessment Form - <br/>Senior Level
        </button>
      </div>
    </div>
    </>
  );
}
