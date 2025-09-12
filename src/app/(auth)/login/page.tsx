import Login from "@/components/auth/Login"
import { getLoggedInUser } from "@/lib/auth"
import { redirect } from "next/navigation";




export default async function LoginPage() {
    const user = await getLoggedInUser();

    if(!user) {
        return <Login />
    }

    redirect('/dashboard');
}


