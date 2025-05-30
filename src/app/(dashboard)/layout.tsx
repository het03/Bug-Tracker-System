import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import CreateProjectModel from "@/features/projects/components/create-project-model";
import CreateTaskModel from "@/features/tasks/components/create-task-model";
import EditTaskModel from "@/features/tasks/components/edit-task-model";
import CreateWorkspaceModel from "@/features/workspaces/components/create-workspace-model";
import React from "react";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen">
      <CreateWorkspaceModel />
      <CreateProjectModel />
      <CreateTaskModel />
      <EditTaskModel />
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
