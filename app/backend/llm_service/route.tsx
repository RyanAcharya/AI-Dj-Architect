import OpenAI from "openai";
import { NextResponse } from "next/server";
import { DJ_ARCHITECT_PROMPT, AI_MODEL } from "./constants/llm-constants";

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
}
);

export async function GET() {
    try {
      const response = await client.responses.create({
        model: AI_MODEL,
        input: DJ_ARCHITECT_PROMPT,
      });
  
      return NextResponse.json({
        text: response.output_text,
      });
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { error: "LLM request failed" },
        { status: 500 }
      );
    }
  }