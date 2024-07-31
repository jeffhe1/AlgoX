"use server"

import prisma from '@/lib/db'
import { Prisma, PrismaClient } from '@prisma/client';
import { redirect } from 'next/navigation'


const client = new PrismaClient();
export type portfolioData = Prisma.PortfolioGetPayload<{
    include: {
        holdings: true
    }
}>


export async function createPortfolio(userID: string, formData: FormData) {
    const data = {
        name: formData.get("name") as string,
        fiat_reserve: parseFloat(formData.get("fiat_reserve") as string),
    };

    const response = await prisma.user.update({
        where: {
            id: userID,
        },
        data: {
            portfolios: {
                create:[
                    data,
                ]
            }
        }
    })
    redirect('/dashboard');
}

export async function addHoldings(userID: string, portfolioID: number, formData: FormData) {
    const data = {
        symbol: formData.get("symbol") as string,
        amount: parseInt(formData.get("amount") as string),
        price: parseFloat(formData.get("price") as string),
    };

    try {const response = await prisma.portfolio.update({
        where:{
            userId: userID,
            id: portfolioID,
        },
        data:{
            holdings: {
                create:[
                    data,
                ]
            }
        }
    })
    redirect('/dashboard');}
    catch(err) {
        console.log(err);
        return 0;
    }
}

export async function deletetPortfolio(userID: string, portfolioID: number, portfolioName:string) {
    try {const response = await prisma.portfolio.delete({
        where:{
            userId: userID,
            id: portfolioID,
            name: portfolioName,
        }
    })}catch(err){
        console.log(err);
        return 0;
    }
    redirect("/dashboard");
}

export async function renamePortfolio(userID: string, portfolioID: number, portfolioName:string, newName:string) {
    try {const response = await prisma.portfolio.update({
        where:{
            userId: userID,
            id: portfolioID,
            name: portfolioName,
        },data:{
            name: newName,
        }
    })
    }catch(err) {
        console.log(err);
        return 0;
    }
    redirect("/dashboard");
}

export async function readPortfolio(userID: string, portfolioID: number) {
    try {const response = await prisma.portfolio.findUnique({
        where:{
            userId: userID,
            id: portfolioID
        },
        include: {
            holdings: true
        }
        },
    );
        return response;
    }catch(err){
        console.log(err);
        return null;
    }
}