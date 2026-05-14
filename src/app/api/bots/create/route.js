import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import Bot from "@/models/Bot";

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    const bot = await Bot.create({
      name: body.name,
      themeColor: body.themeColor,
      systemPrompt: body.systemPrompt,
    });

    return NextResponse.json(bot);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        error: "Error creating bot",
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}