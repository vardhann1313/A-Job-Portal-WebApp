const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent`;

async function callGemini(prompt) {
  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${process.env.OPEN_AI_KEY}`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Gemini API Error:", data);
      throw new Error(data.error?.message || "Failed to fetch from Gemini API");
    }

    const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    return aiText;

  } catch (error) {
    console.error("Error in callGemini:", error.message);
    throw error;
  }
}

module.exports = { callGemini };