"use client"
 
import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Switch } from "./switch";
import "../../components/custom_animations.css";

export default function ModeToggleSwitch() {
    const { setTheme } = useTheme();

    return(
        <div className="flex items-center space-x-2">
            <Sun />
            <Switch defaultChecked={true} onCheckedChange={(checked:boolean) => setTheme(checked ? "dark" : "light")} className="mode-toggle-enlarge"/>
            <Moon />
        </div>
    )
}