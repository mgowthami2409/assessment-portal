import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { 
  submitInterviewForm, 
  getInterviewById, 
  uploadSignatureAttachment, 
  getSignatureUrl 
} from "../services/api";
import suprajitLogo from '../assets/suprajit_logo_BG.png';

const initialValuesData = [
  {
    id: "respect",
    title: "Value 1: Respect",
    questions: [
        "As a middle-level manager, how do you ensure that your team members feel respected and valued? Can you describe specific strategies or actions you've taken in previous roles?",
        "How do you approach situations where team members have different cultural backgrounds or perspectives that may impact mutual respect? Can you share an example?",
        "Describe a time when you had to address disrespectful behaviour or communication within your team. What steps did you take to address the issue?",
        "Can you share an example of how you've promoted a culture of respect and inclusivity in a previous role? What were the outcomes?",
        "How do you ensure that respect is maintained in your interactions with colleagues from other departments or stakeholders outside the organization?",
        "Describe a challenging stakeholder interaction where maintaining respect was critical. How did you approach the situation?"
    ],
  },
  {
    id: "transparency",
    title: "Value 2: Transparency",
    questions: [
        "How do you ensure that transparency is maintained during decision-making processes within your team or organization?",
        "What measures do you take to ensure that all team members have access to necessary information and are kept informed?",
        "How do you handle situations where stakeholders or team members request information that cannot be disclosed due to confidentiality or legal reasons?",
        "How have you promoted transparency within your team or department in previous roles? What strategies did you use?"
    ],
  },
  {
    id: "adaptability",
    title: "Value 3: Adaptability",
    questions: [
        "Can you give an example of a project where the scope or requirements shifted unexpectedly? How did you adjust your approach to meet the new demands?",
        "Describe a situation where you had to lead a team through a period of uncertainty or change. How did you support your team members and keep them motivated?",
        "Tell me about a time when you had to learn a new technology or skill quickly to achieve a project goal. How did you approach this learning process?",
        "Can you share an experience where you had to work with a difficult client or stakeholder? How did you adapt your communication style to build a productive relationship?",
        "Describe a project where you had to collaborate with a cross-functional team. How did you adapt your communication and work style to align with team members from different departments or backgrounds?",
        "Give an example of when you made a mistake or encountered failure in a project. How did you adapt and recover from this setback? What did you learn from the experience?"
    ],
  },
  {
    id: "collaboration",
    title: "Value 4: Collaboration",
    questions: [
        "Can you describe a project or initiative where you played a key role in leading a team? How did you approach building and maintaining collaboration among team members?",
        "Describe a situation where you had to resolve a conflict or disagreement among team members during a project. What approach did you take, and what was the outcome?",
        "How do you handle situations where team members have conflicting priorities or opinions on how to approach a project? Can you share a specific example and how you navigated the differences to achieve consensus?",
        "What strategies do you use to mentor or coach junior team members in effective collaboration practices? Can you share a specific instance where your guidance helped improve teamwork and productivity?",
        "Tell me about a time when you successfully collaborated across different departments or functions to achieve a common goal. What challenges did you face, and how did you overcome them?"
    ],
  },
  {
    id: "customer",
    title: "Value 5: Focus on Customer",
    questions: [
        "Tell me about a time when you identified a gap in customer service or satisfaction. What steps did you take to address it, and what was the outcome?",
        "Describe a situation where you had to handle a particularly challenging customer issue or complaint. How did you resolve it, and how did you ensure the customer remained satisfied?",
        "In your experience, what strategies have you found effective in building and maintaining strong relationships with key customers or clients?",
        "How do you gather and utilize customer feedback to improve products or services? Can you provide an example of a change you implemented based on customer input?",
        "Can you describe a time when you successfully managed a complex customer relationship? What strategies did you use to ensure their needs were met?",
        "Describe a situation where you had to negotiate with a customer to reach a mutually beneficial solution. What was your approach, and how did it impact the outcome?"
    ],
  },
  {
    id: "innovation",
    title: "Value 6: Innovation",
    questions: [
        "Can you describe a project or initiative where you played a key role in leading a team? How did you approach building and maintaining collaboration among team members?",
        "Describe a situation where you had to resolve a conflict or disagreement among team members during a project. What approach did you take, and what was the outcome?",
        "How do you handle situations where team members have conflicting priorities or opinions on how to approach a project? Can you share a specific example and how you navigated the differences to achieve consensus?",
        "What strategies do you use to mentor or coach junior team members in effective collaboration practices? Can you share a specific instance where your guidance helped improve teamwork and productivity?",
        "Tell me about a time when you successfully collaborated across different departments or functions to achieve a common goal. What challenges did you face, and how did you overcome them?"
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

export default function InterviewAssessmentForm() {
  const { id: interviewIdFromParams } = useParams();

  const [interviewId, setInterviewId] = useState(null);
  const currentInterviewId = interviewId || interviewIdFromParams;

  const [formData, setFormData] = useState({
    candidateName: "",
    competencies: Array(4).fill({ name: "", comments: "", rating: null }),
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

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const updateBehavioralNote = (idx, field, value) => {
    setFormData((prev) => {
      const copy = [...prev.behavioralAnswers];
      copy[idx].notes[field] = value;
      return { ...prev, behavioralAnswers: copy };
    });
  };

  const [signatures, setSignatures] = useState({
    hiringManager: null,
    reviewingManager: null,
    divisionHR: null,
  });

  const [signaturePreviews, setSignaturePreviews] = useState({
    hiringManager: null,
    reviewingManager: null,
    divisionHR: null,
  });

  // Function to handle signature selection
  const handleSignatureUpload = (role, e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file for the signature.");
      return;
    }

    setSignatures((prev) => ({ ...prev, [role]: file }));

    // Show preview
    const reader = new FileReader();
    reader.onload = (ev) => {
      setSignaturePreviews((prev) => ({ ...prev, [role]: ev.target.result }));
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (!currentInterviewId) return;

    getInterviewById(currentInterviewId)
      .then(async (res) => {
        if (!res.data.success) return alert("Interview data not found");
        const data = res.data.interview;

        setFormData({
          candidateName: data.candidateName || "",
          competencies: data.competencies || Array(4).fill({ name: "", comments: "", rating: null }),
          interviewDate: data.interviewDate || "",
          interviewerName: data.interviewerName || "",
          position: data.position || "",
          location: data.location || "",
          strengths: data.strengths || "",
          improvementAreas: data.improvementAreas || "",
          finalRecommendation: data.finalRecommendation || "",
          overallComments: data.overallComments || "",
          reviewingManagerName: data.reviewingManagerName || "",
          divisionHRName: data.divisionHRName || "",
          hiringManagerRecommendation: data.hiringManagerRecommendation || "",
          behavioralAnswers: data.behavioralAnswers?.length === 6 ? data.behavioralAnswers : initialValuesData.map(() => ({
            selectedQuestions: [],
            notes: { circumstance: "", action: "", result: "" },
          })),
        });

        // Fetch signature attachment URLs from backend per role
        const roles = ["hiringManager", "reviewingManager", "divisionHR"];
        const urls = {};
        for (const role of roles) {
          try {
            const sigRes = await getSignatureUrl(currentInterviewId, role);
            if (sigRes.success && sigRes.url) {
              urls[role] = sigRes.url;
            }
          } catch (err) {
            console.warn(`No signature found for ${role}`, err);
          }
        }
        setSignaturePreviews(urls);
      })
      .catch(err => {
        console.error(err);
        alert("Failed to fetch interview data.");
      });
  }, [currentInterviewId]);

  const handleSubmitAndShare = async () => {
    try {
      // Submit form data WITHOUT signatures (they upload separately)
      const formDataToSubmit = { ...formData };
      
      // Remove signature files from formData if present
      delete formDataToSubmit.hiringManager;
      delete formDataToSubmit.reviewingManager;
      delete formDataToSubmit.divisionHR;

      const response = await submitInterviewForm(formDataToSubmit, interviewId);

      if (!response.data.success) throw new Error("Form submission failed");

      const newId = response.data.interviewId;
      setInterviewId(newId);

      // Upload signatures separately if they exist
      for (const role of ["hiringManager", "reviewingManager", "divisionHR"]) {
        const file = signatures[role];
        if (file instanceof File) {
          try {
            await uploadSignatureAttachment(newId, file, role);
          } catch (err) {
            console.error(`Failed to upload ${role} signature`, err);
          }
        }
      }

      alert("Form saved successfully!");

      // Mail sharing logic...
      const link = `${window.location.origin}/interview/mid/${newId}`;
      const subject = encodeURIComponent("Interview Assessment Form");
      const body = encodeURIComponent(
        `Candidate Name: ${formData.candidateName}\nInterviewer: ${formData.interviewerName}\nPosition: ${formData.position}\nLocation: ${formData.location}\nDate: ${formData.interviewDate}\n\nLink to form: ${link}\n\nPlease review, update if required, and add your signature.`
      );
      window.location.href = `mailto:?subject=${subject}&body=${body}`;
    } catch (err) {
      console.error(err);
      alert("Error saving form");
    }
  };

  return (
    <div style={styles.container}>
      <img
        src={suprajitLogo}          // or use "/images/suprajit-logo.png" if in public folder
        alt="Suprajit Logo"
        style={{ height: 60, marginRight: 16 }}
      />
      <h2 style={styles.heading2}>Interview Assessment Form - Mid Level</h2>

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
        value={formData.strengthsHM}
        onChange={(e) => updateField("strengths", e.target.value)}
      />

      <label style={styles.inputLabel}>Areas of Improvement:</label>
      <textarea
        style={styles.textareaStyle}
        value={formData.improvementAreasHM}
        onChange={(e) => updateField("improvementAreas", e.target.value)}
      />

      <label style={styles.inputLabel}>Overall Comments:</label>
      <textarea
        style={styles.textareaStyle}
        value={formData.overallCommentsHM}
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

      <h3 style={{ ...styles.heading2, marginTop: 40 }}>Signatures</h3>
      <table style={styles.signatureTable}>
        <thead>
          <tr>
            <th style={styles.signatureTh}>Hiring Manager</th>
            <th style={styles.signatureTh}>Reviewing Manager</th>
            <th style={styles.signatureTh}>Division HR</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {/* 🔹 Hiring Manager Signature */}
            <td style={styles.signatureBox}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", height: "100%" }}>
                <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", width: "100%" }}>
                  {signaturePreviews.hiringManager ? (
                    <img
                      src={signaturePreviews.hiringManager}
                      alt="Hiring Manager Signature"
                      style={styles.signatureImg}
                    />
                  ) : (
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleSignatureUpload("hiringManager", e)}
                      style={{ margin: "0 auto", display: "block" }}
                    />
                  )}
                </div>
              </div>
            </td>

            {/* 🔹 Division HR Signature + Name */}
            <td style={styles.signatureBox}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", height: "100%" }}>
                <input
                  type="text"
                  placeholder="Division HR Name"
                  value={formData.divisionHRName || ""}
                  onChange={(e) => updateField("divisionHRName", e.target.value)}
                  style={{
                    marginTop: 6,
                    marginBottom: 4,
                    padding: "4px 6px",
                    fontSize: 13,
                    borderRadius: 4,
                    border: "1px solid #ccc",
                    width: "85%",
                    textAlign: "center",
                  }}
                />
                <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", width: "100%" }}>
                  {signaturePreviews.divisionHR ? (
                    <img
                      src={signaturePreviews.divisionHR}
                      alt="Division HR Signature"
                      style={styles.signatureImg}
                    />
                  ) : (
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleSignatureUpload("divisionHR", e)}
                      style={{ margin: "0 auto", display: "block" }}
                    />
                  )}
                </div>
              </div>
            </td>

            {/* 🔹 Reviewing Manager Signature + Name */}
            <td style={styles.signatureBox}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", height: "100%" }}>
                <input
                  type="text"
                  placeholder="Reviewing Manager Name"
                  value={formData.reviewingManagerName || ""}
                  onChange={(e) => updateField("reviewingManagerName", e.target.value)}
                  style={{
                    marginTop: 6,
                    marginBottom: 4,
                    padding: "4px 6px",
                    fontSize: 13,
                    borderRadius: 4,
                    border: "1px solid #ccc",
                    width: "85%",
                    textAlign: "center",
                  }}
                />
                <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", width: "100%" }}>
                  {signaturePreviews.reviewingManager ? (
                    <img
                      src={signaturePreviews.reviewingManager}
                      alt="Reviewing Manager Signature"
                      style={styles.signatureImg}
                    />
                  ) : (
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleSignatureUpload("reviewingManager", e)}
                      style={{ margin: "0 auto", display: "block" }}
                    />
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
