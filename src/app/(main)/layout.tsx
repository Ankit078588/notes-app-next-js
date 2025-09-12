import { getLoggedInUser } from "@/lib/auth";
import { redirect } from "next/navigation";



export default async function MainLayout({children}: Readonly<{children: React.ReactNode;}>) {
    const user = await getLoggedInUser();
    if(!user) redirect('/login');
    
    return children;
}