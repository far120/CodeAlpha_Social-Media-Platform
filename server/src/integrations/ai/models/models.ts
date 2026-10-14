export const AI_MODELS = {
    GEMINI: "gemini-3.1-flash-lite",
    OPENAI: "gpt-5.6-luna",
    OLLAMA: "gemma4:31b-cloud",
} as const;

export type AIModelType = typeof AI_MODELS[keyof typeof AI_MODELS];
