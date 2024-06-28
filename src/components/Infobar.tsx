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
        title: "Feature 1",
        href: "/",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores, animi cupiditate ducimus nisi dignissimos expedita repellendus adipisci natus similique minus mollitia necessitatibus recusandae enim odit illum distinctio tempore alias. Provident!",
    },
    {
        title: "Feature 2",
        href: "/",
        description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Est, earum harum vero, ipsam maxime eius architecto sequi molestias corporis, officia libero animi tenetur sint ut totam! Sed tempore explicabo ullam?",
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
                        <li key={product.title} className="flex flex-row">
                            <div className="flex flex-row">
                                <Link href={product.href} passHref={true}>
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