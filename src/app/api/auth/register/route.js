import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import connectDB from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    const existingUser = await User.findOne({
      email: body.email,
    });

    if (existingUser) {
      return NextResponse.json(
        {
          error: "User already exists",
        },
        {
          status: 400,
        }
      );
    }

    const hashedPassword = await bcrypt.hash(
      body.password,
      10
    );

    const user = await User.create({
      email: body.email,
      password: hashedPassword,
    });

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      {
        error: "Server Error",
      },
      {
        status: 500,
      }
    );
  }
}