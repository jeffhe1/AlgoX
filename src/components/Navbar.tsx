import Link from "next/link";
import { Button } from "./ui/button";
import { getKindeServerSession, RegisterLink } from "@kinde-oss/kinde-auth-nextjs/server";
import React from "react";
import { UserNav } from "./UserNav";
import { Infobar } from "./Infobar";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
    NavigationMenuViewport,
  } from "@/components/ui/navigation-menu"
import { LayoutDashboardIcon } from "lucide-react";
import ModeToggleSwitch from "./ui/modetoggleswitch";
import ModeToggle from "./ui/modetoggle";

import { createClient } from "@/utils/supabase/server";
import prisma from "@/lib/db";
const tools : {title: string; href: string;}[] = [
    {
        title: "Portfolio Backtester",
        href: "/",
    },
    {
        title: "Stock Screener",
        href: "/",
    },
    {
        title: "Portfolio Optimizer",
        href: "/",
    }
];

export async function Navbar() {
    
    const supabase = createClient();
    const { data, error } = await supabase.auth.getUser();
    const user = data.user;
    let name;
    const email = user?.email as string;
    if (email) {
        const response = await prisma.user.findUnique({
            where: {
                email: email,
            },
            select:{
                name: true,
            }
        })
        name = response?.name;
    }else{
        console.log("user not authenticated");
    }
    return (
        <nav className="border-b bg-background h-[8vh] flex items-center">
            <div className="container flex justify-between max-w-[100vw]">
                <div className="flex justify-start pl-[2vw]">
                    <Link href="/">
                        <h1 className="text-2xl font-bold">Algo<span className="text-primary">X</span></h1>
                    </Link>
                </div>
                { data.user ? (
                    <div className="container flex justify-start gap-5">
                        <Link href='/dashboard'> 
                            <Button variant = 'ghost' className="hidden md:block ">Dashboard</Button>
                        </Link>
                        <NavigationMenu>
                            <NavigationMenuList>
                                <NavigationMenuItem>
                                    <NavigationMenuTrigger className="w-[100px] items-center">
                                        Tools
                                    </NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        <ul className="flex-col gap-3 p-4 md:w-[200px] lg:w-[200px]">
                                            {tools.map((tool) => (
                                                <li key={tool.title} className="flex flex-row relative">
                                                    <div className="flex flex-row">
                                                        <Link href={tool.href} passHref={true}>
                                                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                                                {tool.title}
                                                            </NavigationMenuLink>
                                                        </Link> 
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>
                            </NavigationMenuList>
                        </NavigationMenu>
                        
                    </div>
                ):(
                    <div className=" container flex justify-start gap-5">
                        <Infobar/>
                    </div>
                ) }
                <div className="container flex justify-between">
                        { data.user ? (
                            <div className="container flex justify-end gap-5">    
                                    <Link href='/dashboard'>
                                        <Button className="hidden md:block text-white bg-black">My Portfolio</Button>
                                    </Link>
                                    
                                    <UserNav name={name??""} email={user?.email as string} image={user?.user_metadata.picture as string}/>      
                            </div> 
                        ):(
                            <div className="container flex justify-end gap-5">
                                <Link href="/login">
                                    <Button className="hidden md:block font-bold">Join Now</Button>
                                </Link>
                            </div>
                        )}
                        <ModeToggle/>
                </div>
            </div>
        </nav>
    )
}


