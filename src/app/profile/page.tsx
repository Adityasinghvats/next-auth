/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import axios from "axios";
import toast, {Toaster} from "react-hot-toast";
import {useRouter} from "next/navigation";
import React from "react";
import Link from "next/link";

export default function Profile(){
    const router = useRouter();
    const [data, setData] = React.useState("nothing")

   const logout = async () => {
        try {
            await axios.get("/api/users/logout")
            toast.success("Logout successful")
            //make sure toast is visible before routing
            // Add a small delay to ensure toast is visible
            await new Promise(resolve => {
                setTimeout(() => {
                    toast.dismiss();
                    resolve(true);
                }, 800);
            });

            // Smooth transition to login page
            router.push("/login");

        } catch (error:any) {
            console.log(error.message)
            toast.error("Error while logging out")
        }
    }

    const getUserDetails = async ()=>{
        try {
            const res = await axios.get("/api/users/me")
            console.log(res.data)
            setData(res.data.user._id)
        } catch (error:any) {
            console.log(error.message)
            toast.error("Error while getting userdetails")
        }
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <div><Toaster
            position="top-center"
            /></div>
            <h1 className="bg-red-400 text-white m-2 p-4 rounded">Profile page</h1>
            <hr />
            
            <h2 className="p-3 rounded bg-green-500 ">{data === "nothing" ? "Nothing" : 
                <Link href={`/profile/${data}`}>{data}</Link>}
            </h2>
            <hr />
            <button
            className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={logout}
            >Logout</button>
            <button
            className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={getUserDetails}
            >UserDetails</button>
        </div>
    )
}