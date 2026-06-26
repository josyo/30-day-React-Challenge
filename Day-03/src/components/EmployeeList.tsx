import { useState, useEffect, useCallback } from 'react';
import UserCard from './EmployeeCard';
import type { Employee } from '../types/employee'
import './../App.css';
import type { UserListProps } from "../types/employee"
import { SearchBar } from './SearchBar'
import { AddEmployeeForm } from './EmployeeForm';

export default function UserList({ selectedUser, onSelectUser }: UserListProps) {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

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
    } catch (err: any) {
      setError(err.message || 'An unexpected connection error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadEmployees();
  }, [loadEmployees]);

  const handleAddEmployee = async (newEmployeeData: Omit<Employee, 'id'>) => {
    try {
      const response = await fetch ('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEmployeeData)
      })

      if (!response.ok) {
        throw new Error("Failed to add employee")
      }

      await loadEmployees();
    } catch(err: any) {
       setError(err.message || 'Failed to add employee')
    }
  }
  
  const filteredUsers = employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="state-container">
        <div className="spinner"></div>
        <p style={{ color: 'var(--text-muted)', margin: 0 }}>Loading users...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="state-container">
        <p className="error-text">{error}</p>
        <button className="retry-btn" onClick={loadEmployees}>Try Again</button>
      </div>
    );
  }

  return (
    <div>
      <div className="search-wrapper">
        <SearchBar 
          value={searchTerm} onChange={setSearchTerm} />
      </div>

      {filteredUsers.length === 0 ? (
        <div className="empty-state">No matching team members found.</div>
      ) : (
        filteredUsers.map((employee) => (
          <UserCard 
            key={employee.id} 
            employee={employee} 
            isSelected={selectedUser?.id === employee.id}
            onSelectUser={onSelectUser} 
          />
        ))
      )}

      <AddEmployeeForm onAddEmployee={handleAddEmployee} />
    </div>

    
  );
}