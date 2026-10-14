export interface AIGenerateOptions {
    maxOutputTokens?: number;
    temperature?: number;
    [key: string]: any;
}

export interface AIProviderInterface {
    generate(input: any, options?: AIGenerateOptions): Promise<any>;
    countTokens(input: any): Promise<number>;
}
