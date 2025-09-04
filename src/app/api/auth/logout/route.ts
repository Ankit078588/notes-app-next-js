import { connectDB } from "@/lib/bd";
import { SessionModel } from "@/models/sessionModel";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";


export async function POST() {
    try {
        await connectDB();

        const cookieStore = await cookies();
        const token = cookieStore.get('token')?.value;
        if(!token) {
            return NextResponse.json({message: 'Unauthorized.'}, {status: 401});
        }

        // verify token
        const payload = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
        if(!payload) {
            return NextResponse.json({message: 'Unauthorized.'}, {status: 401});
        }

        // extact sessionId from token + find session
        const sessionId = payload._id;
        await SessionModel.findOneAndDelete(sessionId);

        // delete cookie
        cookieStore.delete('token');
        
        return NextResponse.json(
            {success: true, message: 'Logged out successfully.'}, 
            {status: 200}
        );
    } catch(e) {
        console.log(e);
        return NextResponse.json({success: false, message: 'Internal Server Error.'}, {status: 500})
    }
}

