import DashboardSidebar from "@/components/shared/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <SidebarProvider >
                <DashboardSidebar />
                <main className=" md:w-full      ">{children}</main>
            </SidebarProvider>

        </>
    );
};

export default layout;