const pdfParse = require('pdf-parse');
const { callGemini } = require('../AI_Agent/geminiHelper');

async function extractTextFromPdfBuffer(buffer) {
  return (await pdfParse(buffer)).text;
}

async function getMatchScore(resumeText, jdText) {
  const prompt = `Given the following resume and job description, provide only a matching score from 0 to 100. Just reply with the number.
    Resume: ${resumeText}
    Job Description: ${jdText}`;

  const result = await callGemini(prompt);

  // Extract only number (optional safety)
  const score = parseInt(result.match(/\d+/)?.[0]) || 0;

  return score;
}

module.exports = {
  extractTextFromPdfBuffer,
  getMatchScore
};