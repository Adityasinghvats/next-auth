"use client";
import axios from "axios";
import Link from "next/link";
import toast, {Toaster} from "react-hot-toast";
import {useRouter} from "next/navigation";

export default function Profile(){
    const router = useRouter();
   const logout = async () => {
        try {
            await axios.get("/api/users/logout")
            toast.success("Logout successful")
            //make sure toast is visible before routing
            setTimeout(() => {
                toast.dismiss()
            }, 500)
              setTimeout(() => {
                router.push("/login")
            }, 1000)

        } catch (error:any) {
            console.log(error.message)
            toast.error("Error while logging out")
        }
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <div><Toaster
            position="top-center"
            /></div>
            <h1>Profile</h1>
            <hr />
            <p>Profile page</p>
            <hr />
            <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={logout}
            >Logout</button>
        </div>
    )
}