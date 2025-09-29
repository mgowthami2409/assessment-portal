import React, { useState, useEffect } from "react"; // Replace current import by this
import { useParams } from "react-router-dom";        // Add this import
import { submitInterviewForm, getInterviewById } from "../services/api";  // Import both API functions
import suprajitLogo from '../assets/suprajit_logo_BG.png';

const initialValuesData = [
  {
    id: "respect",
    title: "Value 1: Respect",
    questions: [
        "As a Senior Manager, how do you define respect within the organizational context? How do you ensure this definition is understood and practiced throughout your team?",
        "Can you give an example of how you have fostered a culture of respect in a previous leadership role? What were the challenges, and how did you overcome them?",
        "How do you integrate respect for diversity and inclusion into your team's goals and strategies?",
        "Describe a time when you had to address a serious conflict or issue related to respect within your team or department. How did you approach the situation, and what was the outcome?",
        "How do you handle situations where team members or colleagues demonstrate disrespectful behaviour towards each other? Can you share a specific example and how you addressed it?",
        "As a Senior Manager, how would you ensure that respect is not just a superficial value but embedded into the fabric of the organization's culture and operations?",
        "What strategies do you use to ensure that respect for different perspectives and opinions is valued and encouraged in decision-making processes within your team or department?"
    ],
  },
  {
    id: "transparency",
    title: "Value 2: Transparency",
    questions: [
        "Can you provide an example from your experience where transparency positively impacted your team or organization?",
        "How do you build trust through transparency with your team members and stakeholders?",
        "What steps do you take when faced with sensitive information that needs to be shared transparently but could potentially create concern or unrest?",
        "Can you describe a situation where you faced challenges related to transparency? How did you handle it?",
        "How do you ensure transparent communication within your team or organization?"
    ],
  },
  {
    id: "adaptability",
    title: "Value 3: Adaptability",
    questions: [
        "Tell me about a time when you had to lead your team or organization through a significant change. How did you ensure buy-in and commitment from your team?",
        "Describe a situation where you encountered resistance to a change initiative you were leading. How did you handle this resistance and adapt your approach to ensure successful implementation?",
        "Can you share an experience where you had to lead a diverse team with members from different backgrounds or cultures? How did you adapt your leadership style to foster inclusivity and cohesion within the team?",
        "Describe a situation where you had to change course on a project or initiative because initial assumptions or conditions changed. How did you communicate this change and rally your team to adjust their efforts?",
        "Tell me about a time when you had to manage conflicting demands or priorities from different departments or senior leaders. How did you prioritize and navigate these challenges?",
        "Give an example of when you had to make a decision with incomplete information or in a high-pressure situation. How did you adapt your decision-making process?"
    ],
  },
  {
    id: "collaboration",
    title: "Value 4: Collaboration",
    questions: [
        "How do you establish and maintain a collaborative culture within your organization or team? What strategies do you employ to encourage open communication and teamwork?",
        "Give an example of a time when you had to mediate a conflict between team members or departments. What steps did you take to resolve the conflict, and what was the outcome?",
        "Describe a situation where you had to make tough decisions that impacted collaboration within your organization. How did you navigate the complexities and ensure alignment with organizational goals?",
        "Describe a time when you had to lead a cross-functional team towards a common objective. What strategies did you use to align different perspectives and priorities, and what were the outcomes of your leadership?",
        "As a leader, how do you ensure that all team members feel valued and respected in collaborative efforts? Can you provide an example of how you promote inclusivity and diversity in team collaborations?",
        "Can you describe a significant project or initiative where you successfully promoted collaboration across multiple teams or departments? What was your approach, and how did you ensure alignment towards common goals?"
    ],
  },
  {
    id: "customer",
    title: "Value 5: Focus on Customer",
    questions: [
        "How do you foster a customer-centric culture within your team or organization?",
        "Can you discuss a specific instance where you implemented a new process or initiative that resulted in measurable improvements in customer satisfaction or loyalty?",
        "Can you share a situation where you had to pivot your customer strategy in response to feedback or market trends?",
        "What steps do you take to stay ahead of industry trends and anticipate changes in customer expectations?",
        "Can you describe a time when you developed a customer-centric strategy that significantly impacted your organization’s growth or success?",
        "How do you foster a customer-centric culture within your team or organization?",
        "Can you describe a time when you developed a customer-centric strategy that significantly impacted your organization’s growth or success?"
    ],
  },
  {
    id: "innovation",
    title: "Value 6: Innovation",
    questions: [
        "How do you create an environment where innovation thrives within your team?",
        "Can you share an example of how you challenged the status quo to drive a breakthrough idea?",
        "Describe a time when an innovative idea failed. What did you learn, and how did you handle it with your team?",
        "Can you share an example where customer feedback directly influenced an innovative solution?",
        "What steps do you take to ensure every team member feels empowered to contribute innovative ideas?"
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
  },
  btn: {
    padding: "12px 24px",
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
    backgroundColor: "#3afabe0",
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
  const { id } = useParams();  // GET INTERVIEW ID FROM URL
  // const printRef = useRef();
  const [formData, setFormData] = useState({
    candidateName: "",
    competencyNames: ["", "", "", "", ""], // 5 empty values for 5 rows
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
              competencyNames: data.competencyNames || ["", "", "", "", ""],
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

  const toggleBehavioralQuestion = (valueIndex, questionIndex) => {
    setFormData((f) => {
      const answersCopy = f.behavioralAnswers.slice();
      const selectedQs = answersCopy[valueIndex].selectedQuestions.slice();
      const idx = selectedQs.indexOf(questionIndex);
      if (idx > -1) selectedQs.splice(idx, 1);
      else selectedQs.push(questionIndex);
      answersCopy[valueIndex].selectedQuestions = selectedQs;
      return { ...f, behavioralAnswers: answersCopy };
    });
  };

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

      // Ask approver for email
      const email = prompt("Enter email address to share with:");
      if (!email) return alert("Email is required");

      // Build the link and safely encode all fields for mailto
      const link = `${window.location.origin}/interview/senior/${response.data.interviewId}`;
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

      // Open user email client with prefilled info
      window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    } else {
      alert("Failed to save form");
    }
  } catch (err) {
    console.error(err);
    alert("Error occurred while saving form");
  }
};

  // const handleDownloadPdf = () => {
  //   const input = printRef.current;
  //   html2canvas(input).then(canvas => {
  //     const imgData = canvas.toDataURL('image/png');
  //     const pdf = new jsPDF('p', 'pt', 'a4');
  //     const pdfWidth = pdf.internal.pageSize.getWidth();
  //     const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

  //     pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
  //     pdf.save('Interview_Assessment.pdf');
  //   });
  // };

  // const [interviewId, setInterviewId] = useState(null); // store interview form ID if saved

  // const handleSubmit = async () => {
  //   try {
  //     const payload = {
  //       formData,
  //       signatures,
  //     };
  //     const response = await submitInterviewForm(payload, interviewId);
  //     if (response.data.success) {
  //       alert("Form submitted successfully!");
  //       if (!interviewId) setInterviewId(response.data.interviewId);
  //     } else {
  //       alert("Failed to submit form.");
  //     }
  //   } catch (err) {
  //     alert("Error submitting form.");
  //     console.error(err);
  //   }
  // };

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
            {[4, 3, 2, 1].map(score => (
              <th key={score} style={styles.thStyle}>{score}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[0, 1, 2, 3].map((idx) => (
            <tr key={idx}>
              <td style={styles.tdStyle}>
                <input
                  type="text"
                  value={formData.competencyNames[idx]}
                  onChange={(e) => {
                    const names = [...formData.competencyNames];
                    names[idx] = e.target.value;
                    setFormData((prev) => ({ ...prev, competencyNames: names }));
                  }}
                  placeholder={`Enter Competency ${idx + 1} Name`}
                  style={{
                    width: "90%",
                    padding: "8px",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                  }}
                />
              </td>
              <td style={styles.tdStyle}>
                <textarea style={styles.textareaStyle} rows={3} />
              </td>
              {[4, 3, 2, 1].map((val) => (
                <td key={val} style={{ ...styles.tdStyle, textAlign: "center" }}>
                  <input type="radio" name={`comp${idx + 1}`} value={val} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

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
          {value.questions.map((q, qi) => (
            <label
              key={qi}
              style={{
                display: "flex",
                alignItems: "flex-start",
                marginBottom: 8,
                cursor: "pointer",
                color: "#333",
                fontWeight: 400,
              }}
            >
              <input
                type="checkbox"
                checked={
                  formData.behavioralAnswers &&
                  formData.behavioralAnswers[idx] &&
                  Array.isArray(formData.behavioralAnswers[idx].selectedQuestions) &&
                  formData.behavioralAnswers[idx].selectedQuestions.includes(qi)
                    ? true
                    : false
                }
                onChange={() => toggleBehavioralQuestion(idx, qi)}
                style={{ marginRight: 8, marginTop: 6 }}
              />
              <div style={{ lineHeight: 1.4 }}>{q}</div>
            </label>
          ))}
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

      {/* <label style={styles.inputLabel}>Strengths:</label>
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
      /> */}

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
            <th style={styles.signatureTh}>Reviewing Manager</th>
            <th style={styles.signatureTh}>Division HR</th>
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
                      <img src={signatures.hiringManager} alt="Hiring Manager signature" style={styles.signatureImg} />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleSignatureUpload("hiringManager", e)}
                        style={{ display: "none" }}
                      />
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
          backgroundColor: '#bd2331',
          color: '#fff',
          padding: '12px 24px',
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
