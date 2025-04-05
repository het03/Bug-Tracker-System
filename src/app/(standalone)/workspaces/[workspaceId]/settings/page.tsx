import { getCurrent } from "@/features/auth/queries";
import { redirect } from "next/navigation";
import React from "react";
import { WorkspaceSettingsId } from "./client";

const WorkspaceIdSettingsPage = async () => {
  const user = await getCurrent();

  if (!user) redirect("/sign-in");

  return <WorkspaceSettingsId />;
};

export default WorkspaceIdSettingsPage;
