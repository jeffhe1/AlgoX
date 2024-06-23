import { DashboardNav } from "./DashboardNav"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col sapce-y-6 mt-10">
            <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
                
                <DashboardNav/>
                <main>{children}</main>
            </div>
        </div>
    )
}