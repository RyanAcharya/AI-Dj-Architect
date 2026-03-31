import { NextResponse } from "next/server";
import { getSetJson } from "../../../backend/llm_service/llm-service"
import { DJSetConfig } from "@/constants/constants";
import { findSongCandidates } from "@/backend/soundcloud_service/soundcloud-service";

export async function POST(req: Request) {
    try {
        const requestBody = await req.json()
        const responseSetJson = await getSetJson(requestBody.trimedPrompt)

        const djSetResponseJson = await responseSetJson.json()
        const parsedConfig: DJSetConfig = JSON.parse(djSetResponseJson.setJson);
        const responseSongs = await findSongCandidates(parsedConfig as DJSetConfig)

      return NextResponse.json({
        setJson: responseSongs,
      });

    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { error: "LLM request failed" },
        { status: 500 }
      );
    }
  }