import {Task, TaskStatus} from "../types";
import {
    DragDropContext,
    Droppable,
    Draggable,
    type DropResult
} from "@hello-pangea/dnd"
import React, {useCallback, useEffect, useState} from "react";
import { KanbanColumnHeader } from "./kanban-column-header";
import { KanbanCard } from "./kanban-card";
import { sources } from "next/dist/compiled/webpack/webpack";

interface DataKanbanProps {
    data: Task[];
    onChange: (tasks: {$id: string, status: TaskStatus, position: number}[]) => void;
}

export const DataKanban = ({data, onChange}: DataKanbanProps) => {
    
    const boards: TaskStatus[] = [
        TaskStatus.BACKLOG,
        TaskStatus.TODO,
        TaskStatus.IN_PROGRESS,
        TaskStatus.IN_REVIREW,
        TaskStatus.DONE,
    ];

    type TasksState = {
        [key in TaskStatus]: Task[];
    }
 
    const [tasks, setTasks] = useState<TasksState>(() => {
     const initalTasks: TasksState = {
        [TaskStatus.BACKLOG]: [],
        [TaskStatus.TODO]: [],  
        [TaskStatus.IN_PROGRESS]: [],
        [TaskStatus.IN_REVIREW]: [],
        [TaskStatus.DONE]: [],
     }

     data.forEach((task) => {
        initalTasks[task.status].push(task);
     });

     Object.keys(initalTasks).forEach((key) => {
        initalTasks[key as TaskStatus].sort((a, b) => a.postion - b.postion);
     });
     return initalTasks;
    });

    useEffect(() => {
        const newTasks: TasksState = {
            [TaskStatus.BACKLOG]: [],
            [TaskStatus.TODO]: [],  
            [TaskStatus.IN_PROGRESS]: [],
            [TaskStatus.IN_REVIREW]: [],
            [TaskStatus.DONE]: [],
         }
         data.forEach((task) => {
            newTasks[task.status].push(task);
         });
         Object.keys(newTasks).forEach((key) => {
            newTasks[key as TaskStatus].sort((a, b) => a.postion - b.postion);
         });
         setTasks(newTasks)
    }, [data])

    const onDragEnd = useCallback((result: DropResult) => {
        if(!result.destination){
            return;
        }
        const {source, destination} = result;
        const sourceStatus = source.droppableId as TaskStatus;
        const destStatus = destination.droppableId as TaskStatus;

        let updatesPayload: {$id: string, status: TaskStatus, position: number}[] = [];

        setTasks((prevTasks) => {
            const newTasks = {...prevTasks};
            // Safely remove tasks from source column

            const sourceColumn = [...newTasks[sourceStatus]];
            const [movedTask] = sourceColumn.splice(source.index, 1);

            if(!movedTask){
                console.error("No task found");
                return prevTasks;
            }

            const updatedMovedTask = sourceStatus !== destStatus ? {...movedTask, status: destStatus} : movedTask;
            
            newTasks[sourceStatus] = sourceColumn;

            const destColumn = [...newTasks[destStatus]];
            destColumn.splice(destination.index, 0, updatedMovedTask);
            newTasks[destStatus] = destColumn;

            updatesPayload = [];
            updatesPayload.push({
                $id: updatedMovedTask.$id,  
                status: destStatus,
                position: Math.min((destination.index +1) * 1000, 1_000_000),
            }); 

            newTasks[destStatus].forEach((task, index) => {
                if (task && task.$id === updatedMovedTask.$id) {
                    const newPosition = Math.min((index + 1) * 1000, 1_000_000);
                    if (task.position !== newPosition) {
                        updatesPayload.push({
                            $id: task.$id,
                            status: destStatus,
                            position: newPosition,
                        });
                    }
                }
            }); // <-- Correctly closing the forEach loop
            
            if (sourceStatus === destStatus) {
                newTasks[sourceStatus].forEach((task, index) => {
                    if (task) {
                        const newPosition = Math.min((index + 1) * 1000, 1_000_000);
                        if (task.position !== newPosition) {
                            updatesPayload.push({
                                $id: task.$id,
                                status: sourceStatus,
                                position: newPosition,
                            });
                        }
                    }
                });
            }
            
            return newTasks;
        })
        onChange(updatesPayload)
    }, [onChange])

    return (
    <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex overflow-x-auto">
            {boards.map((board) => {
                return (
                    <div key={board} className="flex-1 mx-2 bg-muted p-1.5 rounded-md min-w-[200px]">
                       <KanbanColumnHeader
                        board={board}
                        taskCount={tasks[board].length}
                        />
                        <Droppable droppableId={board}>
                            {(provided) => (
                                <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                className="min-h-[200px] py-1.5"
                                >
                                    {tasks[board].map((task, index) => (
                                        <Draggable key={task.$id} draggableId={task.$id} index={index}>
                                            {(provided) => (
                                                <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                >
                                                    <KanbanCard task={task} />
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )} 
                        </Droppable>
                    </div>
                )
            })}
        </div>
    </DragDropContext>
 )
}
