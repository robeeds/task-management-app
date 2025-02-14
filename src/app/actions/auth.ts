// @/src/app/actions/auth.ts

import { Client, Account, ID } from "appwrite";
import { RegisterFormSchema, FormState } from "../lib/definitions";

// Appwrite Variables
const PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT as string;

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

    // Call Appwrite to create a new user account
    const client = new Client()
        .setProject(PROJECT_ID);

    const account = new Account(client);
    const data = account.create(ID.unique(), email, password, name);

    if(!data) {
        return {
            message: 'An error occurred while creating an account'
        }
    }

    // TODO:
    // Create User Session
    // Redirect User
}

// Login the User
export async function login(formData: FormData) {
    const email = formData.get('email');
    const password = formData.get('password');

    console.log(email, password)
}