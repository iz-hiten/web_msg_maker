
import { GoogleGenAI, Type } from "@google/genai";
import type { FormData, GenerationResult, GroundingSource } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const findContactRoles = async (companyName: string, motive: string): Promise<{ suggestions: string, sources: GroundingSource[] }> => {
    const prompt = `Analyze the company "${companyName}" and suggest 3 key job titles or roles to contact for the purpose of ${motive}. For each role, provide a brief, one-sentence explanation of why they are a good contact. Your answer should be concise and professional. Do not format as a list, but as a readable paragraph.`;
    
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            tools: [{googleSearch: {}}],
        },
    });

    const suggestions = response.text;
    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks ?? [];
    return { suggestions, sources: sources as GroundingSource[] };
};


const generateMessages = async (formData: FormData, contactRolesText: string) => {
    const prompt = `
        You are an expert business communication assistant. Your task is to generate professional, personalized, and effective outreach messages based on the provided context.

        **Context:**
        - User's Role: ${formData.userRole}
        - Target Company: ${formData.companyName}
        - Suggested Roles to Contact: ${contactRolesText}
        - Motive for Contact: ${formData.motive}
        - Desired Tone: ${formData.tone}
        - Key Points to Include: ${formData.keyPoints || 'N/A'}

        **Request:**
        Generate a set of outreach messages tailored for the following platforms: ${formData.platforms.join(', ')}.
        For each message:
        1. Ensure it is personalized, referencing the company and a potential recipient's role.
        2. Make it concise, professional, and to the point.
        3. For 'Email' platforms, you MUST provide a compelling subject line. For other platforms, the subject must be null.
        4. Adhere strictly to the specified tone.
    `;

    const responseSchema = {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            platform: { 
                type: Type.STRING,
                description: 'The platform for the message (e.g., "Email", "LinkedIn").'
            },
            subject: { 
                type: Type.STRING,
                description: 'Subject line, for emails only. Should be null for other platforms.',
                nullable: true,
            },
            body: { 
                type: Type.STRING,
                description: 'The full message body.'
            }
          },
          required: ["platform", "body"]
        }
    };

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema,
        },
    });

    const jsonText = response.text.trim();
    return JSON.parse(jsonText);
};

export const generateBusinessMessage = async (formData: FormData): Promise<GenerationResult> => {
    const contacts = await findContactRoles(formData.companyName, formData.motive);
    const messages = await generateMessages(formData, contacts.suggestions);

    return {
        messages,
        contacts,
    };
};
