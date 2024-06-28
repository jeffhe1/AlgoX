"use client";
import { useEffect, useState } from "react";
import { auth } from "@/app/firebase";
import { signInWithEmailAndPassword, onAuthStateChanged, signInWithPopup, signOut} from "firebase/auth";
import { Button } from "./ui/button";
import Link from "next/link";
import { GoogleProvider } from "@/app/firebase";


export default function Auth() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const SignIn = async () => {
        try {
            const res = await signInWithEmailAndPassword(auth, email, password)
            console.log(res);
        }
        catch {
            return <p > Wrong</p>;
        }
    };

    const SignInWithGoogle = async () => {
        try {
            const res = await signInWithPopup(auth, GoogleProvider);
            console.log(res);
        }catch {
            console.log("Error");
        }
    };

    return (
        <div className="flex flex-col gap-1 fade-in-image w-[300px] h-[200px]">
            <label className="flex--item s-label font-bold ml-1">Email </label>
            <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
            />
            <label className="flex--item s-label font-bold ml-1 mt-2">Password </label>
            <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
            />

            <Button onClick={SignIn} className="hidden md:block font-bold mt-1 flex--item w-[100%]">Sign In</Button>

            
            
            <hr className="solid mt-10"/>
            
            <Link href="/login/loading">
                <Button onClick={SignInWithGoogle} className="flex--item w-[100%] hidden md:block font-bold mt-5 google-bar">
                    <div className="flex grid-cols-3 gap-5 justify-center items-center">
                        <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="23px" height="23px"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/></svg>
                        Sign in with google
                        <div></div>
                    </div>
                </Button>
            </Link>


        </div>
    )
}

export const Authentication = () => {
    const [authenticatedUser, setauthenticatedUser] = useState("");

    useEffect(() => {
        const listenAuth = onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log("logged in");
            } else {
                console.log("not logged in");
            }
        })
        return () => {
            listenAuth();
        }
    }, [])

    const userSignOut = () => {
        signOut(auth);
    }
}
