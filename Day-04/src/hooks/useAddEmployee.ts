import { useState } from 'react';
import type { Employee } from '../types/employee';

interface UseAddEmployeeOptions {
  onSuccess?: (newEmployee: Employee) => void;
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