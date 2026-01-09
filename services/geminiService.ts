
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";

// Strictly adhering to Google GenAI SDK guidelines.
// "Assume process.env.API_KEY is pre-configured, valid, and accessible."

export const chatWithKnowledgeBase = async (message: string, history: any[]) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: message,
      config: {
        systemInstruction: "You are the NexusFlow AI Marketing Assistant. Help the user with marketing automation and sales strategy.",
        tools: [{ googleSearch: {} }]
      }
    });

    return {
      text: response.text || "I couldn't generate a response. Please check your connection.",
      sources: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
    };
  } catch (error: any) {
    console.error("NexusFlow AI Error:", error);
    throw new Error(error.message || "Connection to Gemini failed.");
  }
};

export const findLeadsWithMaps = async (query: string, lat?: number, lng?: number) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Search for business leads: ${query}`,
      config: {
        tools: [{ googleMaps: {} }],
        toolConfig: {
          retrievalConfig: lat && lng ? {
            latLng: { latitude: lat, longitude: lng }
          } : undefined
        }
      }
    });

    return {
      text: response.text || "No specific business data returned.",
      links: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
    };
  } catch (error: any) {
    console.error("NexusFlow Maps Error:", error);
    throw new Error(error.message || "Maps extraction failed.");
  }
};

export const checkAPIStatus = () => {
  try {
    // Check if the variable exists in the environment
    return typeof process !== 'undefined' && !!process.env.API_KEY;
  } catch {
    return false;
  }
};
