// import AIProvider from "./ai.providers";


// const MAX_INPUT_TOKENS = 4000;
// const MAX_OUTPUT_TOKENS = 500;

// const MAX_RETRIES = 3;
// const TIMEOUT = 10000; // 10 seconds


// export class AIService {
//     provider: AIProvider;

//     constructor(provider: AIProvider) {
//         this.provider = provider;
//     }


//     // ========================================
//     // Generate AI Response
//     // ========================================

//     async generate(prompt: string) {

//         // 1. Validate input
//         this.validateInput(prompt);


//         // 2. Check input token limit
//         await this.checkInputTokens(prompt);


//         // 3. Generate response with timeout + retry
//         const result = await this.generateWithRetry(prompt);


//         // 4. Validate AI output
//         this.validateOutput(result);



//         return result;
//     }


//     // ========================================
//     // Input Validation
//     // ========================================

//     validateInput(prompt: any) {

//         if (!prompt) {
//             throw new Error("Prompt is required");
//         }

//         if (typeof prompt !== "string") {
//             throw new Error("Prompt must be a string");
//         }

//         if (prompt.trim().length === 0) {
//             throw new Error("Prompt cannot be empty");
//         }
//     }


//     // ========================================
//     // Token Limit
//     // ========================================

//     async checkInputTokens(prompt: string) {

//         const tokenCount =
//             await this.provider.countTokens(prompt);

//         if (tokenCount > MAX_INPUT_TOKENS) {
//             throw new Error("Input exceeds maximum token limit");
//         }
//     }


//     // ========================================
//     // Retry + Timeout
//     // ========================================

//     async generateWithRetry(prompt: string) {

//         for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {

//             try {

//                 const result = await this.withTimeout(
//                     this.provider.generate(prompt),
//                     TIMEOUT
//                 );

//                 return result;

//             } catch (error: any) {


//                 if (!this.shouldRetry(error)) {
//                     throw error;
//                 }


//                 if (attempt === MAX_RETRIES) {
//                     throw error;
//                 }


//                 const delay =
//                     1000 * Math.pow(2, attempt - 1);

//                 await this.sleep(delay);
//             }
//         }
//     }


//     // ========================================
//     // Retry Policy
//     // ========================================

//     shouldRetry(error: any) {

//         const status =
//             error.status || error.statusCode;

//         return [429, 500, 502, 503, 504]
//             .includes(status);
//     }


//     // ========================================
//     // Timeout
//     // ========================================

//     withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {

//         const timeout = new Promise<never>((_, reject) => {

//             setTimeout(() => {
//                 reject(
//                     new Error("AI request timed out")
//                 );
//             }, ms);

//         });

//         return Promise.race([
//             promise,
//             timeout
//         ]);
//     }


//     // ========================================
//     // Output Validation
//     // ========================================

//     validateOutput(result: any) {

//         if (!result) {
//             throw new Error("AI returned an empty response");
//         }

//         if (typeof result !== "string") {
//             throw new Error("AI response must be a string");
//         }
//     }


//     // ========================================
//     // Helpers
//     // ========================================

//     sleep(ms: number) {

//         return new Promise<void>(resolve => {
//             setTimeout(resolve, ms);
//         });
//     }
// }


// export default AIService;