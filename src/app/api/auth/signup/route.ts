import { connectDB } from "@/lib/bd";
import { UserModel } from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";



export async function POST(request: NextRequest) {
    try {
        await connectDB();

        // extract input data
        const { name, email, password } = await request.json();
        if(!name || !email || !password) {
            return NextResponse.json({success: false, message: 'All fields are required.'}, {status: 400})
        }

        // check if email is already registered
        const user = await UserModel.findOne({email});
        if(user) {
            return NextResponse.json({success: false, message: 'Email is already registered.'}, {status: 400})
        }

        // hash password + create new User in DB
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = await UserModel.create({name, email, password: hashedPassword});

        // Send response
        return NextResponse.json(
            {success: true, message: 'Signup successful.', newUser: newUser}, 
            {status: 200}
        );
    } catch(e) {
        console.log(e);
        return NextResponse.json({success: false, message: 'Internal Server Error.'}, {status: 500})
    }
}


