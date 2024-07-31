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
import Link from "next/link";
import "./custom_animations.css";

const products: { title: string; href: string; description: string}[] = [
    {
        title: "Portfolio Tracker",
        href: "/dashboard",
        description: "Track yourportfolio"
    },
    {
        title: "Stock Screener",
        href: "/",
        description: "Find your next stock"
    },
    {
        title: "AI Portfolio Optimizer",
        href: "/",
        description: "Optimize your portfolio"
    }
]
export function Infobar() {
    return (
        <NavigationMenu>
        <NavigationMenuList>
            <NavigationMenuItem>
            <NavigationMenuTrigger >Explore</NavigationMenuTrigger>
            <NavigationMenuContent>
                <ul className="flex-col gap-3 p-4 md:w-[400px] lg:w-[500px]">
                    {products.map((product) => (
                        <li key={product.title} className="container">
                            <div className='flex flex-row'>
                                <Link href={product.href} passHref={true} className='w-[200px]'>
                                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                        {product.title}
                                    </NavigationMenuLink>
                                </Link> 
                                <p className="text-xs mt-2 text-muted-foreground">{product.description}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </NavigationMenuContent>
            </NavigationMenuItem>
            <div className="flex items-start justify-start gap-5">
                <Link href='/' passHref={true}>
                        <h1 className="text-sm mt-0.5 darken">Home</h1>
                </Link>

                <Link href="/doc" passHref={true}>
                        <h1 className="text-sm mt-0.5 darken">Pricing Plans</h1>
                </Link>
            </div>
          
        </NavigationMenuList>
        </NavigationMenu>
    )
}