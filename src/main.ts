import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { Gemini } from "./gemini";
config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const APP_PORT = process.env.APP_PORT;

const app = express();
app.use(express.json());
app.use(cors());

const messages: Array<{
  message: string;
}> = [];

const gemini = new Gemini({
  API_KEY: GEMINI_API_KEY as string,
  MODEL_NAME: "gemini-1.5-pro-latest",
});

app.get("/chat", async (req, res) => {
  return res.send(messages);
});

app.post("/chat", async (req, res) => {
  const userMessage = req.body?.message;

  if (!userMessage)
    return res.status(400).json({
      statusCode: 400,
      error: "Message is required",
    });

  const chat = await gemini.startChat(gemini.model);
  const message = await gemini.sendMessage(chat, userMessage);

  messages.push(
    {
      message: `User: ${userMessage}`,
    },
    {
      message: `Gemini: ${message.response}`,
    }
  );
  return res.send(messages);
});

app.listen(process.env.APP_PORT, () => {
  console.log(`Server running on port ${APP_PORT}`);
});
