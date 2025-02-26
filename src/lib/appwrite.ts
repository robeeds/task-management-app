// @/src/lib/appwrite.ts

import { Client, Databases } from "appwrite";

// Env. Variables
export const ENDPOINT =  process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string;
export const PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT as string;
export const KEY = process.env.NEXT_APPWRITE_KEY as string;
export const DATABASE_ID = process.env.NEXT_APPWRITE_DATABASE as string;
export const COLLECTION_ID = process.env.NEXT_APPWRITE_COLLECTION as string;

const client = new Client()
    .setEndpoint(ENDPOINT)
    .setProject(PROJECT_ID)

export const databases = new Databases(client)

export default client