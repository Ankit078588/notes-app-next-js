import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";
import { UserModel } from "@/models/userModel";
import { SessionModel } from "@/models/sessionModel";




export async function getLoggedInUser() {
    try {
        // const UnauthorizedResponse = NextResponse.json({message: 'Unauthorized. Please Login.'}, {status: 401});

        const cookieStore = await cookies();
        const token = cookieStore.get('token')?.value;
        if(!token) return null;


        // verify token
        const payload = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
        if(!payload) return null;


        // extact sessionId from token + find session
        const sessionId = payload._id;
        const session = await SessionModel.findById(sessionId);
        if(!session) return null;


        // find user using session details
        const userId = session.userId;
        const user = await UserModel.findById(userId);
        if(!user) return null;

        return user;
    } catch(e) {
        console.log('Error finding loggedin User: ', e);
        return null;
    }
}