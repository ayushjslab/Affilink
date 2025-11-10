import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const cookieStore = await cookies();

    cookieStore.set({
      name: "session_token",
      value: "",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 0,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Logout successful. Session cleared.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Logout Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error while logging out.",
      },
      { status: 500 }
    );
  }
}
