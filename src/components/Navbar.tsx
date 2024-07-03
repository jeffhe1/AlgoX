import Link from "next/link";
import { ModeToggle } from "./ui/modetogglebutton";
import { Button } from "./ui/button";
import { getKindeServerSession, LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs/server";
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


export async function Navbar() {
    const { isAuthenticated, getUser } = getKindeServerSession();
    const user = await getUser();
    const name = user?.given_name as string + " " + user?.family_name as string;

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

    return (
        <nav className="border-b bg-background h-[8vh] flex items-center max-w-[100vw]">
            <div className="container flex justify-between max-w-[100vw]">
                <div className="flex justify-start pl-[2vw]">
                    <Link href="/">
                        <h1 className="text-2xl font-bold">Algo<span className="text-primary">X</span></h1>
                    </Link>
                </div>
                { await isAuthenticated() ? (
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
                        { await isAuthenticated() ? (
                            <div className="container flex justify-end gap-5">    
                                    <Link href='/dashboard'>
                                        <Button className="hidden md:block text-white bg-black">My Portfolio</Button>
                                    </Link>
                                    
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
                        <ModeToggle/> 
                </div>
            </div>
        </nav>
    )
}


