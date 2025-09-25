import React from "react";
import { useNavigate } from "react-router-dom";
import itLogo from '../assets/it-logo.png';
import suprajitLogo from '../assets/suprajit_logo_BG.png';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: 30 }}>
      <div style={{ display: "flex", justifyContent: "center", gap: 800, marginBottom: 20 }}>
        <img src={suprajitLogo} alt="Suprajit Logo" style={{ height: 50 }} />
        <img src={itLogo} alt="IT Logo" style={{ height: 50 }} />
      </div>
      <h2
        style={{
          textAlign: "center",
          marginTop: 100,
          marginBottom: 50,
          color: "#bd2331", // Primary Red
          fontWeight: "bold",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana",
        }}
      >
        ASSESSMENTS
      </h2>

      <div style={{ display: "flex", gap: 20, justifyContent: "center" }}>
        <div
          onClick={() => navigate("/behavioral-assessment")}
          style={{
            flex: 1,
            minWidth: 280,
            padding: 40,
            backgroundColor: "#1e4489", // Primary Blue
            borderRadius: 14,
            boxShadow: "0 4px 14px rgba(29, 67, 137, 0.5)",
            textAlign: "center",
            fontSize: 22,
            fontWeight: 600,
            color: "white",
            cursor: "pointer",
            userSelect: "none",
            transition: "background-color 0.3s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#3fabe0")} // Sky Blue hover
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#1e4489")}
        >
          Behavioral Assessment Form
        </div>

        <div
        
          // onClick={() => navigate("/interview-assessment")}
          onClick={() => navigate("/interview")}

          style={{
            flex: 1,
            minWidth: 280,
            padding: 40,
            backgroundColor: "#5a2e9d", // Secondary Purple
            borderRadius: 14,
            boxShadow: "0 4px 14px rgba(90, 46, 157, 0.5)",
            textAlign: "center",
            fontSize: 22,
            fontWeight: 600,
            color: "white",
            cursor: "pointer",
            userSelect: "none",
            transition: "background-color 0.3s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#8fc63d")} // Secondary Green hover
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#5a2e9d")}
        >
          Interview Assessment Form
        </div>
      </div>
      <p style={{ textAlign: "center", marginTop: "150px", fontSize: "14px", color: "#666" }}>
        Powered by <strong>IS&amp;T</strong>
      </p>
    </div>
  );
}
