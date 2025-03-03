"use client"
import axios from "axios";
import Link from "next/link";
import React, {useEffect, useState} from "react";

export default function VerifyEmailPage(){
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    const verifyUserEmail = async() => {
        try {
            const response = await axios.post("/api/users/verifyemail", {token})
            setVerified(true)
        } catch (error:any) {
            setError(true)
            console.log(error.response.data)
        }
    }
    //when logged in user comes here the token is taken which is in 2nd part of url
    //and it is set in toekn, which udpate the state, which in turn make second usestate run
    useEffect(()=>{
        const urlToken = window.location.search.split("=")[1]
        setToken(urlToken || "")
    },[])

    useEffect(()=>{
        if(token.length>0){
            verifyUserEmail();
        }
    }, [token]);

    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl">Verify Email</h1>
            <h2 className="p-2 m-2 bg-orange-300 text-black text-2xl rounded-lg">{token ? `${token}`:"No token found"}</h2>
            {verified && (
                <div >
                    <h2 className="text-2xl">
                        Email Verified
                    </h2>
                    <Link href="/login">
                        Login
                    </Link>
                </div>
            )}
            {error && (
                <div >
                    <h2 className="text-2xl bg-red-500 text-gray-800">
                        Error
                    </h2>
                </div>
            )}
        </div>
    )
}