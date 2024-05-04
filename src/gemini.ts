import {
  ChatSession,
  GenerativeModel,
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} from "@google/generative-ai";

export class Gemini {
  private readonly API_KEY: string;
  private readonly MODEL_NAME: string;
  public readonly gemini: GoogleGenerativeAI;
  public readonly model: GenerativeModel;

  constructor(params: { API_KEY: string; MODEL_NAME: string }) {
    this.API_KEY = params.API_KEY;
    this.MODEL_NAME = params.MODEL_NAME;

    this.gemini = new GoogleGenerativeAI(this.API_KEY);
    this.model = this.gemini.getGenerativeModel({
      model: this.MODEL_NAME,
    });
  }

  async startChat(model: GenerativeModel): Promise<ChatSession> {
    const generationConfig = {
      temperature: 1,
      topK: 0,
      topP: 0.95,
      maxOutputTokens: 8192,
    };

    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
    ];

    const chat = model.startChat({
      generationConfig,
      safetySettings,
      history: [],
    });
    return chat;
  }

  async sendMessage(
    chat: ChatSession,
    message: string
  ): Promise<{
    response: string;
  }> {
    const { response } = await chat.sendMessage(message);
    return {
      response: response.text(),
    };
  }
}
