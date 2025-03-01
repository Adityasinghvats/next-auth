"use client";
import Link from "next/link";
import React, { use } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function LoginPage(){
    const router = useRouter();
    const [user, setUser] = React.useState({
        email:"",
        password:"",
    })
    const [buttonDisabled, setButtonDisabled] = React.useState(true);
    const [loading, setLoading] = React.useState(false)

    const onLogin = async() => {
      try {
        setLoading(true)
        const response = await axios.post("/api/users/login", user);
        console.log("Login success", response.data);
        toast.success("Login")
        router.push("/profile")

      } catch (error:any) {
        console.log("Login failed", error.message);
        toast.error(error.message);
      }finally{
        setLoading(false)
      }
    }

    React.useEffect(() => {
      if(user.email.length>0 && user.password.length>0){
        setButtonDisabled(false)
      }else{
        setButtonDisabled(true)
      }
    }, [user])
    return(
      <div className="flex items-center justify-center max-h-screen py-2">
        <div className="flex flex-col items-center justify-center max-h-max m-4 bg-gray-700 rounded-lg p-10">
        <h1 className="mb-5 font-thin text-3xl">{loading ?"Processing":"Login"}</h1>
        <hr />
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
        onClick={onLogin}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">
          Login here
        </button>
        <Link href="/signup">Visit Singup Page</Link>
 
        </div>
      </div>  
    )
}