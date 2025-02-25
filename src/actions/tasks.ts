// @/src/actions/tasks.ts
"use server"

// Imports
import { CreateTaskSchema, TaskFormState, TaskSchema } from "@/lib/definitions"
import { Client, Databases, ID, Permission, Role } from "node-appwrite"
import { getUser } from "./auth";

// Initialize Variables
const ENDPOINT =  process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string;
const PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT as string;
const KEY = process.env.NEXT_APPWRITE_KEY as string;
const DATABASE_ID = process.env.NEXT_APPWRITE_DATABASE as string;
const COLLECTION_ID = process.env.NEXT_APPWRITE_COLLECTION as string;

// Call Appwrite to create a database client
const client = new Client()
    .setEndpoint(ENDPOINT)
    .setProject(PROJECT_ID)
    .setKey(KEY)

const databases = new Databases(client);

// Create Task
export async function createTask(state: TaskFormState, formData: FormData) {

    // Validate form fields
    const validatedFields = CreateTaskSchema.safeParse({
        title: formData.get('title'),
        description: formData.get('description'),
        dueDate: formData.get('dueDate'),
        isImportant: formData.get('isImportant'),
        isComplete: false,
    })

    // If any form fields are invalid, return early
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    // Set title, description, due date, and importance
    const { title, description, dueDate, isImportant } = validatedFields.data

    // Defining the data to be passed to document creation
    const newTask = {
        title: title,
        description: description,
        dueDate: dueDate,
        isImportant: isImportant,
    }

    // Get the current user
    const user = await getUser()
    const userId = user?.$id as string;

    // Call Appwrite to create a document
    const response = await databases.createDocument(
        '67a113c40021c7fe3479',
        '67a113cc000fa69b928a',
        ID.unique(),
        newTask,
        [
            Permission.read(Role.user(userId)), // Only this user can read
            Permission.update(Role.user(userId)), // Only this user can update
            Permission.delete(Role.user(userId)), // Only this user can delete
        ]
    )

    console.log(response);
}

// Read Task -> Realtime?
export async function getTasks(): Promise<TaskSchema[]> {
    
    // Call Appwrite to fetch documents
    const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTION_ID,
    )

    // Mapping documents to an array
    const tasks: TaskSchema[] = response.documents.map((doc) => ({
        $id: doc.$id,
        $createdAt: doc.$createdAt,
        title: doc.title,
        description: doc.description,
        dueDate: doc.dueDate,
        isImportant: doc.isImportant,
        isCompleted: doc.isCompleted
    }))
    

    return tasks;
}

// Update Task

// Delete Task