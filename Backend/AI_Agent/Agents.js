const pdfParse = require('pdf-parse');
const { callGemini } = require('../AI_Agent/geminiHelper');

async function extractTextFromPdfBuffer(buffer) {
  return (await pdfParse(buffer)).text;
}

async function getMatchScore(resumeText, jdText) {
  const prompt = `You are a resume-JD matching system. Analyze the resume against the job description and return ONLY a numerical score between 0-100.

Scoring criteria:
- Skills match (40 points): Technical and soft skills alignment
- Experience relevance (30 points): Years and domain experience match
- Education requirements (15 points): Degree and certifications
- Job responsibilities (15 points): Past work aligns with JD duties

Resume:
${resumeText}

Job Description:
${jdText}

Return ONLY the final score as a number (0-100). No explanation, no text, just the number.`;

const result = await callGemini(prompt);

// Extract only number (optional safety)
const score = parseInt(result.match(/\d+/)?.[0]) || 0;

  return score;
}

module.exports = {
  extractTextFromPdfBuffer,
  getMatchScore
};