'use client'
import { useState } from "react";
import axios, { AxiosError } from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";



export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    
    async function handleLogin() {
        if(!email.trim() || !password.trim()) {
            return toast.error('All fields are required.');
        }

        try {
            setLoading(true);
            const res = await axios.post('/api/auth/login', {email, password});
            toast.success(res.data.message);
            router.push('/dashboard');
        } catch(error: unknown) {
            const axiosError = error as AxiosError<{success: false, message: string}>

            if(!axiosError.response) { return toast.error(axiosError.message) }
            if(axiosError.response) { return toast.error(axiosError.response?.data?.message) }
            toast.error('Something went wrong.')
        } finally {
            setLoading(false);
        }
    }

    
    return (
        <div className="flex w-screen h-[100vh] items-center justify-center bg-gradient-to-br from-blue-50 via-blue-50 to-blue-200">
            <div className="py-10 px-4 w-md rounded-md bg-white flex flex-col">
                <h1 className="text-center font-bold text-2xl mb-7">Login Form</h1>

                <label htmlFor="" className="text-md">Email</label>
                <input className="border-1 border-gray-400 p-2 rounded mb-5" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />

                <label htmlFor="" className="text-md">Password</label>
                <input className="border-1 border-gray-400 p-2 rounded mb-7" type="text" value={password} onChange={(e) => setPassword(e.target.value)}  />

                <button className="bg-blue-500 text-white rounded-md py-2 hover:bg-blue-700 cursor-pointer" onClick={handleLogin}>
                    { loading? "Loading..." : "Login" }
                </button>

                <p className="mt-4 text-sm text-center">Dont have an account? 
                    <Link href='/signup' className="text-blue-700 ml-2 hover:text-shadow-blue-900">Signup</Link>
                </p>
            </div>
        </div>
    )
}


