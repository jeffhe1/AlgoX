"use client"
 
import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import "../../components/custom_animations.css";
import { Toggle } from "./toggle";
import { useState } from "react";
export default function ModeToggle() {
    const { setTheme } = useTheme();
    const [press, setPress] = useState(false);
    const handlePress = (check:boolean) => {
        setPress(check);
        setTheme(check ? "light" : "dark");
    }

    if (!press) {
        return (
        <Toggle defaultPressed={true} onPressedChange={(check:boolean)=>handlePress(check)} className="aspect-square h-[100%] rounded-full">
            <Moon className="h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all transition-duration:5s dark:rotate-0 dark:scale-100 dark:hover:scale-125 ease-in-out " />
        </Toggle>
        )
    }
    return (
        <Toggle defaultPressed={true} onPressedChange={(check:boolean) => handlePress(check)} className="aspect-square h-[100%] rounded-full">
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all transition-duration:5s dark:rotate-90 dark:scale-0 hover:scale-150 text-primary ease-in-out" />
        </Toggle>
    )
}