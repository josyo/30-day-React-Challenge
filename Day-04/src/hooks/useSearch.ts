import { useState } from 'react'
import type { Employee } from '../types/employee'

export function useSearch(users: Employee[]) {
    const [searchTerm, setSearchTerm] = useState<string>('');

    const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return {searchTerm, setSearchTerm, filteredUsers}
}