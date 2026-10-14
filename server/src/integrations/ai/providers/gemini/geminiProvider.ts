// import AIProvider from "../../ai.providers";
// import { GoogleGenAI } from "@google/genai"
// import dotenv from "dotenv"
// dotenv.config()


// // ========================================
// // Gemini Configuration
// // ========================================

// const MODEL = "gemini-3.1-flash-lite";


// // ========================================
// // Initialize Gemini Client
// // ========================================

// const ai = new GoogleGenAI({
//     apiKey: process.env.GEMINI_API_KEY
// });


// // ========================================
// // Gemini Provider
// // ========================================

// export class GeminiProvider extends AIProvider {


//     // ========================================
//     // Generate
//     // ========================================

//     async generate(input: any, options: Record<string, any> = {}) {
//         const response = await ai.models.generateContent({
//             model: MODEL,
//             contents: input,
//             config: {
//                 maxOutputTokens: options.maxOutputTokens,
//                 temperature: options.temperature
//             }
//         });
//         return this.normalizeResponse(response);
//     }


//     // ========================================
//     // Count Tokens
//     // ========================================

//     async countTokens(input: any): Promise<number> {
//         const response = await ai.models.countTokens({
//             model: MODEL,
//             contents: input
//         });
//         return response.totalTokens ?? 0;
//     }


//     // ========================================
//     // Normalize Response
//     // ========================================

//     normalizeResponse(response: any): string {
//         if (typeof response.text === "string") {
//             return response.text;
//         }
//         return response.candidates?.[0]?.content?.parts?.[0]?.text || "";
//     }

// }


// export default GeminiProvider;