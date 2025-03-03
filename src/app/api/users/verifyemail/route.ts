/* eslint-disable @typescript-eslint/no-explicit-any */
import {connect} from "@/config/dbconfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
connect()
export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const {token} = reqBody;
        console.log(reqBody.token);

        if(!token){
            return NextResponse.json(
                {error: "token not found"},
                {status: 500}
            )
        }
        //find user with token and expiry time greater than current time
        const user = await User.findOne({
            verifyToken: token,
            verifyTokenExpiry: {$gt: Date.now()}
        })
        if(!user){
            return NextResponse.json(
                {error: "Invalid token"},
                {status: 500}
            )
        }
        user.isVerified = true;
        //flush out token and time data
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        await user.save();
        return NextResponse.json(
            {message: "Email verified successfully", success: true},
            {status: 200}
        )
    } catch (error:any) {
        return NextResponse.json(
            {error: error.message},
            {status: 500}
        )
    }
}