import { createSessionClient, getLoggedInUser } from "@/lib/server/appwrite";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function logout() {
    "use server";

    const { account}  = await createSessionClient();

    const nextCookies = await cookies();
    nextCookies.delete("my-custom-session");
    await account.deleteSession("current");

    redirect("/");
}

export default async function Dashboard() {
    const user = await getLoggedInUser();
    if (!user) redirect('/login');

    return(
        <div>
           <p>Dashboard: Logged in as {user.name}</p>
            <button onClick={logout}
            >Logout</button>
        </div>
    )
}