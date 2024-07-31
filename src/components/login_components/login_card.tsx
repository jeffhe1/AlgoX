"use client"
import { useState } from "react";
import { Card, CardContent, CardTitle } from "../ui/card";
import LoginForm from "./login_form";
import SignupForm from "./signup_form";
import { Button } from "../ui/button";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useRouter } from "next/router";
export default function LoginCard() {
    const searchParams = useSearchParams();
    const signup = searchParams.get("signup");
    const [loginstate, setloginstate] = useState(true)

    return(
        <Card className="w-full mx-auto h-[600px] flex-row justify-center p-5">
          <CardTitle className="text-2xl py-2"><h1 className="text-2xl font-bold text-center">Algo<span className="text-primary">X</span></h1></CardTitle>
          <CardContent className="w-full flex flex-col justify-center">
           {!signup? (
                <div className="flex flex-col gap-5">
                    <LoginForm/>
                    <p className="py-2 border-b text-center text-sm"> Don't have an account yet? </p>
                    <Link href="/login?signup=true" className="py-2 text-center text-sm">
                        <Button variant="outline" className="w-full py-2" >
                            Sign Up
                        </Button>
                    </Link>

                </div>        
           ):<SignupForm/>}
           
          </CardContent>
      </Card>
    )
}