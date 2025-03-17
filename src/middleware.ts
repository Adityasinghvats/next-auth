import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname
    //allowed to visit without token
    const isPublicPath = (path === '/login') || (path === '/signup') || (path === '/verifyemail') || (path==='/resetpassword') || (path==='/newpassword')
    //get token from user cookies 
    const token = request.cookies.get('token')?.value || ''
    if(isPublicPath && token){
        return NextResponse.redirect(new URL('/profile', request.nextUrl))
    }
    if(!isPublicPath && !token){
        return NextResponse.redirect(new URL('/login', request.nextUrl))
    }
}
export const config = {
  matcher: [
    '/',
    '/profile',
    '/singup',
    '/login',
    '/profile/:path*',
    '/verifyemail',
    '/resetpassword',
    '/newpassword'
  ]
}