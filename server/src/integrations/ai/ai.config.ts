export const AI_CONFIG = {
    maxInputTokens: 4000,
    maxOutputTokens: 500,
    maxRetries: 3,
    timeoutMs: 10000,
    defaultProvider: "gemini",
    models: {
        gemini: process.env.GEMINI_MODEL || "gemini-3.1-flash-lite",
        openai: process.env.OPENAI_MODEL || "gpt-5.6-luna",
        ollama: process.env.OLLAMA_MODEL || "gemma4:31b-cloud",
    }
};

export default AI_CONFIG;
