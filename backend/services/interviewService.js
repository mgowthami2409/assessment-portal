// In-memory storage (replace with DB later if needed)
const forms = {};

// Save or update form
async function saveInterviewForm(formData, signatures, interviewId) {
  const id = interviewId || Date.now().toString();
  forms[id] = { formData, signatures };
  return id;
}

// Fetch form by ID
async function getInterviewById(id) {
  return forms[id] || null;
}

module.exports = {
  saveInterviewForm,
  getInterviewById,
};
