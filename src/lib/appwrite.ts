// @/src/lib/appwrite.ts

import { Client, Databases } from "appwrite";

// Env. Variables
const ENDPOINT = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string
const PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT as string;

export const client = new Client()
    .setEndpoint(ENDPOINT)
    .setProject(PROJECT_ID)

export const databases = new Databases(client)