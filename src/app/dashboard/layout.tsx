import { Metadata } from "next/types";
import { DashboardNav } from "./DashboardNav"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import prisma from "@/lib/db";
import { createClient } from "@/utils/supabase/server";
import { Navbar } from "@/components/Navbar";
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
    const supabase = createClient();
    const { data, error } = await supabase.auth.getUser();

    if (error || !data) {
        redirect("/login");
    }
    
    return (
        <main >
            <Navbar/>
            <div className="flex flex-col space-y-6 mt-10 h-[100vh]">
                <div className="grid flex-1 gap-12 md:grid-cols-[200px_1fr] px-[10%]">
                    <DashboardNav/>
                    <main>{children}</main>
                </div>
            </div>
        </main>
            
    )
}