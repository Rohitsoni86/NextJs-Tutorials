"use client"

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function VerifyEmailPage() {

    const[token,setToken] = useState("")
    const[verified,setVerified] = useState(false)
    const[error,setError] = useState(false)

    const verifyUserEmail = async () => {
        try {
            await axios.post('/api/verifyemail', {token})
            setVerified(true);
            toast.success("Email Verified !!")
        } catch (error) {
            setError(true);
            console.log(error.reponse.data);
            toast.error("Email Not Verified !!")
            
        }

    }

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        console.log(urlToken);
        setToken(urlToken || "");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    useEffect(() => {
        if(token.length > 0) {
            verifyUserEmail();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);


    return (
        <>
            <div className="flex items-center justify-center min-h-screen p-5 bg-blue-100 min-w-screen">
                <div className="max-w-xl p-8 text-center text-gray-800 bg-white shadow-xl lg:max-w-3xl rounded-3xl lg:p-12">
                    <h3 className="text-2xl">Thanks for signing up for Learn NextJS!</h3>
                    <div className="flex justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-24 h-24 text-green-400" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"
                                d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76" />
                        </svg>
                    </div>

                    {verified ? 
                       (<><p
                       className="text-green-500"
                       >We're happy you're here. Your Account is verified Successfully !</p>
                        <div className="mt-4">
                        <Link href="/login" className="px-4 hover:bg-blue-700 py-2 text-white bg-blue-600 rounded">Click to Login</Link>
                    </div></>) 
                    :
                    (<><p className="text-red-700">We're happy you're here. Something Went Wrong Please reach out use with email rohitsupport@email.com !</p>
                      <div className="mt-4">
                        <Link href="/login" className="px-4 hover:bg-red-700 py-2 text-white bg-red-600 rounded">Click to Contact</Link>
                    </div></>)
                      
                    }
                    
                   
                    
                </div>
            </div>

        </>
    )
}
