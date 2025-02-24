import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { CreateWorkspaceModal } from "@/features/workspaces/components/create-workspace-modal";
import React from "react";

interface DashboardLayoutPrps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutPrps) => {
  return (
    <div className="min-h-screen">
      <CreateWorkspaceModal />
      <div className="flex w-full h-full">
        <div className="fixed left-0 top-0 hidden lg:block lg:w-[264px] lg:h-[97vh] h-full overfllow-y-auto">
          <Sidebar />
        </div>
        <div className="lg:pl-[264px] w-full">
          <div className="mx-auto max-w-screen-2xl h-full">
            <Navbar />
            <main className="h-full py-8 px-6 flex flex-col">{children}</main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
