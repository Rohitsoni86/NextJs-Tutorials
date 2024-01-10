"use client"
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';

import { DNA } from 'react-loader-spinner';

export default function LoginPage() {
    const router = useRouter();
    const [userData, setUserData] = useState({
        email: "",
        password: "",
    })

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(userData);

        try {
            setLoading(true);
            console.log(userData);

            const response = await axios.post("/api/login", userData);
            console.log("Signup success", response.data);
            router.push(`/user/${userData.email}`);

        } catch (error) {
            console.log("Signup failed", error.message);

            toast.error(error.message);
        } finally {
            setLoading(false);
        }

    }
    return (
        <>
            <div className="relative flex flex-col justify-center bg-orange-200 min-h-screen overflow-hidden">
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
                    : <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
                        <h1 className="text-3xl font-semibold text-center text-orange-400 ">
                            Login into Your Account
                        </h1>
                        <form className="mt-6" onSubmit={handleSubmit}>
                            <div className="mb-2">
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-semibold text-gray-800"
                                >
                                    Email
                                </label>
                                <input
                                    value={userData.email}
                                    onChange={(e) => setUserData({ ...userData, email: e.target.value })}
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
                                    value={userData.password}
                                    onChange={(e) => setUserData({ ...userData, password: e.target.value })}
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
                                    className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transhtmlForm bg-orange-400 rounded-md hover:bg-orange-600 focus:outline-none focus:bg-orange-600">
                                    Login
                                </button>
                            </div>
                        </form>

                        <p className="mt-8 text-xs font-light text-center text-gray-700">
                            {" "}
                            Don't have an account?{" "}
                            <Link
                                href="/signup"
                                className="font-medium text-purple-600 hover:underline"
                            >
                                Sign up
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
