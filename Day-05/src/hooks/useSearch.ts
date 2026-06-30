import { useState } from 'react'
import type { Task } from '../types/task'

export function useSearch(task: Task[]) {
    const [searchTerm, setSearchTerm] = useState<string>('');

    const filteredTasks = task.filter((task) =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return {searchTerm, setSearchTerm, filteredTasks}
}