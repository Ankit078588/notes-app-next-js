import Signup from "@/components/auth/Signup";
import { getLoggedInUser } from "@/lib/auth";
import { redirect } from "next/navigation";



export default async function SignupPage() {
    const user = await getLoggedInUser();

    if(!user) {
        return <Signup />
    }

    redirect('/dashboard');
}


