import Link from "next/link";


export default function Navbar() {
    

    return (
        <div className="flex justify-between items-center p-4 bg-blue-100">
            <div>
                <h1>LOGO</h1>
            </div>

            <div className="flex gap-2">
                <Link href='/' className="py-2 px-4 bg-slate-800 text-white rounded">Home</Link>
                <Link href='/about' className="py-2 px-4  bg-slate-800 text-white rounded">About us</Link>
                <Link href='/contact' className="py-2 px-4  bg-slate-800 text-white rounded">Contact us</Link>
                <Link href='/login' className="py-2 px-4  bg-slate-800 text-white rounded-lg">Login / Signup</Link>
            </div>
        </div>
    )
}

