/* eslint-disable @typescript-eslint/no-unused-vars */
import { connectDB } from "@/lib/connect-db";
import { hashPassword } from "@/lib/password-hashing";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const { username, email, password, role ,referredBy } = body;

    if (!username || !email || !password) {
      return NextResponse.json(
        { error: "All fields (username, email, password) are required." },
        { status: 400 }
      );
    }
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email or username already exists." },
        { status: 409 }
      );
    }

    const hashedPassword = await hashPassword(password);
 const affiliateCode = `${username
   .trim()
   .toLowerCase()
   .replace(/\s+/g, "-")}-${Math.random().toString(36).substring(2, 8)}`;

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      affiliateCode,
      role:  role || "customer",
      referredBy: referredBy || null,
    });

    const { password: _, ...userData } = newUser.toObject();

    return NextResponse.json(
      {
        message: "User registered successfully.",
        user: userData,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
