"use client";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { CandlestickChart, CreditCard, Settings } from "lucide-react";
import Link from "next/link";
const navItems = [
    {name: "Portfolios", href: "/dashboard", icon:CandlestickChart},
    {name: "Settings", href: "/dashboard/settings", icon:Settings},

]

export function DashboardNav() {
    const pathname = usePathname();
    return (
        <div className="border-r p-5">
            <nav className="grid items-start gap-2">
                {navItems.map((item, index) => (
                    <Link key={index} href={item.href}>
                        <span className={cn(
                            "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground", pathname === item.href ?
                            "bg-accent" : "bg-transparent"
                        )}>
                            <item.icon className="mr-2 h-4 w-4 text-primary"/>
                            <span>{item.name}</span>
                        </span>
                    </Link>
                ))}
            </nav>
        </div>
       
    )
}