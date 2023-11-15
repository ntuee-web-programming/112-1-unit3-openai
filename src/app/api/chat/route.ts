import { Message } from "@/utils/types";
import { NextRequest, NextResponse } from "next/server";
import { OpenAIStream, StreamingTextResponse } from "ai";

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY, // defaults to process.env["OPENAI_API_KEY"]
});

export async function POST(request: NextRequest) {
  try {
    // Get the message from the request query
    const requestBody = await request.json();
    // Please use a validator in production
    const messages = requestBody.messages as Message[];

    // Send the message to OpenAI
    const response = await openai.chat.completions.create({
      messages: messages,
      model: "gpt-3.5-turbo",
      temperature: 0,
      max_tokens: 1000,
      // Set stream to true
      stream: true,
    });

    const stream = OpenAIStream(response, {
      onCompletion: async (response) => {
        // Do something with the response
        console.log(response);
      },
    });
    return new StreamingTextResponse(stream, {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
