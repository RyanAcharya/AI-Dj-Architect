import { NextResponse } from "next/server";
import { getSetJson } from "../../../backend/llm_service/llm-service"

export async function POST(req: Request) {
    try {
        const requestBody = await req.json()
        const responseSetJson = await getSetJson(requestBody.trimedPrompt)

        const responseSetJsonBody = await responseSetJson.json()

      return NextResponse.json({
        setJson: responseSetJsonBody.setJson,
      });
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { error: "LLM request failed" },
        { status: 500 }
      );
    }
  }