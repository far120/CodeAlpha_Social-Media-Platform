// import AIProvider from "../../ai.providers";
// import OpenAI from "openai";
// import dotenv from "dotenv"
// dotenv.config()

// // ========================================
// // OpenAI Configuration
// // ========================================

// const MODEL = "gpt-5.6-luna";


// // ========================================
// // Initialize OpenAI Client
// // ========================================

// const client = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY || ""
// });


// // ========================================
// // OpenAI Provider
// // ========================================

// export class OpenAIProvider extends AIProvider {


//     // ========================================
//     // Generate
//     // ========================================

//     async generate(input: any, options: Record<string, any> = {}) {

//         const response: any = await client.responses.create({
//             model: MODEL,
//             input: input,
//             max_output_tokens: options.maxOutputTokens
//         });
//         return response.output_text || response.choices?.[0]?.message?.content || "";
//     }


//     // ========================================
//     // Count Tokens
//     // ========================================

//     async countTokens(input: any): Promise<number> {
//         if (typeof input === "string") {
//             return Math.ceil(input.length / 4);
//         }
//         return 0;
//     }

// }


// export default OpenAIProvider;