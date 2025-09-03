// src/lib/gemini.js
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
let genAI;
let isConfigured = false;

if (apiKey) {
  try {
    genAI = new GoogleGenerativeAI(apiKey);
    isConfigured = true;
  } catch (error) {
    console.error("Failed to initialize GoogleGenerativeAI:", error);
  }
} else {
  console.warn("Gemini API key not found. Please set VITE_GEMINI_API_KEY in your .env file.");
}

export const isGeminiConfigured = isConfigured;

/**
 * Gets a generative response from the Gemini model.
 * @param {string} prompt - The user's prompt.
 * @returns {Promise<string>} The model's response.
 */
export async function getGenerativeResponse(prompt) {
  if (!isGeminiConfigured) {
    return "The chatbot's AI features are not configured. Please contact the administrator.";
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text;
  } catch (error) {
    console.error("Error getting response from Gemini:", error);
    return "Sorry, I encountered an error while trying to get a response. Please try again later.";
  }
}
