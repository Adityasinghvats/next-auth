import {connect} from "@/config/dbconfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const {email, password} = reqBody;
        // console.log(reqBody);

        if(!email){
            return NextResponse.json(
                {error: "email not found"},
                {status: 500}
            )
        }
        if(!password){
            return NextResponse.json(
                {error: "password not found"},
                {status: 500}
            )
        }

        //if user already exists
        const user = await User.findOne({email})
        if(!user){
            return NextResponse.json(
                {error: "User doesn't exist"},
                {status: 500}
            )
        }

        //validate password
        const validPassword = await bcryptjs.compare(password, user.password)
        if(!validPassword){
            return NextResponse.json(
                {error: "Invalid password"},
                {status: 400}
            )
        }
        //create token data
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }
        //token
        const token = await jwt.sign(
            tokenData, 
            process.env.TOKEN_SECRET, 
            {expiresIn: "1d"}
        )

        const response = NextResponse.json({
            message: "Login successful",
            success: true
        })
        //set cookies
        response.cookies.set("token", token, {
            httpOnly: true
        })

        return response;

    } catch (error:any) {
        return NextResponse.json(
            {error: error.message},
            {status: 500}
        )
    }
}