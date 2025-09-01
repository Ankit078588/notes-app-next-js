import { connectDB } from "@/lib/bd";
import { UserModel } from "@/models/user";
import { NextRequest, NextResponse } from "next/server";





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
        const isMatch = password === user.password;
        if(!isMatch) {
            return NextResponse.json({success: false, message: 'Incorrect credentials.'}, {status: 400});
        }

        // generate Token
        const token = 'abcdefgh';
        return NextResponse.json(
            {success: true, message: 'Login successful.', token}, 
            {status: 200}
        );
    } catch(e) {
        console.log(e);
        return NextResponse.json({success: false, message: 'Internal Server Error.'}, {status: 500});
    }
}












// export function GET(request: NextRequest) {
//     try {
//         console.log(request);
//         console.log('request rcvd');

//         return NextResponse.json({success: true, message: 'Data fetched'});
//     } catch(e) {
//         console.log(e);
//         return NextResponse.json({success: false, message: 'Internal server error'}, {status: 500});
//     }
// }
