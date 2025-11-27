import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BehavioralAssessmentForm from "./pages/BehavioralAssessmentForm";
import InterviewInstructions from "./pages/InterviewInstructions";
import InterviewEntry from "./pages/InterviewEntry";
import InterviewMid from "./pages/InterviewMid";
import InterviewSenior from "./pages/InterviewSenior";
import JobDescriptionForm from "./pages/JobDescriptionForm";
import ReferenceCheckForm from "./pages/ReferenceCheckForm";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/behavioral-assessment" element={<BehavioralAssessmentForm />} />
        <Route path="/interview" element={<InterviewInstructions />} />
        {/* Level-specific dynamic routing */}
        <Route path="/interview/entry/:id" element={<InterviewEntry />} />
        <Route path="/interview/mid/:id" element={<InterviewMid />} />
        <Route path="/interview/senior/:id" element={<InterviewSenior />} />
        {/* Optional: "new" creation routes if required */}
        <Route path="/interview/entry" element={<InterviewEntry />} />
        <Route path="/interview/mid" element={<InterviewMid />} />
        <Route path="/interview/senior" element={<InterviewSenior />} />
        <Route path="/job-description" element={<JobDescriptionForm />} />
        <Route path="/reference-check" element={<ReferenceCheckForm />} />
      </Routes>
    </Router>
  );
}
