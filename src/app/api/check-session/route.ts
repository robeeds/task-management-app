import { getLoggedInUser } from '@/lib/server/appwrite';
import { NextResponse } from 'next/server';

export async function GET() {
    const user = await getLoggedInUser();
    if (!user) {
        console.log('No Session')
        return NextResponse.json({ loggedIn: false }, {status: 401});
    } else {
        console.log('Session Active')
        return NextResponse.json({ loggedIn: true }, {status: 200});
    }
}