import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { 
  submitInterviewForm, 
  getInterviewById, 
  uploadSignatureAttachment,
  // getSignatureUrl,
  getSignatureImageUrl 
} from "../services/api";
import suprajitLogo from '../assets/suprajit_logo_BG.png';

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

  const initialBehavioralAnswersHM = skillsList.map(skill => ({
    skillId: skill.id,
    rating: 0,
    comments: ""
  }));

  const initialBehavioralAnswers = skillsList.map(skill => ({
    skillId: skill.id,
    rating: 0,
    comments: ""
  }));

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
    behavioralAnswersHM: initialBehavioralAnswersHM,
    behavioralAnswers: initialBehavioralAnswers,
    strengthsHM: "",
    improvementAreasHM: "",
    overallCommentsHM: "",
  });

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
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

    getInterviewById(currentInterviewId).then(async (res) => {
      if (!res.data.success) return alert("Interview data not found");
      const data = res.data.interview;

      // Initialize formData with all fields, provide defaults to avoid missing keys
      setFormData({
        candidateName: data.candidateName || "",
        competencies: Array.isArray(data.competencies) && data.competencies.length > 0
          ? data.competencies
          : Array(4).fill({ name: "", comments: "", rating: null }),
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
        strengthsHM: data.strengthsHM || "",
        improvementAreasHM: data.improvementAreasHM || "",
        overallCommentsHM: data.overallCommentsHM || "",
        behavioralAnswers: Array.isArray(data.behavioralAnswers) && data.behavioralAnswers.length === skillsList.length
          ? data.behavioralAnswers : initialBehavioralAnswers,
        behavioralAnswersHM: Array.isArray(data.behavioralAnswersHM) && data.behavioralAnswersHM.length === skillsList.length
          ? data.behavioralAnswersHM : initialBehavioralAnswersHM,
      });

      // Load signature previews for each role
      const roles = ["hiringManager", "reviewingManager", "divisionHR"];
      const urls = {};
      for (const role of roles) {
        try {
          urls[role] = await getSignatureImageUrl(currentInterviewId, role);
        } catch (err) {
          console.warn(`No signature found for ${role}`, err);
        }
      }
      setSignaturePreviews(urls);
    }).catch((err) => {
      console.error(err);
      alert("Failed to fetch interview data.");
    });
  }, [currentInterviewId]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitAndShare = async () => {
    setIsSubmitting(true);
    try {
      // Your existing submit logic here
      const formDataToSubmit = { ...formData };
      delete formDataToSubmit.hiringManager;
      delete formDataToSubmit.reviewingManager;
      delete formDataToSubmit.divisionHR;

      if (currentInterviewId) {
        formDataToSubmit.interviewId = currentInterviewId;
      }
      const response = await submitInterviewForm(formDataToSubmit, currentInterviewId);

      if (!response.data.success) throw new Error("Form submission failed");

      const newId = response.data.interviewId;
      setInterviewId(newId);

      // Upload signatures separately if exist
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

      const link = `${window.location.origin}/interview/senior/${newId}`;
      const subject = encodeURIComponent("Interview Assessment Form");
      const body = encodeURIComponent(
        `Candidate Name: ${formData.candidateName}\nInterviewer: ${formData.interviewerName}\nPosition: ${formData.position}\nLocation: ${formData.location}\nDate: ${formData.interviewDate}\n\nLink to form: ${link}\n\nPlease review, update if required, and add your signature.`
      );
      window.location.href = `mailto:?subject=${subject}&body=${body}`;
    } catch (err) {
      console.error(err);
      alert("Error saving form");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={styles.container}>
      <img
        src={suprajitLogo}          // or use "/images/suprajit-logo.png" if in public folder
        alt="Suprajit Logo"
        style={{ height: 60, marginRight: 16 }}
      />
      <h2 style={styles.heading2}>Interview Assessment Form - Senior Level</h2>

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

      <h3 style={{ ...styles.heading2, marginTop: 32 }}>
        Behavioral Interview Questions (To be updated by the Hiring Manager)
      </h3>

      {skillsList.map((skill, idx) => (
        <section
          key={skill.id}
          style={{
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
            {skill.bullets.map((point, pidx) => (
              <li key={pidx}>{point}</li>
            ))}
          </ul>

          <label>Rating (1-5): </label>
          <select
            name={`behavioralHM_skill${skill.id}`}
            value={formData.behavioralAnswersHM[idx]?.rating || 0}
            required
            onChange={e => {
              const updated = [...formData.behavioralAnswersHM];
              updated[idx] = {
                ...updated[idx],
                rating: Number(e.target.value)
              };
              setFormData(f => ({ ...f, behavioralAnswersHM: updated }));
            }}
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
            name={`behavioralHM_skill${skill.id}_comments`}
            value={formData.behavioralAnswersHM[idx]?.comments || ""}
            onChange={e => {
              const updated = [...formData.behavioralAnswersHM];
              updated[idx] = {
                ...updated[idx],
                comments: e.target.value
              };
              setFormData(f => ({ ...f, behavioralAnswersHM: updated }));
            }}
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

      <label style={styles.inputLabel}>Strengths:</label>
      <textarea
        style={styles.textareaStyle}
        value={formData.strengthsHM}
        onChange={(e) => updateField("strengthsHM", e.target.value)}
      />

      <label style={styles.inputLabel}>Areas of Improvement:</label>
      <textarea
        style={styles.textareaStyle}
        value={formData.improvementAreasHM}
        onChange={(e) => updateField("improvementAreasHM", e.target.value)}
      />

      <label style={styles.inputLabel}>Overall Comments:</label>
      <textarea
        style={styles.textareaStyle}
        value={formData.overallCommentsHM}
        onChange={(e) => updateField("overallCommentsHM", e.target.value)}
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

      {/* Skills Sections */}
        {skillsList.map((skill,idx) => (
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
              name={`behavioral_skill${skill.id}`}
              value={formData.behavioralAnswers[idx]?.rating || 0}
              required
              onChange={e => {
                const updated = [...formData.behavioralAnswers];
                updated[idx] = {
                  ...updated[idx],
                  rating: Number(e.target.value)
                };
                setFormData(f => ({ ...f, behavioralAnswers: updated }));
              }}
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
              name={`behavioral_skill${skill.id}_comments`}
              value={formData.behavioralAnswers[idx]?.comments || ""}
              onChange={e => {
              const updated = [...formData.behavioralAnswers];
              updated[idx] = {
                ...updated[idx],
                comments: e.target.value
              };
              setFormData(f => ({ ...f, behavioralAnswers: updated }));
            }}
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
      <button onClick={handleSubmitAndShare} style={{ ...styles.btn, backgroundColor: "#bd2331" }} disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit & Share"}
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
