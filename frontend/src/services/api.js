import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "http://localhost:9090/api",
  headers: { "Content-Type": "application/json" },
});

// Save form (new or update)
export function submitInterviewForm(formData, interviewId) {
  // Separate signatures out of formData and send explicitly
  const { hiringManager, reviewingManager, divisionHR, ...formFields } = formData;
  const signatures = {
    hiringManager: hiringManager || null,
    reviewingManager: reviewingManager || null,
    divisionHR: divisionHR || null,
  };

  return API.post("/interview/submit", {
    formData: formFields,
    signatures,
    interviewId,
  });
}

// Fetch form by ID
export function getInterviewById(interviewId) {
  return API.get(`/interview/${interviewId}`);
}

export default API;
