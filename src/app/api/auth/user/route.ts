import { getLoggedInUser } from "@/lib/auth";
import { connectDB } from "@/lib/bd";
import { NextResponse } from "next/server";


export async function GET() {
    try {
        await connectDB();

        const user = await getLoggedInUser();
        if(!user) {
            return NextResponse.json({message: 'Unauthorized. Please Login.'}, {status: 401});
        }
        
        return NextResponse.json(
            {success: true, message: 'User details fetched.', user}, 
            {status: 200}
        );
    } catch(e) {
        console.log(e);
        return NextResponse.json({success: false, message: 'Internal Server Error.'}, {status: 500})
    }
}

