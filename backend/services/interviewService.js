// In-memory storage (replace with DB later if needed)
const forms = {};

// Save or update form
async function saveInterviewForm(formData, signatures, interviewId) {
  const id = interviewId || Date.now().toString();
  // Merge formData and signatures into one object for storage
  forms[id] = { ...formData, ...signatures, id };
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
