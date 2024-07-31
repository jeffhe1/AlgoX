import { Metadata } from "next/types";
import { DashboardNav } from "../DashboardNav"
import { Navbar } from "@/components/Navbar";

export const metadata: Metadata = {
    title: "Settings - AlgoX",
    description: "AlgoX settings",
  };

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {

    return (
        <main className="h-[100vh]">
            {children}
        </main>
            
    )
}