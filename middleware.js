import { NextResponse } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request) {
  // we want to do that someone has a token than he is not able to visit login and signup
  // similarlly if user is not having any token then profile is not accessable by him

  // say our public path are login and signup

  // and protected path are profile

  const path = request.nextUrl.pathname


  const isPublicPath = path === "/login" || path === "/signup"

  const token = request.cookies.get("token")?.value || ""

  if(isPublicPath && token){
    console.log("Acccessing login or signup not Allowed");
    return NextResponse.redirect(new URL("/",request.nextUrl))
  }

  if(!isPublicPath && !token){
    console.log("Acccessing user profile is not allowed !");
    return NextResponse.redirect(new URL("/login",request.nextUrl))
  }


}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/",
    "/user/:path*",
    "/login",
    "/signup",
  ]
}