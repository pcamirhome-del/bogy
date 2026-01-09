
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";

const getApiKey = () => {
  // Safely access process.env which is now shimmed in index.html
  try {
    return (window as any).process?.env?.API_KEY || "";
  } catch {
    return "";
  }
};

const getAIClient = () => {
  const apiKey = getApiKey();
  if (!apiKey) {
    console.warn("NexusFlow: API_KEY not detected in process.env");
  }
  return new GoogleGenAI({ apiKey });
};

export const chatWithKnowledgeBase = async (message: string, history: any[]) => {
  try {
    const ai = getAIClient();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview', // Using latest Gemini 3 Flash
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
    const ai = getAIClient();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview', // Maps grounding is robust in Gemini 3 series
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
  const key = getApiKey();
  return key && key.length > 10; // Basic validity check
};
