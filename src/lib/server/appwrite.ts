"use server";
import { Client, Account, AppwriteException } from "node-appwrite";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// Environmental Variables
const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
const project = process.env.NEXT_PUBLIC_APPWRITE_PROJECT;
const key = process.env.NEXT_APPWRITE_KEY;

// Creates end user session client
export async function createSessionClient() {
  if (!endpoint) {
      throw new Error('Endpoint not defined');
  }

  if (!project) {
      throw new Error('Project not defined')
  }

  const client = new Client()
    .setEndpoint(endpoint)
    .setProject(project);

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
        throw new Error('Endpoint not defined');
    }

    if (!project) {
        throw new Error('Project not defined')
    }

    if (!key) {
        throw new Error('Key not defined')
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
    return null;
  }
}

// Log in the user
export async function logInUser(email: string, password: string) {
  'use server';

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

export async function logOutUser() {
  const { account}  = await createSessionClient();

  const nextCookies = await cookies();
  nextCookies.delete("user-session");
  await account.deleteSession("current");
  redirect('/login');

  return "Logout Successful";
}