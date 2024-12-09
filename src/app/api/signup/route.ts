// app/api/register/route.ts

import { NextResponse } from "next/server";
import { registerUser } from "@/lib/server/appwrite"; // Your login function
import { AppwriteException } from "node-appwrite";

export async function POST(request: Request) {
  const data = await request.formData();
  const email = data.get("email") as string;
  const password = data.get("password") as string;
  const name = data.get("username") as string;

  try {
    const session = await registerUser(email, password, name);
    return NextResponse.json(
      { message: session },
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof AppwriteException) {
      return NextResponse.json(
        { error: error.message },
        { status: error.code },
      );
    } else {
      return NextResponse.json(
        { error: "This is an unknown error" },
        { status: 400 },
      );
    }
  }
}
