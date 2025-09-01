import { NextResponse } from "next/server";

console.log('Running 2nd route.ts - 1');
export async function GET() {
    const res = await fetch('https://jsonplaceholder.typicode.com/todos');
    const todos = await res.json();
    console.log('Running 2nd route.ts - 2');


    return NextResponse.json({success: true, message: 'All todos fetched.', todos: todos})
}



console.log('Running 2nd route.ts - 3');
