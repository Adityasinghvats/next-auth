/* eslint-disable @typescript-eslint/no-explicit-any */
import {connect} from "@/config/dbconfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

connect()
export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json();
        const {email, newPassword} = reqBody;
        console.log(reqBody);
        if(!email){
            return NextResponse.json(
                {error: "email not found"},
                {status: 500}
            )
        }
        if(!newPassword){
            return NextResponse.json(
                {error: "password not found"},
                {status: 500}
            )
        }
        //check if user exists or not
        const user = await User.findOne({email})
        if(!user){
            return NextResponse.json(
                {error: "User doesnot exist"},
                {status: 404}
            )
        }
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(newPassword, salt);
    
        const updatedUser = await User.findOneAndUpdate(
            {email:email},
            {password:hashedPassword},
            {new : true}
        )
        
        if (!updatedUser) {
            return NextResponse.json(
                {error: "Failed to update password"},
                {status: 400}
            )
        }
        console.log(updatedUser)

        try {
            await sendEmail({email, emailType: "RESET", userId: updatedUser._id})
        } catch (emailError) {
            console.error("Email sending failed:", emailError);
            return NextResponse.json(
                {
                    message: "User updated but verification email failed",
                    success: true,
                    updatedUser
                },
                {status: 201}
            )
        }
        return NextResponse.json({
            message: "Password Reset successfully",
            success: true,
            updatedUser
        })
    } catch (error: any) {
        console.error("Resetpassword error:", error);
        return NextResponse.json(
            {error: error.message},
            {status: 500}
        )
    }
}