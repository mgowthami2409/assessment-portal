import React, { useState, useEffect } from "react"; // Replace current import by this
import { useParams } from "react-router-dom";        // Add this import
import { submitInterviewForm, getInterviewById } from "../services/api";  // Import both API functions
import suprajitLogo from '../assets/suprajit_logo_BG.png';

const initialValuesData = [
  {
    id: "respect",
    title: "Value 1: Respect",
    questions: [
      "Can you describe a time when you had to work with someone from a different background or with different beliefs than yours? How did you ensure mutual respect in that situation?",
      "Tell me about a time when you had a disagreement with a colleague. How did you handle it while maintaining respect for each other?",
      "Give me an example of a situation where you had to work with someone who was difficult to get along with. How did you approach the relationship to ensure respect and collaboration?",
      "Imagine you are working on a team project, and a team member consistently interrupts others during meetings. How would you address this behaviour while respecting their contributions and maintaining a positive team atmosphere?",
      "You notice that a colleague consistently arrives late to team meetings, which disrupts the schedule. How would you approach this situation while respecting their time and commitment?",
    ],
  },
  {
    id: "transparency",
    title: "Value 2: Transparency",
    questions: [
      "Can you give an example of a time when you had to communicate transparently in a team setting?",
      "What steps would you take to promote a culture of transparency within a team or organization?",
      "How do you handle situations where information might be sensitive or confidential, but there is a need for transparency?",
      "Have you ever experienced a lack of transparency in a previous role? How did you handle it?",
    ],
  },
  {
    id: "adaptability",
    title: "Value 3: Adaptability",
    questions: [
      "Can you describe a situation where you were given a new task or responsibility that was outside of your comfort zone? How did you approach it?",
      "Give an example of when you had to quickly learn a new skill or tool to complete a task or project. How did you go about it?",
      "Have you ever faced a setback or obstacle while working on a project or task? How did you adapt and continue to make progress?",
      "Describe a situation where you had to change your approach or strategy midway through a project due to new information or unexpected challenges. How did you handle it?",
      "Tell me about a time when you had to adapt to a significant change in your work or academic environment. How did you handle it?",
    ],
  },
  {
    id: "collaboration",
    title: "Value 4: Collaboration",
    questions: [
      "Describe a situation where you had to work with someone who had a different working style or personality than yours. How did you handle the collaboration, and what was the outcome?",
      "Give an example of a successful collaboration experience you've had. What factors do you think contributed to the success of that collaboration?",
      "How do you handle disagreements or conflicts within a team environment? Can you share an example of a time when you successfully resolved a conflict with a teammate?",
      "How do you prioritize tasks and manage your time when working on a team project with deadlines? Can you provide an example from your previous experiences?",
      "Can you provide an example of a time when you worked as part of a team to achieve a goal or complete a project? What was your role, and how did you contribute?",
    ],
  },
  {
    id: "customer",
    title: "Value 5: Focus on Customer",
    questions: [
      "Can you describe a time when you went above and beyond to help a customer or client? What was the outcome?",
      "Tell me about a situation where you had to handle a difficult customer. How did you approach the situation and what was the result?",
      "How do you ensure that you understand the needs and expectations of customers or clients? Can you provide an example?",
      "Have you ever encountered a situation where you had to deliver bad news to a customer? How did you handle it?",
      "How do you handle a situation where a customer is dissatisfied with your company's product or service?",
      "How do you stay motivated to deliver excellent customer service, especially during busy or challenging times?",
    ],
  },
  {
    id: "innovation",
    title: "Value 6: Innovation",
    questions: [
      "Describe a situation where you generated a creative idea to solve a problem. What was the idea, and what impact did it have?",
      "Can you give an example of a time you faced a challenge that required thinking outside the box? What was your approach, and what was the result?",
      "Can you share an experience where you had to adapt your innovative idea based on feedback or unforeseen circumstances? What adjustments did you make?",
      "Have you ever proposed an idea that didn’t work out as planned? How did you respond to the failure, and what did you learn from it?",
      "Give an example of a process or system you improved through innovation. What was the original process, and what changes did you implement?",
    ],
  },
];

const styles = {
  container: {
    padding: 20,
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana",
    // background: "#f7fafc",
    color: "#333333ff",
  },
  heading2: {
    color: "#1e4489",
    borderBottom: "2px solid #bd2331",
    paddingBottom: 8,
  },
  inputLabel: {
    fontWeight: 500,
    marginTop: 20,
    display: "block",
  },
  inputStyle: {
    width: "100%",
    padding: 10,
    marginTop: 4,
    border: "1px solid #ccc",
    borderRadius: 5,
    boxSizing: "border-box",
  },
  textareaStyle: {
    width: "100%",
    height: 80,
    padding: 10,
    marginTop: 4,
    border: "1px solid #ccc",
    borderRadius: 5,
    boxSizing: "border-box",
    resize: "vertical",
  },
  questionBlock: {
    backgroundColor: "white",
    border: "1px solid #ccc",
    borderRadius: 10,
    padding: 16,
    marginBottom: 30,
    boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
  },
  questionBlockTitle: {
    color: "#5a2e9d",
    marginTop: 0,
    marginBottom: 12,
    fontWeight: 700,
    fontSize: 20,
  },
  carTable: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: 10,
  },
  carTableTh: {
    border: "1px solid #ccc",
    padding: 8,
    verticalAlign: "top",
    backgroundColor: "#3fabe0",
    textAlign: "center",
  },
  carTableTd: {
    border: "1px solid #ccc",
    padding: 8,
    verticalAlign: "top",
  },
  btnGroup: {
    marginTop: 30,
    textAlign: "center",
    alignItems: "center",
  },
  btn: {
    padding: "8px 16px",
    backgroundColor: "#bd2331",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    fontSize: 16,
    marginRight: 10,
    textDecoration: "none",
    display: "inline-block",
  },
  tableStyle: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: 10,
  },
  thStyle: {
    border: "1px solid #ccc",
    padding: 10,
    backgroundColor: "#3fabe0",
    fontWeight: 600,
    fontSize: 16,
    textAlign: "center",
    color: "black",
  },
  tdStyle: {
    border: "1px solid #ccc",
    padding: 8,
    verticalAlign: "top",
    backgroundColor: "white",
  },
  signatureTable: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: 10,
    marginBottom: 25,
  },
  signatureTh: {
    border: "1px solid #000000",
    padding: 10,
    backgroundColor: "#3fabe0",
    color: "black",
    fontWeight: 600,
    textAlign: "center",
    fontSize: 16,
  },
  signatureBox: {
    border: "1px solid #000000",
    height: 80,
    minWidth: 180,
    textAlign: "center",
    backgroundColor: "#fff",
    verticalAlign: "middle",
    padding: 0,
  },
  signatureImg: {
    maxHeight: 56,
    maxWidth: "90%",
    objectFit: "contain",
    display: "block",
    margin: "8px auto 4px auto",
  },
  signatureInput: {
    marginTop: 4,
    width: "95%",
  },
};

function normalizeBase64(signature) {
  if (!signature) return "";
  // If already a proper data URL, return as-is
  if (signature.startsWith("data:image")) return signature;

  // Guess image type by base64 hint (jpeg vs png)
  const mimeType = signature.includes("/9j/") ? "image/jpeg" : "image/png";

  return `data:${mimeType};base64,${signature}`;
}

export default function InterviewAssessmentForm() {
  const { id } = useParams();  // GET INTERVIEW ID FROM URL
  // const printRef = useRef();
  const [formData, setFormData] = useState({
    candidateName: "",
    competencies: [
      { name: "", comments: "", rating: null },
      { name: "", comments: "", rating: null },
      { name: "", comments: "", rating: null },
      { name: "", comments: "", rating: null },
    ],
    // competencyNames: ["", "", "", ""], // 5 empty values for 5 rows
    interviewDate: "",
    interviewerName: "",
    position: "",
    location: "",
    strengths: "",
    improvementAreas: "",
    finalRecommendation: "",
    overallComments: "",
    reviewingManagerName: "",
    divisionHRName: "",
    hiringManagerRecommendation: "",
    behavioralAnswers: initialValuesData.map(() => ({
      selectedQuestions: [],
      notes: { circumstance: "", action: "", result: "" },
    })),
  });

  // Signature image state
  const [signatures, setSignatures] = useState({
    hiringManager: null,
    reviewingManager: null,
    divisionHR: null,
  });

  const updateField = (field, value) => {
    setFormData((f) => ({ ...f, [field]: value }));
  };

  
  useEffect(() => {
    if (id) {
      getInterviewById(id)
        .then((res) => {
          if (res.data.success) {
            const data = res.data.interview;

            // Ensure behavioralAnswers array is available, else initialize default
            const behavioralAnswers =
              Array.isArray(data.behavioralAnswers) && data.behavioralAnswers.length === 6
                ? data.behavioralAnswers
                : Array(6)
                    .fill()
                    .map(() => ({
                      selectedQuestions: [],
                      notes: { circumstance: "", action: "", result: "" },
                    }));

            setFormData({
              candidateName: data.candidateName || "",
              // competencyNames: data.competencyNames || ["", "", "", "", ""],
              competencies: data.competencies || [
                { name: "", comments: "", rating: null },
                { name: "", comments: "", rating: null },
                { name: "", comments: "", rating: null },
                { name: "", comments: "", rating: null },
              ],
              interviewerName: data.interviewerName || "",
              position: data.position || "",
              location: data.location || "",
              interviewDate: data.interviewDate || "",
              strengths: data.strengths || "",
              improvementAreas: data.improvementAreas || "",
              finalRecommendation: data.finalRecommendation || "",
              overallComments: data.overallComments || "",
              reviewingManagerName: data.reviewingManagerName || "",
              divisionName: data.divisionName || "",
              behavioralAnswers: behavioralAnswers,
              hiringManagerRecommendation: data.hiringManagerRecommendation || "",
            });

            setSignatures({
              hiringManager: data.hiringManager || null,
              reviewingManager: data.reviewingManager || null,
              divisionHR: data.divisionHR || null,
            });
          } else {
            alert("Interview data not found.");
          }
        })
        .catch((err) => {
          alert("Failed to fetch interview data.");
          console.error(err);
        });
    }
  }, [id]);

  const updateBehavioralNote = (valueIndex, field, text) => {
    setFormData((f) => {
      const answersCopy = f.behavioralAnswers.slice();
      answersCopy[valueIndex].notes[field] = text;
      return { ...f, behavioralAnswers: answersCopy };
    });
  };

  const handleSignatureUpload = (role, e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setSignatures((prev) => ({
          ...prev,
          [role]: ev.target.result,
        }));
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please select a valid image file for the signature.");
    }
  };

  const [interviewId, setInterviewId] = useState(null);
  
  const handleSubmitAndShare = async () => {
  try {
    // Save form data to backend
    const payload = {
      ...formData,
      ...signatures,
    };

    const response = await submitInterviewForm(payload, interviewId);

    if (response.data.success) {
      // Store interview ID for further updates
      setInterviewId(response.data.interviewId);
      alert("Form saved successfully!");

      // Build the link and safely encode all fields for mailto
      const link = `${window.location.origin}/interview/entry/${response.data.interviewId}`;
      const subject = encodeURIComponent("Interview Assessment Form");
      const lines = [
        `Candidate Name: ${formData.candidateName}`,
        `Interviewer: ${formData.interviewerName}`,
        `Position: ${formData.position}`,
        `Location: ${formData.location}`,
        `Date: ${formData.interviewDate}`,
        "",
        `Link to form: ${link}`,
        "",
        "Please review, update if required, and add your signature."
      ];
      const body = encodeURIComponent(lines.join("\n"));

      // Open user's default email client with subject and body prefilled, but no recipient
      window.location.href = `mailto:?subject=${subject}&body=${body}`;
    } else {
      alert("Failed to save form");
    }
  } catch (err) {
    console.error(err);
    alert("Error occurred while saving form");
  }
};

  return (
    <div style={styles.container}>
      <img
        src={suprajitLogo}          // or use "/images/suprajit-logo.png" if in public folder
        alt="Suprajit Logo"
        style={{ height: 60, marginRight: 16 }}
      />
      <h2 style={styles.heading2}>Interview Assessment Form - Entry Level</h2>

      <label style={styles.inputLabel}>Candidate Name:</label>
      <input
        type="text"
        value={formData.candidateName}
        onChange={(e) => updateField("candidateName", e.target.value)}
        style={styles.inputStyle}
      />

      <label style={styles.inputLabel}>Date of Interview:</label>
      <input
        type="date"
        value={formData.interviewDate}
        onChange={(e) => updateField("interviewDate", e.target.value)}
        style={styles.inputStyle}
      />

      <label style={styles.inputLabel}>Interviewer:</label>
      <input
        type="text"
        value={formData.interviewerName}
        onChange={(e) => updateField("interviewerName", e.target.value)}
        style={styles.inputStyle}
      />

      <label style={styles.inputLabel}>Position:</label>
      <input
        type="text"
        value={formData.position}
        onChange={(e) => updateField("position", e.target.value)}
        style={styles.inputStyle}
      />

      <label style={styles.inputLabel}>Location:</label>
      <select
        value={formData.location}
        onChange={(e) => updateField("location", e.target.value)}
        style={styles.inputStyle}
      >
        <option value="">-- Select Location --</option>
        {[
          "U2", "U4", "U5", "U6", "U7", "U8", "U9", "U10", "U11", "U12",
          "U14", "U15", "U16", "SAL", "SED", "STC", "PLD 59A", "PLD A1", "PLDC", "CRP"
        ].map((loc) => (
          <option key={loc} value={loc}>{loc}</option>
        ))}
      </select>

      <h3 style={{ ...styles.heading2, marginTop: 32 }}>Position-Specific Competencies (To be updated by the Hiring Manager)</h3>
      {/* Blue header bar */}
      <div
        style={{
          background: "#1e4489",
          color: "#fff",
          fontWeight: 600,
          fontSize: 17,
          padding: "9px 14px",
          borderRadius: "4px 4px 0 0",
          border: '1px solid #bd2331',
          textAlign: "center",
          marginBottom: 0,
          letterSpacing: "0.2px",
        }}
      >
      Assessment and rating to be done based on the candidate’s response. Kindly tick the appropriate rating.
      </div>
      <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 0 }}>
        <tbody>
          <tr>
            <td rowSpan={2} style={{
              background: "#bd2331", fontWeight: 600, padding: "8px 12px",
              border: "1px solid #ccc", color: "#fff", fontSize: 15, textAlign: "center", minWidth: 62
            }}>
              Scale:
            </td>

            <td style={{
              color: "#222", border: "1px solid #000", padding: "6px 12px",
              fontSize: 16, textAlign: "center", fontWeight: 600, minWidth: 130
            }}>
              4 – Expert
            </td>
            <td style={{
              color: "#222", border: "1px solid #000", padding: "6px 12px",
              fontSize: 16, textAlign: "center", fontWeight: 600, minWidth: 90
            }}>
              3 – Advanced
            </td>
            <td style={{
              color: "#222", border: "1px solid #000", padding: "6px 12px",
              fontSize: 16, textAlign: "center", fontWeight: 600, minWidth: 110
            }}>
              2 – Competent
            </td>
            <td style={{
              color: "#222", border: "1px solid #000", padding: "6px 12px",
              fontSize: 16, textAlign: "center", fontWeight: 600, minWidth: 130
            }}>
              1 – Basic
            </td>
          </tr>
          <tr>
            <td colSpan={5}
              style={{
                fontWeight: 600, fontSize: 15, padding: "8px 12px", color: "white",
                border: "1px solid #ccc", background: "#1e4489", textAlign: "center"
              }}
            >
              Position specific Competency (to be filled-in by the panel, prior to interview - as per the expected skills/Competency needed)
            </td>
          </tr>
        </tbody>
      </table>

      
      <table style={styles.tableStyle}>
        <thead>
          <tr>
            <th style={styles.thStyle}>Competency</th>
            <th style={styles.thStyle}>Comments</th>
            {[4, 3, 2, 1].map((score) => (
              <th key={score} style={styles.thStyle}>{score}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {(formData.competencies || []).map((comp, idx) => (
            <tr key={idx}>
              <td style={styles.tdStyle}>
                <input
                  type="text"
                  value={comp.name}
                  onChange={(e) => {
                    const newComps = [...formData.competencies];
                    newComps[idx] = { ...newComps[idx], name: e.target.value };
                    setFormData((prev) => ({ ...prev, competencies: newComps }));
                  }}
                  placeholder={`Enter Competency ${idx + 1}`}
                  style={{
                    width: "90%",
                    padding: 8,
                    borderRadius: 4,
                    border: "1px solid #ccc"
                  }}
                />
              </td>
              <td style={styles.tdStyle}>
                <textarea
                  rows={3}
                  value={comp.comments}
                  onChange={(e) => {
                    const newComps = [...formData.competencies];
                    newComps[idx] = { ...newComps[idx], comments: e.target.value };
                    setFormData((prev) => ({ ...prev, competencies: newComps }));
                  }}
                  style={styles.textareaStyle}
                />
              </td>
              {[4, 3, 2, 1].map((score) => (
                <td key={score} style={{ ...styles.tdStyle, textAlign: "center" }}>
                  <input
                    type="radio"
                    name={`rating-${idx}`}
                    value={score}
                    checked={comp.rating === score}
                    onChange={(e) => {
                      const newComps = [...formData.competencies];
                      newComps[idx] = { ...newComps[idx], rating: Number(e.target.value) };
                      setFormData((prev) => ({ ...prev, competencies: newComps }));
                    }}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: 20, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <button
          type="button"
          onClick={() => {
            setFormData(prev => ({
              ...prev,
              competencies: [...prev.competencies, { name: "", comments: "", rating: null }],
            }));
          }}
          style={{
            backgroundColor: "#bd2331",
            color: "#fff",
            padding: "8px 16px",
            borderRadius: 6,
            border: "none",
            cursor: "pointer",
          }}
        >
          Add Competency Row
        </button>

        <button
          type="button"
          onClick={() => {
            setFormData(prev => {
              if (prev.competencies.length > 4) {
                const newComps = prev.competencies.slice(0, -1);
                return { ...prev, competencies: newComps };
              }
              return prev;
            });
          }}
          style={{
            backgroundColor: "#1e4489",
            color: "#fff",
            padding: "8px 16px",
            borderRadius: 6,
            border: "none",
            cursor: "pointer",
          }}
          disabled={formData.competencies.length <= 4}
          title={formData.competencies.length <= 4 ? "Cannot delete mandatory rows" : "Delete last Competency Row"}
        >
          Delete Competency Row
        </button>
      </div>

      <label style={styles.inputLabel}>Strengths:</label>
      <textarea
        style={styles.textareaStyle}
        value={formData.strengths}
        onChange={(e) => updateField("strengths", e.target.value)}
      />

      <label style={styles.inputLabel}>Areas of Improvement:</label>
      <textarea
        style={styles.textareaStyle}
        value={formData.improvementAreas}
        onChange={(e) => updateField("improvementAreas", e.target.value)}
      />

      <label style={styles.inputLabel}>Overall Comments:</label>
      <textarea
        style={styles.textareaStyle}
        value={formData.overallComments}
        onChange={(e) => updateField("overallComments", e.target.value)}
      />

      <h3 style={{ ...styles.heading2, marginTop: 40 }}>Recommendation by the Hiring Manager</h3>
      <div
        style={{
          backgroundColor: "white",
          border: "1px solid #ccc",
          borderRadius: 10,
          padding: 16,
          marginBottom: 32,
          boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
        }}
      >
        {["Proceed to Behavioral Interview", "Rejected"].map((opt) => (
          <label key={opt} style={{ display: "block", marginBottom: 8, cursor: "pointer" }}>
            <input
              type="radio"
              name="hiringManagerRecommendation"  // changed from finalRecommendation
              value={opt}
              checked={formData.hiringManagerRecommendation === opt}
              onChange={e => updateField("hiringManagerRecommendation", e.target.value)}
              style={{ marginRight: 8 }}
            />
            {opt}
          </label>
        ))}
      </div>

      <h3 style={{ ...styles.heading2, marginTop: 32 }}>Behavioral Interview Questions (To be updated by HR)</h3>
      <p style={{ fontStyle: "italic", color: "#555" }}>
        Behavioural interview questions use real past experiences to predict how someone might perform in the future.
      </p>
      <p style={{ fontStyle: "italic", color: "#555", marginBottom: 10 }}>
        Select one question from the list below and use it with all candidates for this role to maintain a fair and consistent interview process.
      </p>

      {initialValuesData.map((value, idx) => (
        <div key={value.id} style={styles.questionBlock}>
          <h4 style={styles.questionBlockTitle}>{value.title}</h4>
          <label htmlFor={`behavioral-select-${idx}`} style={{ fontWeight: 600, marginBottom: 8, display: 'block' }}>
            Select one question:
          </label>
          <select
            id={`behavioral-select-${idx}`}
            value={
              formData.behavioralAnswers &&
              formData.behavioralAnswers[idx] &&
              formData.behavioralAnswers[idx].selectedQuestions.length > 0
                ? formData.behavioralAnswers[idx].selectedQuestions[0]
                : ""
            }
            onChange={(e) => {
              const selected = Number(e.target.value);
              setFormData((f) => {
                const answersCopy = [...f.behavioralAnswers];
                answersCopy[idx].selectedQuestions = selected >= 0 ? [selected] : [];
                return { ...f, behavioralAnswers: answersCopy };
              });
            }}
            style={{ width: "100%", padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
          >
            <option value="">-- Select a question --</option>
            {value.questions.map((q, qi) => (
              <option key={qi} value={qi}>{q}</option>
            ))}
          </select>

          <div style={{ marginTop: 12, marginBottom: 6, fontWeight: 600 }}>
            Interview Notes:{" "}
            <span style={{ fontStyle: "italic", color: "#555", marginLeft: 8, fontSize: 13 }}>
              Mention what is the circumstance, action taken by the candidate and what was the result
            </span>
          </div>
          <table style={styles.carTable}>
            <thead>
              <tr>
                <th style={styles.carTableTh}>Circumstance</th>
                <th style={styles.carTableTh}>Action</th>
                <th style={styles.carTableTh}>Result</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                {["circumstance", "action", "result"].map((field) => (
                  <td key={field} style={styles.carTableTd}>
                    <textarea
                      rows={3}
                      value={formData.behavioralAnswers[idx].notes[field]}
                      onChange={(e) => updateBehavioralNote(idx, field, e.target.value)}
                      style={{
                        width: "100%",
                        height: "100px",
                        resize: "vertical",
                        borderRadius: 4,
                        border: "1px solid #aaa",
                      }}
                    />
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      ))}

      <label style={styles.inputLabel}>Strengths:</label>
      <textarea
        style={styles.textareaStyle}
        value={formData.strengths}
        onChange={(e) => updateField("strengths", e.target.value)}
      />

      <label style={styles.inputLabel}>Areas of Improvement:</label>
      <textarea
        style={styles.textareaStyle}
        value={formData.improvementAreas}
        onChange={(e) => updateField("improvementAreas", e.target.value)}
      />

      <label style={styles.inputLabel}>Overall Comments:</label>
      <textarea
        style={styles.textareaStyle}
        value={formData.overallComments}
        onChange={(e) => updateField("overallComments", e.target.value)}
      />

      <h3 style={{ ...styles.heading2, marginTop: 40 }}>Final Recommendation (To be updated by HR after discussion with Hiring Manager)</h3>
      <div
        style={{
          backgroundColor: "white",
          border: "1px solid #ccc",
          borderRadius: 10,
          padding: 16,
          marginBottom: 32,
          boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
        }}
      >
        {["Selected", "On Hold", "Rejected"].map((opt) => (
          <label key={opt} style={{ display: "block", marginBottom: 8, cursor: "pointer" }}>
            <input
              type="radio"
              name="finalRecommendation"
              value={opt}
              checked={formData.finalRecommendation === opt}
              onChange={(e) => updateField("finalRecommendation", e.target.value)}
              style={{ marginRight: 8 }}
            />
            {opt}
          </label>
        ))}
      </div>

      <label style={styles.inputLabel}>Overall Comments:</label>
      <textarea
        style={styles.textareaStyle}
        value={formData.overallComments}
        onChange={(e) => updateField("overallComments", e.target.value)}
      />

      <h3 style={{ ...styles.heading2, marginTop: 40 }}>Signatures</h3>
      <table style={styles.signatureTable}>
        <thead>
          <tr>
            <th style={styles.signatureTh}>Hiring Manager</th>
            <th style={styles.signatureTh}>Division HR</th>
            <th style={styles.signatureTh}>Reviewing Manager</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {/* Hiring Manager Signature */}
            <td style={styles.signatureBox}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", height: "100%" }}>
                {/* No name input for Hiring Manager as per current requirement */}
                <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", width: "100%" }}>
                  {signatures.hiringManager ? (
                    <label style={{ cursor: "pointer", height: "100%" }}>
                      {/* <img src={signatures.hiringManager} alt="Hiring Manager signature" style={styles.signatureImg} /> */}
                      {normalizeBase64(signatures.hiringManager) ? (
                        <img
                          src={normalizeBase64(signatures.hiringManager)}
                          alt="Hiring Manager signature"
                          style={styles.signatureImg}
                        />
                      ) : (
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleSignatureUpload("hiringManager", e)}
                          style={{ margin: '0 auto', display: 'block' }}
                        />
                      )}
                    </label>
                  ) : (
                    <>
                      {/* <span style={{ color: "#bbb", fontSize: 13, margin: "10px 0 4px 0" }}>No signature</span> */}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleSignatureUpload("hiringManager", e)}
                        style={{ margin: "0 auto", display: "block" }}
                      />
                    </>
                  )}
                </div>
              </div>
            </td>

            {/* Division HR Signature & Name */}
            <td style={styles.signatureBox}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", height: "100%" }}>
                <input
                  type="text"
                  placeholder="Division HR Name"
                  value={formData.divisionHRName || ""}
                  onChange={(e) => updateField("divisionHRName", e.target.value)}
                  style={{
                    marginTop: 6,
                    marginBottom: 2,
                    padding: "4px 6px",
                    fontSize: 13,
                    borderRadius: 4,
                    border: "1px solid #ccc",
                    width: "85%",
                    alignSelf: "center",
                    boxSizing: "border-box",
                    height: 26,
                    textAlign: "center",
                  }}
                />
                <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", width: "100%" }}>
                  {signatures.divisionHR ? (
                    <label style={{ cursor: "pointer", height: "100%" }}>
                      <img src={signatures.divisionHR} alt="Division HR signature" style={styles.signatureImg} />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleSignatureUpload("divisionHR", e)}
                        style={{ display: "none" }}
                      />
                    </label>
                  ) : (
                    <>
                      {/* <span style={{ color: "#bbb", fontSize: 13, margin: "10px 0 4px 0" }}>No signature</span> */}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleSignatureUpload("divisionHR", e)}
                        style={{ margin: "0 auto", display: "block" }}
                      />
                    </>
                  )}
                </div>
              </div>
            </td>

            {/* Reviewing Manager Signature & Name */}
            <td style={styles.signatureBox}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", height: "100%" }}>
                <input
                  type="text"
                  placeholder="Reviewing Manager Name"
                  value={formData.reviewingManagerName || ""}
                  onChange={(e) => updateField("reviewingManagerName", e.target.value)}
                  style={{
                    marginTop: 6,
                    marginBottom: 2,
                    padding: "4px 6px",
                    fontSize: 13,
                    borderRadius: 4,
                    border: "1px solid #ccc",
                    width: "85%",
                    alignSelf: "center",
                    boxSizing: "border-box",
                    height: 26,
                    textAlign: "center",
                  }}
                />
                <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", width: "100%" }}>
                  {signatures.reviewingManager ? (
                    <label style={{ cursor: "pointer", height: "100%" }}>
                      <img src={signatures.reviewingManager} alt="Reviewing Manager signature" style={styles.signatureImg} />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleSignatureUpload("reviewingManager", e)}
                        style={{ display: "none" }}
                      />
                    </label>
                  ) : (
                    <>
                      {/* <span style={{ color: "#bbb", fontSize: 13, margin: "10px 0 4px 0" }}>No signature</span> */}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleSignatureUpload("reviewingManager", e)}
                        style={{ margin: "0 auto", display: "block" }}
                      />
                    </>
                  )}
                </div>
              </div>
            </td>
          </tr>

        </tbody>
      </table>

      <div style={styles.btnGroup}>
      <button onClick={handleSubmitAndShare} style={{ ...styles.btn, backgroundColor: "#bd2331" }}>
        Submit & Share
      </button>
      <button
        onClick={() => window.print()}
        style={{
          marginTop: 20,
          backgroundColor: '#1e4489',
          color: '#fff',
          padding: '8px 16px',
          borderRadius: 6,
          cursor: 'pointer',
          fontSize: 16,
          border: 'none',
        }}
      >
        Download PDF
      </button>

      </div>
      <p style={{ textAlign: "center", marginTop: "30px", fontSize: "14px", color: "#666" }}>
        Powered by <strong>IS&amp;T</strong>
      </p>
    </div>
  );
}
