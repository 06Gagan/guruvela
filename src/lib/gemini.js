// src/lib/gemini.js
import { GoogleGenerativeAI } from "@google/generative-ai";
import { GEMINI_MAX_OUTPUT_TOKENS } from "../config/constants";

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
 * @param {string} language - The language for the response.
 * @returns {Promise<string>} The model's response.
 */
export async function getGenerativeResponse(prompt, language = 'en') {
  if (!isGeminiConfigured) {
    return "The chatbot's AI features are not configured. Please contact the administrator.";
  }

  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-pro",
      generationConfig: {
        maxOutputTokens: GEMINI_MAX_OUTPUT_TOKENS,
      },
    });

    const languageMap = {
      'en': 'English',
      'hi-en': 'Hinglish (Hindi in Latin script)',
      'te-en': 'Tenglish (Telugu in Latin script)'
    };
    const targetLanguage = languageMap[language] || 'English';

    const fullPrompt = `You are a helpful assistant for a college counseling website called Guruvela. Answer the following user query concisely (in about 2-3 sentences) in ${targetLanguage}. Do not use Markdown. User query: "${prompt}"`;

    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const text = response.text();
    return text;
  } catch (error) {
    console.error("Error getting response from Gemini:", error);
    return "Sorry, I encountered an error while trying to get a response. Please try again later.";
  }
}
