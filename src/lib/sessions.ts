// @/src/lib/sessions.ts

// Imports
import 'server-only'
import { cookies } from 'next/headers'
import { Account, Client } from 'node-appwrite';
import { ENDPOINT, PROJECT_ID, KEY } from './appwrite';

// Create End User Session Client
export async function createSessionClient() {
    const client = new Client()
        .setEndpoint(ENDPOINT)
        .setProject(PROJECT_ID);
    
    // Get the current cookie
    const nextCookies = await cookies();
    const session = await nextCookies.get("user-session");

    // Return early if there is an error
    if (!session || !session.value) {
        return {
            message: 'There is no session available'
        }
    }

    // Sets the user session equivalent to cookie value
    client.setSession(session.value)

    return { 
        get account() {
            return new Account(client);
        },
    };
}

// Create Admin Client
export async function createAdminClient() {
    const adminClient = new Client()
        .setEndpoint(ENDPOINT)
        .setProject(PROJECT_ID)
        .setKey(KEY);

    return { 
        get account() {
            return new Account(adminClient);
        },
    };
}

// Sets the current session's cookie
export async function createSessionCookie(secret: string, expiry: Date) {
    const nextCookies = await cookies()

    nextCookies.set('user-session', secret, {
        httpOnly: true,
        secure: true,
        expires: expiry,
        sameSite: 'strict',
        path: '/',
    })

}