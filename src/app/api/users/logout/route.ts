import { NextResponse } from "next/server";
export async function GET() {
    try {
        const response = NextResponse.json(
            {
                message: "Logout successful",
                success: true
            }
        )
        //set options for cookies
        //empty token
        //expiry set to immediately
        response.cookies.set(
            "token", 
            "",
            {httpOnly: true, expires: new Date(0)} 
        )
        return response;
    } catch (error:any) {
        return NextResponse.json(
            {error: error.message},
            {status: 500}
        )
    }
}

/*
We will perform logout by simply clearing out the token
from the local storage. We will also redirect the user
to the login page after the logout is successful.
 */