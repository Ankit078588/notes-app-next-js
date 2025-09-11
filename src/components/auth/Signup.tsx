"use client"
import axios, { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";


export default function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();


    async function handleSignup() {
        if(!name.trim() || !email.trim() || !password.trim() ) {
            return toast.error('All fields are required.')
        }

        try {
            setLoading(true);

            const res = await axios.post('/api/auth/signup', { name, email, password });
            toast.success(res.data.message);
            router.push('/login');    // navigate to login
        } catch(error: unknown) {
            const e = error as AxiosError<{success: boolean, message: string}>
            if(!e.response) { return toast.error(e.message) }
            if(e.response) { return toast.error(e.response?.data?.message) }
            toast.error('Something went wrong.')
        } finally {
            setLoading(false);
        }
    }

    
    return (
        <div className="flex w-screen h-[100vh] items-center justify-center bg-gradient-to-br from-blue-50 via-blue-50 to-blue-200">
            <div className="py-10 px-4 w-md rounded-md bg-white flex flex-col">
                <h1 className="text-center font-bold text-2xl mb-7">Signup Form</h1>

                <label htmlFor="" className="text-md">Name</label>
                <input className="border-1 border-gray-400 p-2 rounded mb-5" type="text" name="" id="" value={name} onChange={(e) => {setName(e.target.value)}} />

                <label htmlFor="" className="text-md">Email</label>
                <input className="border-1 border-gray-400 p-2 rounded mb-5" type="text" name="" id="" value={email} onChange={(e) => {setEmail(e.target.value)}}/>

                <label htmlFor="" className="text-md">Password</label>
                <input className="border-1 border-gray-400 p-2 rounded mb-7" type="text" name="" id="" value={password} onChange={(e) => {setPassword(e.target.value)}} />

                <button className="bg-blue-500 text-white rounded-md py-2 hover:bg-blue-700 cursor-pointer" onClick={handleSignup} disabled={loading}> 
                    {loading? "Loading..." : "Signup"} 
                </button>

                <p className="mt-4 text-sm text-center">Already have an account? 
                    <Link href='/login' className="text-blue-700 ml-2 hover:text-shadow-blue-900">Login</Link>
                </p>
            </div>
        </div>
    )
}
