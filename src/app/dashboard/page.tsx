"use server"
import PortfolioLayout from "@/components/dashboard_components/portfolio_app/portfolio_layout";
import { createClient } from "@/utils/supabase/server";
import { Prisma, PrismaClient } from "@prisma/client";


export default async function Dashboard() {
    const supabase = createClient();
    const { data, error }= await supabase.auth.getUser();
    const email = data.user?.email;

    const prisma = new PrismaClient();
    const userInclude = Prisma.validator<Prisma.UserInclude>()({
        portfolios: {
            include: {
                holdings: true,
                
            }
        }
    })
    type UserData = Prisma.UserGetPayload<{
        include : typeof userInclude
    }>

    const userData = await prisma.user.findUnique({
        where:{
            email: email,
        },
        include: userInclude
    })

    return(
        <div className="h-[90vh] p-5 grid auto-rows-max grid-flow-row-dense">
            <PortfolioLayout userData={userData}/>
        </div>
    )
}