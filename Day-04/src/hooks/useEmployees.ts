import { useState, useEffect, useCallback } from 'react'
import type { Employee } from '../types/employee'

interface UseAddEmployeeOptions {
  onSuccess?: (newEmployee: Employee) => void;
}



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



export function useAddEmployee(options?: UseAddEmployeeOptions) {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const addEmployee = async (newEmployeeData: Omit<Employee, 'id'>) => {
    try {
      setIsSubmitting(true);
      setSubmitError(null);

      const response = await fetch('https://your-real-api.com/v1/employees', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEmployeeData),
      });

      if (!response.ok) {
        throw new Error('Failed to add employee to the database');
      }

      const createdEmployee = await response.json();

      // Trigger our success callback if it was provided
      if (options?.onSuccess) {
        options.onSuccess(createdEmployee);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
                setSubmitError(err.message)
            } else {
                setSubmitError('Unexpected error')
            }
    } finally {
      setIsSubmitting(false);
    }
  };

  return { addEmployee, isSubmitting, submitError };
}