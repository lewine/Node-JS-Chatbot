import { OpenAI } from 'openai';
import dotenv from 'dotenv';
dotenv.config();
console.log("Loaded OpenAI key:", process.env.OPENAI_API_KEY ? "✅" : "❌ MISSING");

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

export default openai;