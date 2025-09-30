const { saveInterviewForm, getInterviewById } = require("../services/interviewService");
const config = require("../config");

async function submitInterviewForm(req, res) {
  try {
    // Expected body: { formData: {...}, signatures: {...}, interviewId: string|null, role?: string }
    const bodyFormData = req.body.formData || {};
    const signatures = req.body.signatures || {};
    const interviewId = req.body.interviewId || null;
    const role = req.body.role;

    // Basic env validation so caller gets a helpful error instead of a low-level Smartsheet exception
    if (!config.SMARTSHEET_API_TOKEN || !config.SMARTSHEET_INTERVIEW_SHEET_ID) {
      const msg = 'Smartsheet configuration missing. Set SMARTSHEET_API_TOKEN and SMARTSHEET_INTERVIEW_SHEET_ID in backend .env';
      console.error(msg);
      return res.status(500).json({ success: false, error: msg });
    }

    // Merge interviewId (if provided at top-level) into formData so service can decide add vs update
    if (signatures.hiringManager) bodyFormData.hiringManager = signatures.hiringManager;
    if (signatures.reviewingManager) bodyFormData.reviewingManager = signatures.reviewingManager;
    if (signatures.divisionHR) bodyFormData.divisionHR = signatures.divisionHR;

    // Merge signatures into formData under the keys expected by the Smartsheet service
    // if (signatures.hiringManager) bodyFormData.hiringManager = signatures.hiringManager;
    // if (signatures.reviewingManager) bodyFormData.reviewingManager = signatures.reviewingManager;
    // if (signatures.divisionHR) bodyFormData.divisionHR = signatures.divisionHR;

    const result = await saveInterviewForm(bodyFormData, role);
    res.status(200).json({ success: true, interviewId: result });
  } catch (err) {
    console.error("Error submitting interview form:", err);
    res.status(500).json({ success: false, error: err.message });
  }
}

async function fetchInterviewById(req, res) {
  try {
    const interview = await getInterviewById(req.params.id);
    if (!interview) {
      return res.status(404).json({ success: false, message: "Interview not found" });
    }
    res.status(200).json({ success: true, interview });
  } catch (err) {
    console.error("Error fetching interview:", err);
    // If Smartsheet config missing, return helpful message and optionally a dev mock
    const msg = err && err.message ? err.message : 'Unknown error fetching interview';
    if ((!config.SMARTSHEET_API_TOKEN || !config.SMARTSHEET_INTERVIEW_SHEET_ID) && process.env.NODE_ENV === 'development') {
      // Development mock to let frontend load while Smartsheet isn't configured
      const mock = {
        interviewId: req.params.id || 'dev-123',
        candidateName: 'Dev Candidate',
        interviewerName: 'Hiring Manager',
        interviewDate: new Date().toISOString().slice(0,10),
        position: 'Test Position',
        location: 'DEV',
        strengths: 'Mock strengths',
        improvementAreas: 'Mock improvements',
        finalRecommendation: 'On Hold',
        overallComments: 'This is a development mock response',
        reviewingManagerName: '',
        divisionHRName: '',
        hiringManager: null,
        reviewingManager: null,
        divisionHR: null,
        competencyNames: ["", "", "", "", ""],
        behavioralAnswers: Array(6).fill().map(() => ({ selectedQuestions: [], notes: { circumstance: '', action: '', result: '' } })),
      };
      return res.status(200).json({ success: true, interview: mock, note: 'development-mock' });
    }
    res.status(500).json({ success: false, error: msg });
  }
}

async function shareInterview(req, res) {
  try {
    // Expected body: { interviewId, toEmail }
    const { interviewId, toEmail } = req.body;
    if (!interviewId || !toEmail) return res.status(400).json({ success: false, error: 'interviewId and toEmail required' });

    // Build link to form
    const link = `${req.protocol}://${req.get('host')}/interview/${interviewId}`;
    const subject = 'Interview Assessment Form';
    const bodyLines = [
      `Please review the interview assessment: ${link}`,
      '',
      'Open the link, review, update if required, and add your signature.'
    ];
    const body = bodyLines.join('\n');

    // If SMTP configured, send email
    const nodemailer = require('nodemailer');
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (smtpHost && smtpPort && smtpUser && smtpPass) {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: Number(smtpPort),
        secure: Number(smtpPort) === 465,
        auth: { user: smtpUser, pass: smtpPass },
      });
      const info = await transporter.sendMail({
        from: smtpUser,
        to: toEmail,
        subject,
        text: body,
      });
      return res.status(200).json({ success: true, provider: 'smtp', info });
    }

    // Fallback: return mailto link for frontend to open
    const mailto = `mailto:${encodeURIComponent(toEmail)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    return res.status(200).json({ success: true, provider: 'mailto', mailto });
  } catch (err) {
    console.error('Error sharing interview:', err);
    res.status(500).json({ success: false, error: err.message });
  }
}

module.exports = { submitInterviewForm, fetchInterviewById, shareInterview };