import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BehavioralAssessmentForm from "./pages/BehavioralAssessmentForm";
import InterviewInstructions from "./pages/InterviewInstructions";
import InterviewEntry from "./pages/InterviewEntry";
import InterviewMid from "./pages/InterviewMid";
import InterviewSenior from "./pages/InterviewSenior.js";

export default function App() {
  return (
    <Router>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/behavioral-assessment" element={<BehavioralAssessmentForm />} />
        <Route path="/interview" element={<InterviewInstructions />} />
        <Route path="/interview/entry" element={<InterviewEntry />} />
        <Route path="/interview/mid" element={<InterviewMid />} />
        <Route path="/interview/senior" element={<InterviewSenior />} />
      </Routes>
    </Router>
  );
}
