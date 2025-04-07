import { getCurrent } from "@/features/auth/queries";
import { redirect } from "next/navigation";
import React from "react";
import { ProjectPageClient } from "./[projectId]/client";

const ProjectIdPage = async () => {
  const user = await getCurrent();
  if (!user) {
    redirect("/sign-in");
  }

  return <ProjectPageClient />;
};

export default ProjectIdPage;
