// app/api/verify/route.ts

import { NextResponse } from "next/server";
import { updateVerifyStatus } from "@/lib/server/appwrite";
import { AppwriteException } from "node-appwrite";

export async function POST(request: Request) {

    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId') as string;
    const secret = searchParams.get('secret') as string;

    try {
        const verificationStatus = await updateVerifyStatus(userId, secret);
        console.log("/api/verify/route.ts:", verificationStatus);
        return NextResponse.json(
            { message: "Successfully verified account"},
            { status: 200 }
        );
    } catch (error) {
        if (error instanceof AppwriteException) {
            return NextResponse.json(
                { message: error.message },
                { status: error.code }
            )
        } else {
            return NextResponse.json(
                { error: "This is an unknown error. Close the browser and try again." },
                { status: 400 }
            )
        }
    }
  
}
