// @/src/middleware.ts

// Imports
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

const protectedRoutes = ['/dashboard']
const publicRoutes = ['/login', '/register', '/']

export async function middleware(request: NextRequest) {

    // Checks if the current route is protected or public
    const path = request.nextUrl.pathname
    const isProtectedRoute = protectedRoutes.includes(path)
    const isPublicRoute = publicRoutes.includes(path)
    
    // Gets the current session cookie
    const nextCookies = await cookies();
    const cookie = await nextCookies.get("user-session");
    
    // Get the current user session, if there is none, then delete cookie

    // Redirect to /login if the user is not authenticated
    if (isProtectedRoute && !cookie) {
        return NextResponse.redirect(new URL('/login', request.nextUrl))
    }

    // Redirect to /dashboard if the user is authenticated
    if (
        isPublicRoute &&
        cookie &&
        !request.nextUrl.pathname.startsWith('/dashboard')
    ) {
        return NextResponse.redirect(new URL('/dashboard', request.nextUrl))
    }

    return NextResponse.next()
    
}