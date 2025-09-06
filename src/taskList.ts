import { useState } from "react"

 const taskLists: task[] = [
    {
        taskString : 'Its a Sample Task',
        importance : false
    },
    {
        taskString : 'Its a Sample Task',
        importance : false
    }
]
export  const [arr, setArr] = useState(taskLists)