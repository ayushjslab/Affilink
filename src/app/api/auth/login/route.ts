import { connectDB } from "@/lib/connect-db";
import { verifyPassword } from "@/lib/password-hashing";
import { createToken } from "@/lib/token-gen-ver";
import User from "@/models/user.model";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Email and password is required",
        },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "No user exist with this email",
        },
        { status: 404 }
      );
    }

    const isPasswordCorrect = await verifyPassword(password, user.password);

    if (!isPasswordCorrect) {
      return NextResponse.json(
        {
          success: false,
          message: "Password incorrect",
        },
        { status: 401 }
      );
    }

    const token: string = await createToken({
      userId: user.id,
      email: user.email,
    });

    const cookieStore = await cookies();
    cookieStore.set({
      name: "session_token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return NextResponse.json({
      success: true,
      message: `Welcome back ${user.name}`,
    },{status: 200});
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}
