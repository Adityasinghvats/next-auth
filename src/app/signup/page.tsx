/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, {Toaster} from "react-hot-toast";

export default function LoginPage(){
    const router = useRouter();
    const [user, setUser] = React.useState({
        email:"",
        password:"",
        username:""
    })
    const [buttonDisabled, setButtonDisabled] = React.useState(true);

    const [loading, setLoading] = React.useState(false)
    const onSignup = async() => {
      try {
        setLoading(true)
        const response = await axios.post("/api/users/signup", user);
        console.log("Signup success", response.data);
        toast.success("Signup successful! Redirecting to login...", {
          duration: 2000
        });
        
        setTimeout(() => {
          router.push("/login")
        }, 2000);
      } catch (error:any) {
        console.log("Signup failed", error.message);
        toast.error(error.response?.data?.error || "Error while signing up", {
          duration: 3000
        });
      } finally {
        setLoading(false)
      }
    }
    //button state show or hide
    React.useEffect(()=>{
      if(user.email.length>0 &&user.password.length>0 && user.username.length>0){
        setButtonDisabled(false);
      } else{
        setButtonDisabled(true)
      }
    }, [user])
    return(
      <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center justify-center max-h-max w-126 m-4 bg-gray-700 rounded-lg p-10">
        <h1 className="mb-5 font-thin text-3xl">{loading ?"Processing": "SignUp"}</h1>
        <hr />
        <label htmlFor="username" className="pb-2">username</label>
        <input
        className="p-2 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        type="text"
        id="username"
        value={user.username}
        onChange={(e) => setUser({...user, username: e.target.value})}
        placeholder="username"
        />
        <label htmlFor="email" className="pb-2">email</label>
        <input
        className="p-2 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        type="text"
        id="email"
        value={user.email}
        onChange={(e) => setUser({...user, email: e.target.value})}
        placeholder="email"
        />
        <label htmlFor="password" className="pb-2">password</label>
        <input
        className="p-2 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        type="text"
        id="password"
        value={user.password}
        onChange={(e) => setUser({...user, password: e.target.value})}
        placeholder="password"
        />
        <button 
        onClick={onSignup}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">
          {buttonDisabled ? "Enter credentials 🤨" : "Signup here"}
        </button>
        <Link href="/login">Visit Login Page</Link>
        </div>
      </div> 
      </> 
    )
}