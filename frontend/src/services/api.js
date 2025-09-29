import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "https://suprajit-portal.onrender.com/api",
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

export default API;
