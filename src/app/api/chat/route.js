import { NextResponse } from "next/server";

import OpenAI from "openai";

import connectDB from "@/lib/mongodb";
import Bot from "@/models/Bot";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,

  baseURL:
    "https://api.groq.com/openai/v1",
});

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    // FETCH BOT
    const bot = await Bot.findById(
      body.botId
    );

    if (!bot) {
      return NextResponse.json(
        {
          error: "Bot not found",
        },
        {
          status: 404,
        }
      );
    }

    // SEND SYSTEM PROMPT
    const completion =
      await openai.chat.completions.create({
        model:
          "llama-3.3-70b-versatile",

        messages: [
          {
            role: "system",

            content:
              bot.systemPrompt,
          },

          {
            role: "user",

            content:
              body.message,
          },
        ],
      });

    return NextResponse.json({
      response:
        completion.choices[0].message
          .content,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}