"use server";

import { Client, Account, ID, Databases, Query, AppwriteException } from "node-appwrite";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

// Environmental Variables
const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string;
const project = process.env.NEXT_PUBLIC_APPWRITE_PROJECT as string;
const key = process.env.NEXT_APPWRITE_KEY as string;
const database_id = process.env.NEXT_APPWRITE_DATABASE_KEY as string;
const collection_id = process.env.NEXT_APPWRITE_COLLECTION_KEY as string;

// Creates end user session client
export async function createSessionClient() {
  if (!endpoint) {
    throw new Error("Endpoint not defined");
  }

  if (!project) {
    throw new Error("Project not defined");
  }

  const client = new Client().setEndpoint(endpoint).setProject(project);

  const nextCookies = await cookies();
  const session = await nextCookies.get("user-session");
  if (!session || !session.value) {
    throw new Error("No session");
  }

  client.setSession(session.value);

  return {
    get account() {
      return new Account(client);
    },
  };
}

// Creates admin user session client
export async function createAdminClient() {
  if (!endpoint) {
    throw new Error("Endpoint not defined");
  }

  if (!project) {
    throw new Error("Project not defined");
  }

  if (!key) {
    throw new Error("Key not defined");
  }

  const client = new Client()
    .setEndpoint(endpoint)
    .setProject(project)
    .setKey(key);

  return {
    get account() {
      return new Account(client);
    },
  };
}

// Gets the currently logged in user
export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    return await account.get();
  } catch (error) {
    if (error instanceof AppwriteException && error.code == 401) {
      return null;
    }
    console.log("appwrite.ts getLoggedInUser()", error);
    return null;
  }
}

// Register the User
export async function registerUser(
  email: string,
  password: string,
  name: string,
) {
  const { account } = await createAdminClient();

  await account.create(ID.unique(), email, password, name);

  try {
    const session = await logInUser(email, password);

    // General functions on account creation
    await sendVerifyEmail();
    await createDocument();
    await fetchDocuments();

    return session;
  } catch (error) {
    if (error instanceof AppwriteException) {
      return error.message;
    }
  }
}

// Log in the user
export async function logInUser(email: string, password: string) {
  const { account } = await createAdminClient();

  try {
    const session = await account.createEmailPasswordSession(email, password);

    const nextCookies = await cookies();
    nextCookies.set("user-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return "Login Successful";
  } catch (error) {
    if (error instanceof AppwriteException) {
      return error.type;
    }
  }
}

// Logout User
export async function logOutUser() {
  const { account } = await createSessionClient();

  const nextCookies = await cookies();
  nextCookies.delete("user-session");
  await account.deleteSession("current");
  redirect("/login");
}

// Sends the verification email
export async function sendVerifyEmail() {
  const { account } = await createSessionClient();

  // Uses userId and secret params
  const promise = account.createVerification('https://taskman-tau.vercel.app/verify');

  promise.then(function (response) {
    console.log("Successfully sent a verification email", response);
  }, function (error) {
    console.log("appwrite.ts sendVerifyEmail \n Failure to send a verification email\n", error);
    if (error instanceof AppwriteException) {
      console.log(error.code)
      if (error.code == 429) {
        return "Rate limit exceeded. Please try again in 10 minutes."
      } else if (error.code == 401) {
        return "Invalid link. Please try email verification again through dashboard" 
      } else {
        return (error.message)
      }
    }
  })
}

// Updates the verification status of the user
export async function updateVerifyStatus(
  userId: string, 
  secret: string
) {

  const { account } = await createSessionClient();

  try {
    const updateStatus = await account.updateVerification(userId, secret);
    console.log("appwrite.ts", updateStatus);
    return updateStatus;
  } catch (error) {
    if (error instanceof AppwriteException) {
      return NextResponse.json(
        { message: error.message },
        { status: error.code }
      )
    } else {
      return "This is an unknown updateVerification error"
    }
  }
}

// Gets the verification status of the current user
export async function getEmailVerificationStatus() {
  const { account } = await createSessionClient();
  const user = await account.get();

  // account.emailverification returns boolean
  const verificationStatus = user.emailVerification;
  return verificationStatus;
}

// Creates the user's first template document
export async function createDocument() {
  const client = new Client();

  client
    .setEndpoint(endpoint)
    .setProject(project)
    .setKey(key)

  const databases = new Databases(client);

  // Get's the current user's username
  const user = await getLoggedInUser();
  const userId = user?.$id as string;

  // Data to fill document
  const data = {
    user_id : userId,
    Title : "This is an example title",
    Description : "This is an example description",
    Important : true,
    Completed : false,
  }
  const json = JSON.stringify(data);

  // Creates a database using a unique ID, and the user's id as the database name
  const promise = databases.createDocument(
    database_id,
    collection_id,
    ID.unique(),
    json,
  )

  promise.then(function (response) {
    console.log("appwrite.ts createDocument()", response);
  }, function (error) {
    console.log(error);
    if(error instanceof AppwriteException) {
      console.log("Apprite.ts createDocument()", error.name, error.message, error.code)
    }
  })

}

// Lists the User's Tasks
export async function fetchDocuments() {
  const client = new Client()

  client
    .setEndpoint(endpoint)
    .setProject(project)
    .setKey(key)

  const databases = new Databases(client);

  // Gets the userId
  const user = await getLoggedInUser();
  const userId = user?.$id as string;

  const promise = await databases.listDocuments(
    database_id,
    collection_id,
    [
      Query.equal('user_id', [userId])
    ]
  )

  return promise;
}