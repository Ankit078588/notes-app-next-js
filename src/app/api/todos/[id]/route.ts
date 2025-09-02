import { connectDB } from "@/lib/bd";
import { TodoModel } from "@/models/todoModel";
import { UserModel } from "@/models/userModel";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";


// delete Todo
export async function DELETE(request: NextRequest, context: {params: Promise<{id: string}>}) {
    try {
        await connectDB();

        // extract userId from cookie + find user with userId
        const cookieStore = await cookies();
        const userId = cookieStore.get('userId')?.value;
        const user = await UserModel.findOne({_id: userId});
        if(!userId || !user) {
            return NextResponse.json({message: 'Unauthorized. Please login.'}, {status: 401})
        }

        // extract todo id
        const { id } = await context.params;

        // Check if Todo exists in DB or NOT
        const deletedTodo = await TodoModel.deleteOne({
            userId: user._id,
            _id: id
        })

        if(!deletedTodo) { return NextResponse.json({message: 'Invalid Todo'}, {status: 200}) }

        return NextResponse.json({success: true, message: 'Todo deleted.', deletedTodo}, {status: 200})
    } catch(e) {
        console.log(e);
        return NextResponse.json({success: false, message: 'Internal Server Error.'}, {status: 500})
    }
}






// export async function GET(request: NextRequest, context: {params: Promise<{id: string}>} ) {
//     // const { id } = await params;
//     const { id } = await context.params;

//     const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
//     const todo = await res.json();
//     return NextResponse.json({success: true, todo: todo});
// }

