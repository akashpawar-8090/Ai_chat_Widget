import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import connectDB from "@/lib/mongodb";
import User from "@/models/User";

import { createToken } from "@/lib/auth";

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    const user = await User.findOne({
      email: body.email,
    });

    if (!user) {
      return NextResponse.json(
        {
          error: "Invalid credentials",
        },
        {
          status: 400,
        }
      );
    }

    const validPassword = await bcrypt.compare(
      body.password,
      user.password
    );

    if (!validPassword) {
      return NextResponse.json(
        {
          error: "Invalid credentials",
        },
        {
          status: 400,
        }
      );
    }

    const token = createToken(user._id);

    const response = NextResponse.json({
      success: true,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: false,
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return response;
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