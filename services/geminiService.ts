
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";

const getAIClient = () => {
  return new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
};

export const chatWithKnowledgeBase = async (message: string, history: { role: 'user' | 'model', parts: { text: string }[] }[]) => {
  const ai = getAIClient();
  const chat = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: "You are the NexusFlow AI Marketing Assistant. Your core knowledge base includes expert sales tactics, lead generation strategies, and digital marketing. You help users automate their workflows. Always be professional, efficient, and data-driven.",
      tools: [{ googleSearch: {} }]
    }
  });

  const response = await chat.sendMessage({ message });
  return {
    text: response.text,
    sources: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
  };
};

export const findLeadsWithMaps = async (query: string, lat?: number, lng?: number) => {
  const ai = getAIClient();
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: `Find business leads for: ${query} in the specified location. Provide business names, phone numbers if available, and addresses.`,
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
    text: response.text,
    links: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
  };
};

export const generateAutomationScript = async (platform: string, task: string) => {
  const ai = getAIClient();
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Write a logical automation flow for ${platform} to perform ${task}. Include anti-detection logic, random delays, and spin-tax strategy. Return the logic as a markdown instruction set.`,
  });

  return response.text;
};
