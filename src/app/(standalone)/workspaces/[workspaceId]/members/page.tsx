import { getCurrent } from "@/features/auth/queries";
import MembersList from "@/features/workspaces/components/members-list";
import { redirect } from "next/navigation";
import React from "react";

const WorkspaceIdMembersPage = async () => {
  const user = getCurrent();
  if (!user) return redirect("/sign-in");

  return (
    <div className="w-full lg:max-w-xl">
      <MembersList />
    </div>
  );
};

export default WorkspaceIdMembersPage;
