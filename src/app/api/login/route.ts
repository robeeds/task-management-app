// app/api/login/route.ts

import { NextResponse } from 'next/server';
import { logInUser } from '@/lib/server/appwrite'; // Your login function

export async function POST(request: Request) {
  const data = await request.formData();
  const email = data.get('email') as string;
  const password = data.get('password') as string;

  const auth = await logInUser(email, password);

  if(auth == "Login Successful") {
    return NextResponse.json( { message: "Login Success" }, { status: 200 } );
  } else {
    return NextResponse.json( { error: "Invalid Credentials. Please try again." }, { status: 401 } );
  }
}