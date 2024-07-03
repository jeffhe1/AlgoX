import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "@/lib/db";
import CreatePortfolio from "@/components/dashboard_components/create_portfolio";

export default async function Dashboard() {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    const userData = await prisma.user.findUnique({
        where: {
            id : user?.id
        },
        select: {
            id: true,
            portfolioexists: true
        }
    });
    
    return(
        <div className="container h-[100vh]">
            {userData?.portfolioexists ? (
                <div>
                </div>
            ):(
                <CreatePortfolio/>
            )}
        </div>
    )
}