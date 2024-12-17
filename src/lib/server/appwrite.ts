"use server";

import { Client, Account, ID, AppwriteException } from "node-appwrite";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// Environmental Variables
const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string;
const project = process.env.NEXT_PUBLIC_APPWRITE_PROJECT as string;
const key = process.env.NEXT_APPWRITE_KEY as string;

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
export async function verifyEmail() {
  const { account } = await createSessionClient();

  // Uses userId and secret params
  const promise = account.createVerification('https://taskman-tau.vercel.app/dashboard');

  console.log("appwrite.ts", promise)

  promise.then(function (response) {
    console.log("Success!", response);
  }, function (error) {
    console.log("Failure", error);
  })
}

// Updates the verification status of the user
export async function updateVerifyStatus() {

  const { account } = await createSessionClient();

  const urlParams = new URLSearchParams(window.location.search);
  const secret = urlParams.get('secret') as string;
  const userID = urlParams.get('userId') as string;

  const promise = account.updateVerification(userID, secret);

  promise.then(function (response) {
    console.log("appwrite.ts Successfully verified user", response);
  }, function (error) {
    console.log("appwrite.ts Failed to verify user", error);
  })
}