
import { GoogleGenAI } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getMarketAdvice = async (query: string) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: query,
    config: {
      systemInstruction: "Tu es un expert en agriculture africaine. Aide les agriculteurs avec des conseils sur les prix, la logistique et les cultures. Réponds de manière concise et pratique.",
      tools: [{ googleSearch: {} }]
    }
  });
  return response.text;
};

export const getChatbotResponse = async (history: {role: string, parts: {text: string}[]}[], message: string) => {
    const ai = getAI();
    const chat = ai.chats.create({
        model: 'gemini-3-pro-preview',
        config: {
            systemInstruction: "Tu es AgroBot, l'assistant IA de la plateforme AgroChain. Tu aides les utilisateurs. Si un utilisateur mentionne des symptômes sur une plante, donne un diagnostic probable et des solutions naturelles/biologiques si possible. Sois ultra-précis sur les prix du marché au Mali."
        }
    });
    const result = await chat.sendMessage({ message });
    return result.text;
};
