import { getCurrent } from "@/features/auth/queries";
import { JoinWorkspaceForm } from "@/features/workspaces/components/join-worskspace-form";
import { redirect } from "next/navigation";
import { WorkspaceIdJoinClient } from "./client";

const WorkspaceIdJoinPage = async () => {
  const user = await getCurrent();

  if (!user) {
    return redirect("sign-in");
  }

  return <WorkspaceIdJoinClient />;
};

export default WorkspaceIdJoinPage;
