
import { GoogleGenAI, Type } from "@google/genai";
import { AIRepurposeResponse, Platform } from "../types";

// Fix: Initialize GoogleGenAI according to guidelines, using process.env.API_KEY directly
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generatePostContent = async (
  topic: string, 
  platforms: Platform[],
  tone: string = "professional and engaging"
): Promise<AIRepurposeResponse> => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `As an expert social media manager, repurpose the following idea into specific posts for these platforms: ${platforms.join(', ')}. 
    Topic/Idea: ${topic}
    Desired Tone: ${tone}
    
    Ensure each platform has its unique character (e.g., LinkedIn more professional/long-form, X punchy/short, Instagram visually descriptive/hashtag-heavy).`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          variations: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                platform: { type: Type.STRING, description: "The social platform name" },
                content: { type: Type.STRING, description: "The main caption text" },
                hashtags: { 
                  type: Type.ARRAY, 
                  items: { type: Type.STRING } 
                },
                cta: { type: Type.STRING, description: "A compelling call to action" }
              },
              required: ["platform", "content", "hashtags", "cta"]
            }
          }
        },
        required: ["variations"]
      }
    }
  });

  try {
    return JSON.parse(response.text) as AIRepurposeResponse;
  } catch (e) {
    console.error("Failed to parse AI response", e);
    throw new Error("Invalid AI response format");
  }
};

export const refineCaption = async (content: string, platform: Platform): Promise<string> => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Refine and improve this social media caption specifically for ${platform}. 
    Make it more engaging, fix grammar, and ensure it follows platform best practices.
    Original content: "${content}"`,
  });
  return response.text.trim();
};