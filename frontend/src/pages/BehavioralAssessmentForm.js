import React, { useRef, useState, useEffect } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import API from "../services/api";
import suprajitLogo from "../assets/suprajit_logo_BG.png";
const inputStyle = {
  width: "100%",
  padding: 10,
  marginTop: 5,
  borderRadius: 5,
  border: "1px solid #ccc",
  fontSize: 14,
  boxSizing: "border-box",
};

// Reuse the locations array as is
const locations = [
  "U2",
  "U4",
  "U5",
  "U6",
  "U7",
  "U8",
  "U9",
  "U10",
  "U11",
  "U12",
  "U14",
  "U15",
  "U16",
  "SAL",
  "SED",
  "STC",
  "PLD 59A",
  "PLD A1",
  "PLDC",
  "CRP",
];

// Define skills list (unchanged)
const skillsList = [
  {
    id: 1,
    title: "Critical Thinking & Problem Solving",
    desc: "Assessing problems, identifying root causes, and finding flexible solutions.",
    bullets: [
      "Breaks complex problems into parts",
      "Uses logic and data to support decisions",
      "Adapts solutions to changing situations",
    ],
  },
  {
    id: 2,
    title: "Time Management",
    desc: "Prioritizing tasks, meeting deadlines, avoiding incomplete multitasking.",
    bullets: [
      "Completes work on time",
      "Prioritizes critical tasks",
      "Avoids juggling multiple unfinished tasks",
    ],
  },
  {
    id: 3,
    title: "Communication",
    desc: "Sharing ideas, listening actively, and giving feedback.",
    bullets: [
      "Communicates clearly",
      "Listens actively",
      "Provides constructive feedback",
    ],
  },
  {
    id: 4,
    title: "Teamwork & Collaboration",
    desc: "Working with respect, trust, and cooperation.",
    bullets: [
      "Supports teammates",
      "Shares credit",
      "Resolves conflict constructively",
    ],
  },
  {
    id: 5,
    title: "Self-Motivation & Accountability",
    desc: "Being proactive, self-driven, and responsible.",
    bullets: [
      "Takes initiative",
      "Accepts responsibility",
      "Learns from mistakes",
    ],
  },
  {
    id: 6,
    title: "Continuous Learning",
    desc: "Willingness to learn and stay updated.",
    bullets: [
      "Seeks new knowledge",
      "Learns from feedback",
      "Applies skills",
    ],
  },
  {
    id: 7,
    title: "Emotional Intelligence",
    desc: "Understanding emotions, maintaining composure.",
    bullets: [
      "Manages stress",
      "Shows empathy",
      "Builds relationships",
    ],
  },
];

export default function BehavioralAssessment() {
  const formRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Calculate total score from selects and update UI span
  const calculateScore = () => {
    let total = 0;
    for (let i = 1; i <= skillsList.length; i++) {
      const select = document.querySelector(`select[name="skill${i}"]`);
      if (select) total += Number(select.value) || 0;
    }
    const totalElem = document.getElementById("totalScore");
    if (totalElem) totalElem.innerText = total;
  };

  useEffect(() => {
    calculateScore();
  }, []);

  // Generate PDF blob from formRef html
  const generatePdfBlob = async () => {
    if (!formRef.current) return null;

    // Use higher scale for better resolution
    const canvas = await html2canvas(formRef.current, {
      scale: 2,
      useCORS: true, // If you have cross-origin images/styles
      logging: false,
      windowWidth: document.documentElement.scrollWidth,
      windowHeight: document.documentElement.scrollHeight,
    });

    const imgData = canvas.toDataURL("image/png");

    // Use portrait A4 size or dynamic size matching content
    // const pdf = new jsPDF("p", "pt", "a4");
    const pdf = new jsPDF({
      unit: "px",
      format: [canvas.width, canvas.height],
    });

    const imgProps = pdf.getImageProperties(imgData);

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

    return pdf.output("blob");
  };

  // Handle form submit, upload form data and generated PDF blob
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    const fd = new FormData(formRef.current);
    const employeeName = fd.get("employeeName")?.trim();
    const unit = fd.get("unit")?.trim();
    const managerName = fd.get("managerName")?.trim();
    const department = fd.get("department")?.trim();

    if (!employeeName || !unit || !managerName || !department) {
      alert("Please fill all Employee and Manager information fields.");
      return;
    }

    let skills = [];
    let totalScore = 0;
    for (const skill of skillsList) {
      const rating = fd.get(`skill${skill.id}`);
      const comments = fd.get(`skill${skill.id}_comments`) || "";
      if (!rating || rating === "0") {
        alert(`Please select a rating for "${skill.title}".`);
        return;
      }
      skills.push({
        id: skill.id,
        name: skill.title,
        rating,
        comments,
      });
      totalScore += Number(rating);
    }

    const payload = {
      employeeName,
      unit,
      managerName,
      department,
      skills,
      totalScore,
    };

    setIsSubmitting(true);

    try {
      const pdfBlob = await generatePdfBlob();

      const formData = new FormData();
      formData.append("payload", JSON.stringify(payload));
      formData.append("pdfFile", pdfBlob, "BehavioralAssessmentForm.pdf");

      const res = await API.post("/assessments", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data?.success) {
        alert("Assessment saved successfully!");
        formRef.current.reset();
        calculateScore();
      } else {
        alert(res.data?.message || "Submission failed.");
      }
    } catch (error) {
      alert("Failed to submit. Please try again later.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      style={{
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana",
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #f6f6f6, #ffffff)",
        padding: 20,
        boxSizing: "border-box",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          maxWidth: 900,
          width: "100%",
          background: "#fff",
          padding: 20,
          borderRadius: 10,
          boxShadow: "0 0 12px rgba(0, 0, 0, 0.1)",
        }}
      >
         <img
            src={suprajitLogo}          // or use "/images/suprajit-logo.png" if in public folder
            alt="Suprajit Logo"
            style={{ height: 60, marginRight: 16 }}
          />
        <h1
          style={{
            textAlign: "center",
            backgroundColor: "#1e4489",
            color: "#ffffff",
            padding: 15,
            borderRadius: 10,
            marginBottom: 20,
            marginTop: 0,
          }}
        >
          Behavioral Assessment
        </h1>
        <form ref={formRef} onSubmit={handleSubmit} onChange={calculateScore}>
          {/* Employee Info */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 20,
              marginBottom: 20,
            }}
          >
            <div>
              <label style={{ fontWeight: "bold", color: "#606060" }}>
                Employee Name:
              </label>
              <input type="text" name="employeeName" required style={inputStyle} />
            </div>
            <div>
              <label style={{ fontWeight: "bold", color: "#606060" }}>Unit:</label>
              <select name="unit" required style={inputStyle}>
                <option value="">-- Select Unit --</option>
                {locations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label style={{ fontWeight: "bold", color: "#606060" }}>
                Manager Name:
              </label>
              <input type="text" name="managerName" required style={inputStyle} />
            </div>
            <div>
              <label style={{ fontWeight: "bold", color: "#606060" }}>
                Department:
              </label>
              <input type="text" name="department" required style={inputStyle} />
            </div>
          </div>

          {/* Skills Sections */}
          {skillsList.map((skill) => (
            <section
              key={skill.id}
              style={{
                // background: "#3fabe0",
                padding: 15,
                marginBottom: 20,
                borderTop: "1px solid #606060",
                borderBottom: "1px solid #606060",
                borderRight: "1px solid #606060",
                borderLeft: "6px solid #bd2331",
                borderRadius: 5,
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
            >
              <h3 style={{ margin: 0, marginBottom: 5, color: "#1e4489" }}>
                {`${skill.id}. ${skill.title}`}
              </h3>
              <p style={{ fontStyle: "italic", color: "#606060" }}>{skill.desc}</p>
              <ul style={{ margin: "5px 0 15px 20px", color: "#333" }}>
                {skill.bullets.map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>

              <label>Rating (1-5): </label>
              <select
                name={`skill${skill.id}`}
                required
                style={{
                  width: "100%",
                  padding: 10,
                  marginTop: 5,
                  borderRadius: 5,
                  paddingBottom: 10,
                  border: "1px solid #ccc",
                  boxSizing: "border-box",
                }}
              >
                <option value="0">Select</option>
                {[1, 2, 3, 4, 5].map((v) => (
                  <option key={v} value={v}>
                    {v} - {["Poor", "Fair", "Good", "Very Good", "Excellent"][v - 1]}
                  </option>
                ))}
              </select>

              <label style={{ marginTop: 10 }}>Comments:</label>
              <textarea
                name={`skill${skill.id}_comments`}
                rows={3}
                style={{
                  width: "100%",
                  padding: 10,
                  marginTop: 5,
                  borderRadius: 5,
                  border: "1px solid #ccc",
                  resize: "vertical",
                  boxSizing: "border-box",
                }}
              />
            </section>
          ))}

          {/* Total Score */}
          <div
            style={{
              fontWeight: "bold",
              fontSize: 18,
              color: "#1e4489",
              marginTop: 20,
              textAlign: "centre",
            }}
          >
            Total Score: <span id="totalScore">0</span> / {skillsList.length * 5}
          </div>

          {/* Buttons */}
          <div style={{ marginTop: 20, textAlign: "centre" }}>
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                backgroundColor: isSubmitting ? "#8fc63d" : "#ef6724",
                color: "white",
                padding: "10px 20px",
                marginRight: 15,
                borderRadius: 6,
                border: "none",
                fontSize: 16,
                cursor: isSubmitting ? "not-allowed" : "pointer",
                transition: "background-color 0.3s ease",
              }}
              onMouseOver={(e) => {
                if (!isSubmitting) e.currentTarget.style.backgroundColor = "#3fabe0";
              }}
              onMouseOut={(e) => {
                if (!isSubmitting) e.currentTarget.style.backgroundColor = "#ef6724";
              }}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
        <p style={{ textAlign: "center", marginTop: "30px", fontSize: "14px", color: "#666" }}>
        Powered by <strong>IS&amp;T</strong>
      </p>
      </div>
    </div>
    
  );
}
