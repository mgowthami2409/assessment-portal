import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:9090/api";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "http://localhost:9090/api",
  headers: { "Content-Type": "application/json" },
});

// Fetch by ID
export function getInterviewById(interviewId) {
  return API.get(`/interview/${interviewId}`);
  // navigate(`/interview/${level}/${interviewId}`);

}

export function getSignatureUrl(interviewId, role) {
  return API.get(`/interview/${interviewId}/${role}/`)
    .then(res => res.data);
}

export function submitInterviewForm(formData, interviewId) {
  const { hiringManager, reviewingManager, divisionHR, ...formFields } = formData;
  const signatures = { hiringManager, reviewingManager, divisionHR };

  return API.post("/interview/submit", {
    formData: formFields,
    signatures,  // these are just placeholders, not files
    interviewId,
  });
}

export const uploadSignatureAttachment = async (interviewId, file, role) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("role", role);
    const response = await axios.post(
      `${BASE_URL}/interview/${interviewId}/upload-signature`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    return response;
  } catch (error) {
    console.error("Error uploading signature:", error);
    throw error;
  }
};
export default API;