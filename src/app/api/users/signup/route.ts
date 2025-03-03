import {connect} from "@/config/dbconfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";
connect()
export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const {username, email, password} = reqBody
        console.log(reqBody)
        if(!username){
            return NextResponse.json(
                {error: "username not found"},
                {status: 500}
            )
        }
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
        if(user){
            return NextResponse.json(
                {error: "User already exists"},
                {status: 500}
            )
        }
        //hash password
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt);

        //create user
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        //save to db
        const savedUser = await newUser.save()
        console.log(savedUser);
        try {
            //send verification email
            await sendEmail({email, emailType: "VERIFY", userId: savedUser._id})
        } catch (emailError) {
            console.error("Email sending failed:", emailError);
            // User is created but email failed
            return NextResponse.json(
                {
                    message: "User created but verification email failed",
                    success: true,
                    savedUser
                },
                {status: 201}
            )
        }
        return NextResponse.json({
                message: "User created successfully",
                success: true,
                savedUser
            })
    } catch (error: any) {
        console.error("Signup error:", error);
        return NextResponse.json(
            {error: error.message},
            {status: 500}
        )
    }
}
/*
To follow a standard api approcah we will use api/user/
and all the functionality will depend on type of http header
GET, POST, PUT, PATCH , instead of using getUser, create user 
 */