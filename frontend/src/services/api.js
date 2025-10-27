import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL || "https://suprajit-portal.onrender.com/api";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Submit interview form data (without files)
export function submitInterviewForm(formData, interviewId) {
  const { hiringManager, reviewingManager, divisionHR, ...formFields } = formData;
  const signatures = { hiringManager, reviewingManager, divisionHR }; // placeholders if any
  if (interviewId) {
    formFields.interviewId = interviewId;
  }

  return API.post("/interview/submit", {
    formData: formFields,
    signatures, // keep as placeholders, actual files uploaded separately
    interviewId,
  });
}

// Upload a signature file for a given interview and role
export const uploadSignatureAttachment = async (interviewId, file, role) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("role", role);

    const response = await axios.post(
      `${BASE_URL}/interview/${interviewId}/signature`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error uploading signature:", error);
    throw error;
  }
};


// Fetch interview form by ID
export function getInterviewById(interviewId) {
  return API.get(`/interview/${interviewId}`);
}


export async function getSignatureImageUrl(rowId, role) {
  const response = await API.get(`/interview/${rowId}/signature/${role}/image`, { responseType: "blob" });
  return URL.createObjectURL(response.data);
}

export default API;