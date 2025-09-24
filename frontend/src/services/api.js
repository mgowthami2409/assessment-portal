import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "http://localhost:9090/api",
  headers: { "Content-Type": "application/json" },
});

// Save form (new or update)
export function submitInterviewForm(formData, interviewId) {
  return API.post("/interview/submit", {
    formData,
    signatures: formData.signatures || {},
    interviewId,
  });
}

// Fetch form by ID
export function getInterviewFormById(interviewId) {
  return API.get(`/interview/${interviewId}`);
}

export default API;
