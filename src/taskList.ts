import { useState } from "react"

export let taskLists: task[] = [
    {
        taskString : 'Its a Sample Task',
        importance : false
    },
    {
        taskString : 'Its a Sample Task',
        importance : false
    }
]

export const updateMasterTaskList = (newTasks: task[]) => {
  taskLists = newTasks;
};