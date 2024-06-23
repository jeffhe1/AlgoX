import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
export default async function Dashboard() {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    return(
        <div>
            <section className="flex-row">
                <h1 className="text-2xl font-bold">Account Info</h1>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full mt-5">
                    <Avatar>
                    <AvatarImage src={user?.picture as string} className="">

                    </AvatarImage>
                    <AvatarFallback>
                        {user?.given_name as string}
                    </AvatarFallback>
                    </Avatar>
                </Button>
                
            </section>    
        </div>
    )
}