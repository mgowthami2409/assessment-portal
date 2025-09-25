import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "http://localhost:9090/api",
  headers: { "Content-Type": "application/json" },
});

// Save form (new or update)
export function submitInterviewForm(formData, interviewId) {
  // Ensure interviewId and signatures are available inside formData for backend compatibility
  const payloadFormData = { ...formData };
  if (interviewId) payloadFormData.interviewId = interviewId;

  // Normalise signatures if present at top-level
  if (formData.hiringManager) payloadFormData.hiringManager = formData.hiringManager;
  if (formData.reviewingManager) payloadFormData.reviewingManager = formData.reviewingManager;
  if (formData.divisionHR) payloadFormData.divisionHR = formData.divisionHR;

  // Also send signatures as a convenience top-level object (existing backend supports this)
  const signatures = {
    hiringManager: payloadFormData.hiringManager || null,
    reviewingManager: payloadFormData.reviewingManager || null,
    divisionHR: payloadFormData.divisionHR || null,
  };

  return API.post("/interview/submit", {
    formData: payloadFormData,
    signatures,
    interviewId,
  });
}

// Fetch form by ID
export function getInterviewById(interviewId) {
  return API.get(`/interview/${interviewId}`);
}

export function shareInterview(interviewId, toEmail) {
  return API.post('/interview/share', { interviewId, toEmail });
}

export default API;
