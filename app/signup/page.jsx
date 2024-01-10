"use client"
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import { DNA } from 'react-loader-spinner';


export default function SignupPage() {
    const router = useRouter();
    const [userRegData, setUserRegData] = useState({
        username: "",
        email: "",
        password: "",
    })

    const [loading, setLoading] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            setLoading(true);
            console.log(userRegData);

            const response = await axios.post("/api/signup", userRegData);
            console.log("Signup success", response.data);
            router.push("/login");

        } catch (error) {
            console.log("Signup failed", error.message);

            toast.error(error.message);
        } finally {
            setLoading(false);
        }


    }
    return (
        <>
            <div className="relative flex flex-col justify-center bg-blue-200 min-h-screen overflow-hidden">
               {loading ? 
               <div
               className="flex h-screen w-screen justify-center items-center"
               ><DNA
               visible={true}
               height="90"
               width="90"
               ariaLabel="dna-loading"
               wrapperStyle={{}}
               wrapperClass="dna-wrapper"
           /></div>
               :  <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
                    <h1 className="text-3xl font-semibold text-center text-purple-700 ">
                        Create Your Account
                    </h1>
                    <form className="mt-6" onSubmit={handleSubmit}>
                        <div className="mb-2">
                            <label
                                htmlFor="username"
                                className="block text-sm font-semibold text-gray-800"
                            >
                                UserName
                            </label>
                            <input
                                value={userRegData.username}
                                onChange={(e) => setUserRegData({ ...userRegData, username: e.target.value })}
                                type="text"
                                id="username"
                                name="username"
                                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            />
                        </div>
                        <div className="mb-2">
                            <label
                                htmlFor="email"
                                className="block text-sm font-semibold text-gray-800"
                            >
                                Email
                            </label>
                            <input
                                value={userRegData.email}
                                onChange={(e) => setUserRegData({ ...userRegData, email: e.target.value })}
                                type="email"
                                id="email"
                                name="email"
                                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            />
                        </div>
                        <div className="mb-2">
                            <label
                                htmlFor="password"
                                className="block text-sm font-semibold text-gray-800"
                            >
                                Password
                            </label>
                            <input
                                value={userRegData.password}
                                onChange={(e) => setUserRegData({ ...userRegData, password: e.target.value })}
                                type="password"
                                id="password"
                                name="password"
                                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            />
                        </div>
                        <a
                            href="#"
                            className="text-xs text-purple-600 hover:underline"
                        >
                            Forget Password?
                        </a>
                        <div className="mt-6">
                            <button

                                type="submit"
                                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                               Signup
                            </button>
                        </div>
                    </form>

                    <p className="mt-8 text-xs font-light text-center text-gray-700">
                        {" "}
                    Have an account ?{" "}
                        <Link
                            href="/login"
                            className="font-medium text-purple-600 hover:underline"
                        >
                           Login
                        </Link>
                    </p>
                </div>} 
               
            </div>
            <Toaster
                position="bottom-center"
                reverseOrder={false}
            />
        </>

    )
}
