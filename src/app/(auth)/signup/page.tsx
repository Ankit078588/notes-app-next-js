import Signup from "@/components/auth/Signup";
import { getLoggedInUser } from "@/lib/auth";
import { redirect } from "next/navigation";



export default function LoginPage() {
    // check user is already logged in
    const user = getLoggedInUser();
    if(user) {
        redirect('/dashboard');
    }

    return <Signup />
}


