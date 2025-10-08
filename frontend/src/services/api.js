import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "http://localhost:9090/api",
  headers: { "Content-Type": "application/json" },
});

// Save form (new or update)
export function submitInterviewForm(formData, interviewId) {
  const { hiringManager, reviewingManager, divisionHR, ...formFields } = formData;
  const signatures = { hiringManager, reviewingManager, divisionHR };

  return API.post("/interview/submit", {
    formData: formFields,
    signatures,
    interviewId,
  });
}

// Fetch by ID
export function getInterviewById(interviewId) {
  return API.get(`/interview/${interviewId}`);
  // navigate(`/interview/${level}/${interviewId}`);

}

export function getSignatureUrl(interviewId, role) {
  return API.get(`/interview/${interviewId}/signature/${role}`)
    .then(res => res.data);
}
export function uploadSignatureAttachment(interviewId, file, role) {
  const form = new FormData();
  form.append("file", file);
  form.append("role", role);
  return API.post(`/interview/${interviewId}/signatureAttachment`, form, {
    headers: { "Content-Type": "multipart/form-data" }
  });
}

export default API;
