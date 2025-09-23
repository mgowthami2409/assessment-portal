import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "http://localhost:9090/api", // Use env var if available
  headers: {
    "Content-Type": "application/json",
  },
});

export function submitInterviewForm(data, interviewId) {
  const formDataPayload = new FormData();

  formDataPayload.append("formData", JSON.stringify(data.formData || {}));
  formDataPayload.append("signatures", JSON.stringify(data.signatures || {}));
  if (interviewId) formDataPayload.append("interviewId", interviewId);

  return API.post("/interview/submit", formDataPayload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export default API;
