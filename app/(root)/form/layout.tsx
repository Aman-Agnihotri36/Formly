import DashboardSidebar from "@/components/shared/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
    return (

        <main className=" bg-gray-200 md:h-screen md: pt-8 dark:bg-black">{children}</main>

    );
};

export default layout;