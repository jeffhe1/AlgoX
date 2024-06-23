import Link from "next/link";
import { ModeToggle } from "./ui/modetogglebutton";
import { Button } from "./ui/button";
import {RegisterLink, LoginLink, LogoutLink} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import React from "react";
import { UserNav } from "./UserNav";
import { Infobar } from "./Infobar";


export async function Navbar() {
    const { isAuthenticated, getUser } = getKindeServerSession();
    const user = await getUser();

    const name = user?.given_name as string + " " + user?.family_name as string;
    
    return (
        <nav className="border-b bg-background h-[8vh] flex items-center max-w-[100vw]">
            <div className="container flex justify-between max-w-[100vw]">
                <div className="flex justify-start">
                    <Link href="/">
                        <h1 className="text-2xl font-bold">Algo<span className="text-primary">X</span></h1>
                    </Link>
                </div>
                
                <div className=" container flex justify-start gap-5">
                    <Infobar/>
                </div>

                <div className="container flex justify-between">
                        
                        { await isAuthenticated() ? (
                            <div className="container flex justify-end gap-5">
                                <ModeToggle/> 
                                <UserNav email={user?.email as string} image={user?.picture as string} name={name}/>    
                            </div>
                        ):(
                            <div className="container flex justify-end gap-5">
                                <LoginLink>
                                    <Button className="hidden md:block font-bold">Login</Button>
                                </LoginLink>
                                <RegisterLink>
                                        <Button className="hidden md:block font-bold " style={{ backgroundColor: "#B3B3B3" }}>Sign up</Button>
                                </RegisterLink>
                            </div>
                        )}
                </div>

            </div>
        </nav>
    )
}


