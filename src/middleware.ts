import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const nextCookies = await cookies();
  const cookie = await nextCookies.get("user-session"); // Adjust so that the session is set to the Appwrite user-session cookie

  // If the user is already logged in (i.e., session exists), redirect to the dashboard
  if (
    cookie &&
    (request.nextUrl.pathname.startsWith("/login") ||
      request.nextUrl.pathname.startsWith("/signup"))
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!cookie && request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}
