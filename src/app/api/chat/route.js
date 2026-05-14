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
    console.log("STEP 1");

    await connectDB();

    console.log(
      "STEP 2 DATABASE CONNECTED"
    );

    const body = await req.json();

    console.log("STEP 3 BODY");

    console.log(body);

    const bot = await Bot.findById(
      body.botId
    );

    console.log("STEP 4 BOT");

    console.log(bot);

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

    console.log(
      "STEP 5 AI RESPONSE"
    );

    return NextResponse.json({
      response:
        completion.choices[0].message
          .content,
    });
  } catch (error) {
    console.log(
      "FINAL ERROR"
    );

    console.log(error);

    return NextResponse.json(
      {
        error:
          "Server Error",

        message:
          error.message,
      },
      {
        status: 500,
      }
    );
  }
}