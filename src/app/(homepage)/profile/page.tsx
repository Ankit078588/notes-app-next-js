import { getLoggedInUser } from "@/lib/auth";
import { redirect } from "next/navigation";
// import { NextResponse } from "next/server";


// Get all Todo
export default async function Profile() { 
    const user = await getLoggedInUser();     // null | user_object
    if(!user) {
        // return NextResponse.json({message: 'Unauthorized. Please login.'}, {status: 401})  --->  we can't do this from a server component. why ??
        // return NextResponse.redirect('http://localhost:3000/login');                       --->  we can't do this from a server component. why ??
        redirect('/login');
    }

    return <h1>About page!!</h1>
}




// Concept 01:
// - next.js humein ek method provide karta hai - named as - redirect()
// - import it from next/navigation, isko server-component se redirect karne ke liye use kiya jaata hai - redirect('/login');

// Concept 02: What to return from server-component ??
// - Explanation :
// - React component / react render pipeline ek React node expect karti hai (JSX).
// - So, humein component se JSX return karna chahiye.

// Concept 03:
// - Q.  We can't we return NextResponse.json() OR NextResponse.redirect() from server component bcoz : 
// - Hum ek NextResponse object return kar rahe hai, jo React tree ka part nahi hai.
// - Isliye Next.js bolega: “Arre, mujhe to React element chahiye, ye to raw HTTP Response aa gaya.”
// - Server Component ek UI render karta hai, usse tum raw Response object return nahi kar sakte.


// *********************** VVIP
// Concept 04: 
// - Humein to server-component se ReactNode element OR JSX return karna chahiye...Right.
//   Then, hum server-component se redirect() function kaise call kar sakte hain, its not a JSX.

// - Explanation:
// - Ab yaha pe Next.js ne ek hack (internal mechanism) introduce kiya:
// -     import { redirect } from "next/navigation";
//       if (!user) redirect("/login");
//
// ==> NOTE: 
//     - Ye function JSX return nahi karta. 
//     - Instead, ye ek special error throw karta hai — NEXT_REDIRECT.
//        1. Jab tum redirect('/login') call karte ho, ye turant ek error throw karti hai.
//        2. React render pipeline ye error ko catch karti hai aur bolti hai:
//           “Thik hai, is component ne mujhe UI nahi diya, lekin ek redirect signal diya.”
//        3. Fir Next.js us error ko HTTP redirect response (302/307 + Location header) me convert kar deta hai.
//
//     - Conclusion:
//       -> Normal case me JSX hi return karna chahiye.
//       -> Special case: 
//          → agar redirect() call hota hai 
//          → component actually JSX return hi nahi karta. Wo component ka execution wahi pe ruk jaata hai, error throw hoti hai, aur Next.js usse redirect response me convert kar deta hai.


