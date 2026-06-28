import { useState, useEffect, useCallback } from 'react'
import type { Employee } from '../types/employee'

export function useFetchEmployees() {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    
    const loadEmployees = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await fetch('https://jsonplaceholder.typicode.com/users');
            
            if (!response.ok) {
                throw new Error('Failed to load users');
            }
            
            const data = await response.json();
            setEmployees(data);
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message)
            } else {
                setError('Unexpected error')
            }
        } finally {
            setLoading(false);
        }
    }, []);    

    useEffect(() => {
        loadEmployees()
    },[loadEmployees])

    return {employees, loading, error, loadEmployees }
} 