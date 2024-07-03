"use server";
import prisma from "@/lib/db"

export async function updateDatabase({user_id, portfolio_name}:{
    user_id:string, 
    portfolio_name:string
}) {
    const user = await prisma.user.update({
        where: {
            id: user_id,
        },
        data: {
            portfolioexists: true,
            portfolios: {
                create:{
                    id:"1",
                    name: portfolio_name,
                }
            }
        }
    })
}