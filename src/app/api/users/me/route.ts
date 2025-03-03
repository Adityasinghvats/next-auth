import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import {connect} from "@/config/dbconfig";
connect()
export async function GET(request:NextRequest){
    try {
        const userID = await getDataFromToken(request);
        const user = await User.findById(userID).select("-password")
        // if first one give problem User.findOne({_id: userID})
        if(!user){
            return NextResponse.json(
                {error: "user not found"},
                {status: 500}
            )
        }
        return NextResponse.json({
            message: "User found",
            user: user
        })
    } catch (error:any) {
        return NextResponse.json(
            {error: error.message},
            {status:500}
        )
    }
}