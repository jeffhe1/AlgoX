import { Metadata } from "next/types";
import { DashboardNav } from "./DashboardNav"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import prisma from "@/lib/db";
async function getData({email, id, firstName, lastName}:{
    email: string,
    id: string,
    firstName: string | undefined | null,
    lastName: string | undefined | null,
    profileImage: string | undefined | null,
}) {
    const user = await prisma.user.findUnique({
        where: {
            id: id
        },
        select: {
            id: true,
            stripeCustomerId: true,
        }
    })
    if (!user) {
        const name = `${firstName ?? ""} ${lastName ?? ""}`;
        await prisma.user.create({
            data: {
                email: email,
                id: id,
                name: name,
            }
        })
    }  
}

export const metadata: Metadata = {
    title: "Dashboard - AlgoX",
    description: "AlgoX",
  };

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if(!user) {
        return redirect('/');
    }
    await getData({
        email: user.email as string, 
        firstName: user.given_name as string, 
        lastName: user.family_name as string, 
        id: user.id,
        profileImage: user.picture});
    return (
        <div className="flex flex-col sapce-y-6 mt-10">
            <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">

                <DashboardNav/>
                <main>{children}</main>
            </div>
        </div>
    )
}