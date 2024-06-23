import { DropdownMenuGroup, DropdownMenuLabel } from "@radix-ui/react-dropdown-menu"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuItem} from "./ui/dropdown-menu"
import Link from "next/link"
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components"
import { Button } from "./ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { CreditCard, Home, Settings, LogOut } from "lucide-react"




export const navItems=[
    {name: "Home", href: "/dashboard", icon:Home},
    {name: "Settings", href: "/dashboard/settings", icon:Settings},
    {name: "Billing", href: "/dashboard/billing", icon: CreditCard},
]

export function UserNav({name, email, image} : {
    name: string,
    email: string,
    image: string,
}) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar>
                        <AvatarImage src={image}alt=""/>
                        <AvatarFallback>Ya</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium ml-2">{name}</p>
                        <p className="text-xs ml-2 text-muted-foreground">{email}</p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator/>
                <DropdownMenuGroup>
                    {navItems.map((item, index) => (
                        <Link key={index} href={item.href}>
                            <DropdownMenuItem className="flex items-center gap-2">
                                <item.icon className="h-4 w-4 text-primary"/>
                                <span>{item.name}</span>
                            </DropdownMenuItem>
                        </Link>
                    ))}
                </DropdownMenuGroup>             
                

                <DropdownMenuSeparator />
                <DropdownMenuItem className="w-full flex justify-between items-center">
                    <LogoutLink>
                        <div className="flex flex-row items-center">
                            <LogOut className="h-4 w-4 text-primary"/>
                            <DropdownMenuItem className="hover:cursor-pointer">Log out</DropdownMenuItem>
                        </div>
                        
                    </LogoutLink>
                </DropdownMenuItem>
                
                
            </DropdownMenuContent>
        </DropdownMenu>
    )
}