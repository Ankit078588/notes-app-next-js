import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";



export default async function middleware(request: NextRequest) {
    // extract token
    // const token = request.cookies.get('token')?.value;
    // if(!token) {
        // return NextResponse.redirect(new URL('/login', request.nextUrl.origin));
    // }

    // verify token
    // const payload = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
    // console.log(payload);
}



export const config = {
    matcher: ['/api/todos/:path*']
}




// ===================================================================================
// Part 1: Middleware

// export const config = {
//     // matcher: "/login"                    --> This will work for a single route
//     // matcher: ['/login', '/signup']    // --> This will work multiple routes
//     // matcher: ['/api/:path*']             --> This will work for all the /api/* requests.
// }

// 2. ----------------------
// return NextResponse.redirect('/login');  
// - we can't provide only route. Res.redirect() method takes full URL string OR the URL object.
// - BUT, it's complex for devs to provide full URL manually. That's why we use it like this:

// - Firstly, understand: new URL(url, base) 
//     ==> new URL() is a contructor fxn that takes 2 i/p - (route + base_url) - and returns back an URL object.
//     ==> new URL('/login', 'http://localhost:3000');  - returns an object

// URL {origin: 'http://localhost:3000', protocol: 'http:', username: '', password: '', host: 'localhost:3000', …}
//     {
//        hash: ""
//        host: "localhost:3000"
//        hostname: "localhost"
//        href: "http://localhost:3000/home"
//        origin: "http://localhost:3000"
//        password: ""
//        pathname: "/home"
//        port: "3000"
//        protocol: "http:"
//        search: ""
//        searchParams: URLSearchParams {size: 0}
//        username: ""
//     }

// - So,   new URL('/login', 'http://localhost:3000').origin      ---> Gives the BASE_URL - http://localhost:3000
// - Also, new URL('/login', 'http://localhost:3000').toString()  ---> Gives the BASE_URL - http://localhost:3000

// Conclusion :
// 1. Inside Response.redirect() 
//    - we can either pass hardcoded BASE_URL :-  Response.redirect('http://loacalhost:3000/login')
//    - Problem, in dev & prod, change URL again & again. OR maintain a env variable.

// 2. option 2
//    - Inside Response.redirect() - don't hardcode BASE_URL - instead extract BASE_URL from request.
//    - Wrong approach:  Response.redirect('http://loacalhost:3000' + '/login')
//    - Right approach:  Response.redirect( request.nextUrl.origin + '/login')             OR
//                       Response.redirect( new URL('/login', request.nextUrl.origin) )    URL object










// ===================================================================================
// Part 2: NextResponse
// --------------------
// ===> Understanding NextResponse
//    - Response object is provided by JS, through which we send response.
//    - BUT, next.js provides us NextResponse object, this object is the extension of Response object, 
//      in the NextResponse object, we get some extra methods like:
//      i) next       --> NextResponse.next()
//      ii) rewrite   --> NextResponse.rewrite()
//    If request comes on /home api & we return response like this:
//    ->  return NextResponse.rewrite('/dashboard')  ---> route in URL bar: /home hi rahega, BUT /home pe /dashboard ka content server hoga.


// ===> Agar humara page server comp. ho toh, toh humein middleware ki jaroorat nahi parti.
//      Hum server comp. pe hi cookies se token access kar ke user find kar lete, if token not present - toh redirect kar doo to /login page.
//      - BUT, How to redirect from server-component ??
//      - Option-1) if(!token) return Response.redirect('/login');  --> wrong approach
//      - Option-2) import { redirect } from "next/navigation";     --> right approach
//                  if(!token) redirect('/login');
//  Q. ye redirect jo maine import kiya hai in option-2, kya wo same hi hai as Response.redirect() OR ye kuch aur hai... ?


// Get all Todo : server-component
// export default async function Profile() { 
//    const user = await getLoggedInUser();     // null | user_object
//    if(!user) {
//        // return NextResponse.json({message: 'Unauthorized. Please login.'}, {status: 401})  --->  we can't do this from a server component. why ??
//        // return NextResponse.redirect('http://localhost:3000/login');                       --->  we can't do this from a server component. why ??
//        redirect('/login');
//  }
//    return <h1>About page!!</h1>
// }


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


// Concept 04:     *********************** VVIP
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
// ==> Conclusion:
//       -> Normal case me JSX hi return karna chahiye.
//       -> Special case: 
//          → agar redirect() call hota hai 
//          → component actually JSX return hi nahi karta. Wo component ka execution wahi pe ruk jaata hai, error throw hoti hai, aur Next.js usse redirect response me convert kar deta hai.

















// ===================================================================================
// Part 3: Edge Servers
// - If in middleware, we import & use 'fs' module, it gives an error.
// - Error :-  The Edge runtime doesn't support Node.js 'fs' module.
// Let's understand, why this error comes ??


// Concept 01:
// ==> Let's understand Edge Server & Edge computing....
// When deploy next.js app on vercel,
// - vercel humare app ko ek server pe Deploy karta hai
// - And humare middleware wale part ko multiple Edge Server ke upar deploy karta hai.
//       Edge Server:-  Multiple servers present hote hain in Every location :- India, US, China, Singapore.....
//                      Iss server ko hum edge server bolte hain.


// Concept 02:
// ==> Why Edge server is Lightweight ??
//    Reason 1: 
//        - And vercel middleware fxn ko issi Edge server(multiple server) pe deploy karta hai, so that middleware fast rahe.
//        - And Edge pe humara code fast execute/run ho isliye, Edge server pe light environment rakha jaata hai.
//        - Node js has multiple API's + features, BUT on Edge server..... Node.js ka pura environment available nahi hota hai, to make Edge Server Lightweight.
//        - available API's on Edge server:-  Basic JS runtime + JS Browser based APi's
//    Reason 2:
//        - Edge server pe yadi koi req aayi, it processes requests, send response & finally ab Edge server stop ho jaata h.
//        - Jab new request aayega, then Edge Server Restarts & then processes requests.
//        - Edge server multiple time Start + sleep hota hai.......and that's why iska environment ko light-weigth rakha gaya hai, so that ye jaldi start ho jaaye.


// Concept 03: 
// ==> Edge runtime v/s Node.js
//   - Node.js ko start karne mein jyada time lagta hai.... bcoz node.js is a big runtime. It takes more time to start.
//   - BUT, vercel took the V8 engine & and created a new lightweight runtime(compared to node.js) - And this runtime is called as Edge runtime. And this  Edge runtime is used on Edge-server.
//   - And that's why we see error -  The Edge runtime doesn't support Node.js 'fs' module.


// Concept 04: 
// ==> Next.js has two server runtimes you can use in your application:
//   i)  The Node.js Runtime (default), :- which has access to all Node.js APIs and is used for rendering your application.
//   ii) The Edge Runtime :-  which contains a more limited set of APIs, used in Middleware.
//                - The Edge Runtime does not support all Node.js APIs. Some packages may not work as expected.
//                - The Edge Runtime does not support Incremental Static Regeneration (ISR).
//                - Both runtimes can support streaming depending on your deployment adapter.
//   
// middleware - runs on Edge runtime
// rendering - on Node.js Runtime
//           - if we want, hum isko change bhi kar sakte hain.....then rendering will also happen on Edge runtime.
//           - in about/page.ts - use this :----   export const runtime = "edge"  ---> now, in this page we can't use 'fs' module, since this will run on Edge runtime.
//
// Edge function:
// - Aisa code jo edge pe run ho, usko edge function bolte hain.
// - Yadi hum kisi page ka runtime 'edge' set kar dete hain, then iss page ke code ko edge function bolte hain.
