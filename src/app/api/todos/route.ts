import { getLoggedInUser } from "@/lib/auth";
import { connectDB } from "@/lib/bd";
import { TodoModel } from "@/models/todoModel";
import { NextRequest, NextResponse } from "next/server";


// create new Todo
export async function POST(request: NextRequest) {
    try {
        await connectDB();
        const user = await getLoggedInUser();     // null | user_object
        if(!user) {
            return NextResponse.json({message: 'Unauthorized. Please login.'}, {status: 401})
        }

        // extract content from request
        const { content } = await request.json();
        if(!content) {
            return NextResponse.json({message: 'Content is required.'}, {status: 400})
        }

        // create new Todo in DB
        const newTodo = await TodoModel.create({
            userId: user._id,
            content: content
        })

        return NextResponse.json({success: true, message: 'Todo created.', todo: newTodo}, {status: 201})
    } catch(e) {
        console.log(e);
        return NextResponse.json({success: false, message: 'Internal Server Error.'}, {status: 500})
    }
}


// Get all Todo
export async function GET() {
    try {
        await connectDB();
        const user = await getLoggedInUser();     // null | user_object
        if(!user) {
            return NextResponse.json({message: 'Unauthorized. Please login.'}, {status: 401})
        }

        // find all Todo from DB
        const todos = await TodoModel.find({userId: user._id});

        return NextResponse.json({success: true, message: 'Todos fetched.', todos: todos}, {status: 200})
    } catch(e) {
        console.log(e);
        return NextResponse.json({success: false, message: 'Internal Server Error.'}, {status: 500})
    }
}






