import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
    
    let nextCookies = await cookies();
    let cookie = await nextCookies.get("user-session"); // Adjust so that the session is set to the Appwrite user-session cookie

    // If the user is already logged in (i.e., session exists), redirect to the dashboard
    if (cookie) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    // Continue to the login page if no session is found
    return NextResponse.next();
}

// Specify the matching routes for this middleware
export const config = {
  matcher: '/login', // Apply middleware only on the /login page
};