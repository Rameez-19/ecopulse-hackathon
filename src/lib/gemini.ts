import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

// Priority list of models to try
const FALLBACK_MODELS = [
    'gemini-2.5-flash',
    'gemini-1.5-flash',
    'gemini-1.5-pro',
    'gemini-2.0-flash-exp' // fallback to experimental if standard are overloaded
];

// Helper function with automatic fallback
async function generateContentWithFallback(prompt: string): Promise<string> {
    let lastError: unknown;
    
    for (const model of FALLBACK_MODELS) {
        try {
            console.log(`Attempting Gemini generation with model: ${model}`);
            const response = await ai.models.generateContent({
                model: model,
                contents: prompt,
            });
            
            if (response.text) {
                return response.text;
            }
        } catch (error: unknown) {
            console.warn(`Model ${model} failed. Error:`, error instanceof Error ? error.message : error);
            lastError = error;
            // Continue to the next model in the loop
        }
    }
    
    // If all models fail
    console.error('All Gemini models failed. Last error:', lastError);
    throw new Error('I am currently unable to analyze your data. Please try again later.');
}

export async function getCoachRecommendations(userData: unknown) {
    const prompt = `
    You are an expert AI Sustainability Coach.
    Based on the following user data, provide 3 specific, actionable recommendations to reduce their carbon footprint.
    User Data: ${JSON.stringify(userData)}
    
    Format the response nicely in Markdown with bullet points. Be encouraging and concise.
    `;

    try {
        return await generateContentWithFallback(prompt);
    } catch (error) {
        console.error("Error fetching Gemini recommendations:", error);
        return "I am currently unable to analyze your data. Please try again later.";
    }
}

export async function simulateEcoFuture(currentCo2: number, scenario: string) {
    const prompt = `
    You are an expert Eco Future Simulator.
    The user's current estimated annual CO2 footprint is ${currentCo2} kg.
    They want to know the impact of this scenario: "${scenario}"
    
    1. Estimate how much CO2 this would save annually.
    2. Provide a real-world equivalent (e.g., "That's like planting X trees" or "That's the same as taking X cars off the road").
    3. Give a brief explanation of why this change is effective.
    
    Format the response nicely in Markdown. Be concise and engaging.
    `;

    try {
        return await generateContentWithFallback(prompt);
    } catch (error) {
        console.error("Error simulating scenario:", error);
        return "I am currently unable to simulate this scenario. Please try again later.";
    }
}
