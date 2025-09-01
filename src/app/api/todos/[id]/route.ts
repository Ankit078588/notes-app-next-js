import { NextRequest, NextResponse } from "next/server";


console.log('Running line 1');
console.log('Running line 2');


export async function GET(request: NextRequest, context: {params: Promise<{id: string}>} ) {
    // const { id } = await params;
    const { id } = await context.params;
    console.log('Running line 3');

    const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
    const todo = await res.json();

    return NextResponse.json({success: true, todo: todo});
}


console.log('Running line 4');

