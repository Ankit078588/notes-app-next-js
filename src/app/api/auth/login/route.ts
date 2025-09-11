import { connectDB } from "@/lib/bd";
import { UserModel } from "@/models/userModel";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { SessionModel } from "@/models/sessionModel";





export async function POST(request: NextRequest) {
    try {
        await connectDB();

        // parse body data
        const { email, password } = await request.json();
        if(!email || !password) {
            return NextResponse.json({success: false, message: 'All fields are required.'}, {status: 400});
        }

        // check if user exists or not
        const user = await UserModel.findOne({email});
        if(!user) {
            return NextResponse.json({success: false, message: 'Incorrect credentials.'}, {status: 400});
        }

        // check password is correct OR not
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) {
            return NextResponse.json({success: false, message: 'Incorrect credentials.'}, {status: 400});
        }

        // delete previous session
        const activeSession = await SessionModel.findOne({userId: user._id});
        if(activeSession) {
            await SessionModel.deleteOne({userId: user._id});
        }

        // create new session 
        const newSession = await SessionModel.create( {userId: user._id} );

        // generate Token
        const token = jwt.sign({_id: newSession._id}, process.env.JWT_SECRET as string);
        
        // set token in cookie
        const cookieStore = await cookies();
        cookieStore.set('token', token, {
            httpOnly: true,
            maxAge: 30*24*60*60
        });
        
        // send response
        return NextResponse.json(
            {success: true, message: 'Login successful.'}, 
            {status: 200}
        );
    } catch(e) {
        console.log(e);
        return NextResponse.json({success: false, message: 'Internal Server Error.'}, {status: 500});
    }
}

