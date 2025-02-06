// middleware in next js, has to be made in root
import withAuth from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware() {
        return NextResponse.next()
    }, // middleware func will only invoke if callback returns TRUE
    {
        callbacks: {
            authorized: ({ token, req }) => {
                const { pathname } = req.nextUrl // console.log this, TODO
                //allow auth related route
                if (pathname.startsWith("/api/auth") || pathname === "/login" || pathname === "/register") {
                    return true
                }
                // Public
                if (pathname === "/" || pathname.startsWith("/api/videos")) {
                    return true
                }
                return !!token // flipper
            }
        }
    }
)

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico|public/).*)"], // matches all middlerware wehre this path is running
};
