/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import Link from "next/link";
import React from "react";
import axios from "axios";
import toast, {Toaster} from "react-hot-toast";

export default function ResetPasswordPage(){
    const [user, setUser] = React.useState({
        email:"",
        newPassword:""
    })
    const [buttonDisabled, setButtonDisabled] = React.useState(true);
    const [loading, setLoading] = React.useState(false)
    const onResetPassword = async() => {
        try{
            setLoading(true)
            const response = await axios.post("/api/users/newpassword", user)
            console.log("Login success", response.data);
            
            toast.success("Password reset successful! Verify reset using mail...", {
                duration: 2000
              });
        }catch(error:any){
            console.log("Cannot reset password", error.message);
        }finally{
            setLoading(false)
        }
    }
    React.useEffect(() => {
        if(user.email.length>0 && user.newPassword.length>0){
            setButtonDisabled(false)
        }else{
            setButtonDisabled(true)
        }
    }, [user])
    return(
        <>
        <Toaster 
                position="top-center" 
                reverseOrder={false}
                toastOptions={{
                  className: '',
                  style: {
                    border: '1px solid #713200',
                    padding: '16px',
                  },
                }}
              />
        <div className="flex items-center justify-center max-h-screen py-14">
            <div className="flex flex-col items-center justify-center max-h-max m-4 bg-gray-700 rounded-lg p-10">
                <h1 className="mb-5 font-thin text-3xl">{loading? "Wait a moment":"Reset password"}</h1>
                <hr />
                <label htmlFor="email" className="pb-2">email</label>
                <input 
                className="p-2 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                type="text" 
                id="email"
                value={user.email}
                onChange={(e)=> setUser({...user, email: e.target.value})}
                placeholder="email"
                />
                <label htmlFor="email" className="pb-2">newpassword</label>
                <input 
                className="p-2 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                type="text" 
                id="email"
                value={user.newPassword}
                onChange={(e)=> setUser({...user, newPassword: e.target.value})}
                placeholder="newpassword"
                />
                <button
                onClick={onResetPassword}
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                >
                    {buttonDisabled ? "Enter credentials 🤨":"Reset password"}
                </button>
                <Link href="/login">Visit Login Page</Link>
            </div>
        </div>
        </>
    )
}