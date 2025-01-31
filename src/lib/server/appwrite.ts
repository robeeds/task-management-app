"use server";

import { Client, Account, ID, AppwriteException } from "node-appwrite";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

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
    await sendVerifyEmail();
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

  {/*
  const promise = account.updateVerification(userId, secret);

  promise.then(function (response) {
    console.log("appwrite.ts Successfully verified user", response);
  }, function (error) {
    if (error instanceof AppwriteException){
      console.log("Appwrite.ts", error.message, error.code)
    } else {
      console.log("appwrite.ts Failed to verify user", error);
    }
  })
  */}
}

// gets the verification status of the current user
export async function getEmailVerificationStatus() {
  const { account } = await createSessionClient();
  const user = await account.get();

  // account.emailverification returns boolean
  const verificationStatus = user.emailVerification;
  return verificationStatus;
}