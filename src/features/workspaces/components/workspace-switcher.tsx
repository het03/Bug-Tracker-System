"use client";

import { useRouter } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RiAddCircleFill } from "react-icons/ri";
import { useGetWorkspaces } from "../api/use-get-workspaces";
import { useCreateWorkspaceModel } from "../hooks/use-create-workspace-model";
import { useWorkspaceId } from "../hooks/use-workspace-id";
import WorkspaceAvatar from "./workspace-avatar";

const WorkspaceSwitcher = () => {
  const { data: workspaces } = useGetWorkspaces();
  const workspaceId = useWorkspaceId();
  const { open } = useCreateWorkspaceModel();

  const router = useRouter();

  const onSelect = (value: string) => {
    if (value !== "none") {
      router.push(`/workspaces/${value}`);
    }
  };

  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex items-center justify-between">
        <p className="text-sm uppercase text-neutral-500">Workspaces</p>
        <RiAddCircleFill
          onClick={open}
          className="size-5 text-neutral-500 cursor-pointer hover:opacity-75 transition"
        />
      </div>
      <Select onValueChange={onSelect} value={workspaceId}>
        <SelectTrigger className="w-full bg-neutral-200 font-medium p-1">
          <SelectValue placeholder="No workspace selected" />
        </SelectTrigger>
        <SelectContent>
          {workspaces?.documents.map((workspace) => {
            return (
              <SelectItem key={workspace.$id} value={workspace.$id}>
                <div className="flex items-center justify-start gap-3 font-medium">
                  <WorkspaceAvatar
                    name={workspace.name}
                    image={workspace.imageUrl}
                  />
                  <span className="truncate">{workspace.name}</span>
                </div>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
};

export default WorkspaceSwitcher;
