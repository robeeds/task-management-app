// @/src/app/actions/auth.ts

import { Client, Account, ID } from "appwrite";
import { RegisterFormSchema, FormState } from "../lib/definitions";

// Appwrite Variables
const PROJECT_ID = '6753d8760022acf2006b';

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
    const data = await account.create(ID.unique(), email, password, name);

    const user = data.$id

    if(!user) {
        return {
            message: 'An error occurred while creating an account'
        }
    }
}

// Login the User
export async function login(formData: FormData) {
    const email = formData.get('email');
    const password = formData.get('password');

    console.log(email, password)
}