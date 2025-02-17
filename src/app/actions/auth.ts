// @/src/app/actions/auth.ts
'use server'

// Imports
import { AppwriteException, ID } from "node-appwrite";
import { RegisterFormSchema, FormState, LoginFormSchema } from "../lib/definitions";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createAdminClient, createSessionClient, createSessionCookie } from "../lib/sessions";

// Register the User
export async function register(state: FormState, formData: FormData) {

    // Validate form fields
    const validatedFields = RegisterFormSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
    })

    // If any form fields are invalid, return early
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }
    
    // Set email, password, and name
    const { email, password, name } = validatedFields.data

    // Call Appwrite to create an admin client session
    const { account } = await createAdminClient();

    // Should probably define the data type of the session as a promise: https://appwrite.io/docs/references/cloud/models/session#properties
    let session = undefined;
    try {

        // Call Appwrite to create a new user account
        await account.create(ID.unique(), email, password, name);

        // Create User Session
        session = await account.createEmailPasswordSession(
            email,
            password
        )

    } catch (error) {
        // If there was an error, return early
        if (error instanceof AppwriteException) {
            if (error.code == 409) {
                return {
                    message: 'A user already exists with that email'
                }
            } else {
                return {
                    message: error.message
                }
            }
        } else {
            return {
                message: 'Something went wrong'
            }
        }
    }

    // Create a session cookie
    const sessionSecret = session.secret;
    const expiresAt = new Date(session.expire);
    await createSessionCookie(sessionSecret, expiresAt);
    
    // Redirect User
    redirect("/dashboard");

    // TODO : Create Verification Email

    // Third, enable realtime on the client?
}

// Login the User
export async function login(state: FormState, formData: FormData) {

    // Validate form fields
    const validatedFields = LoginFormSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password'),
    })

    // If any form fields are invalid, return early
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }
    
    // Set email, password, and name
    const { email, password } = validatedFields.data;

    // Call Appwrite to create a new admin client
    const { account } = await createAdminClient();

    // Should probably define the data type of the session as a promise: https://appwrite.io/docs/references/cloud/models/session#properties
    let session = undefined;
    try {

        // Call Appwrite to create a new user session
        session = await account.createEmailPasswordSession(email, password);
    } catch (error) {
        // If there was an error, return early
        if (error instanceof AppwriteException) {
            return {
                message: error.message
            }
        } else {
            return {
                message: 'Something went wrong'
            }
        }
    }

    // Create a session cookie
    const sessionSecret = session.secret;
    const expiresAt = new Date(session.expire);
    createSessionCookie(sessionSecret, expiresAt);

    // Redirect the user
    redirect('/dashboard');
}

// Logout the User
export async function logout() {
    // Call Appwrite to delete the current user session
    const { account } = await createSessionClient();

    // Delete the cookie
    const nextCookies = await cookies();
    nextCookies.delete("user-session");

    // Delete the session
    await account?.deleteSession("current");
    
    // Redirect the user
    redirect('/login')
}

// Get the current user
export async function getUser() {
    const { account } = await createSessionClient();
    const user = await account?.get();

    const username = user?.name;

    return username;
}