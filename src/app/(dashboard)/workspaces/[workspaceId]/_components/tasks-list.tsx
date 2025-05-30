import { formatDistanceToNow } from "date-fns";
import { CalendarIcon, PlusIcon } from "lucide-react";
import Link from "next/link";

import DottedSeparator from "@/components/dotted-separator";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCreateTaskModel } from "@/features/tasks/hooks/use-create-task-model";
import { Task } from "@/features/tasks/types";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";

type TaskListProps = {
  data: Task[];
  total: number;
};

const TaskList = ({ data, total }: TaskListProps) => {
  const { open: createTask } = useCreateTaskModel();
  const workspaceId = useWorkspaceId();

  return (
    <div className="flex flex-col gap-y-4 col-span-1">
      <div className="bg-muted rounded-lg p-4">
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold">Tasks ({total})</p>
          <Button variant="muted" size="icon" onClick={createTask}>
            <PlusIcon className="size-4 text-neutral-700" />
          </Button>
        </div>

        <DottedSeparator className="my-4" />
        <ul className="flex flex-col gap-y-4">
          {data.slice(0,3).map((task) => (
            <li key={task.$id} className="">
              <Link href={`/workspaces/${workspaceId}/tasks/${task.$id}`}>
                <Card className="shadow-none rounded-lg hover:opacity-75 transition">
                  <CardContent className="p-4">
                    <p className="text-lg font-medium truncate">{task.name}</p>
                    <div className="flex items-center gap-x-4">
                      <p className="">{task.project?.name}</p>
                      <div className="size-1 rounded-full bg-neutral-300" />
                      <div className="text-sm text-muted-foreground flex items-center">
                        <CalendarIcon className="size-3 mr-1" />
                        <span className="truncate">
                          {formatDistanceToNow(new Date(task.dueDate))}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </li>
          ))}
          <li className="text-sm text-muted-foreground text-center hidden first-of-type:block">
            No task found
          </li>
        </ul>
        <Button asChild variant="muted" className="mt-4 w-full">
          <Link href={`/workspaces/${workspaceId}/tasks`}>Show all</Link>
        </Button>
      </div>
    </div>
  );
};

export default TaskList;
