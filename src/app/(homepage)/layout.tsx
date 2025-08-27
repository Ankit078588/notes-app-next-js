import Navbar from "@/components/Navbar";



export default function HomepageLayout({children} : Readonly<{children: React.ReactNode;}>) {

    return (
        <div>
            <Navbar />
            {children}
        </div>
    )
}

