import OpenAI from "openai";
import { NextResponse } from "next/server";
import { djArchitectPromptCreator, AI_MODEL } from "./constants/llm-constants";

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
}
);

export async function getSetJson(userPrompt: String) {
    try {
      const aiPromptString = djArchitectPromptCreator(userPrompt)
      const response = await client.responses.create({
        model: AI_MODEL,
        input: aiPromptString,
      });
  
      return NextResponse.json({
        setJson: response.output_text,
      });
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { error: "LLM request failed" },
        { status: 500 }
      );
    }
  }