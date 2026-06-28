import EmployeeCard from './EmployeeCard';

import './../App.css';
import type { UserListProps } from "../types/employee"
import { SearchBar } from './SearchBar'
import { AddEmployeeForm } from './EmployeeForm';
import { useFetchEmployees} from '../hooks/useFetchEmployees';
import { useAddEmployee } from '../hooks/useAddEmployee';
import { useSearch } from '../hooks/useSearch'


export default function UserList({ selectedEmployee, onSelectEmployee }: UserListProps) {
  const {employees, loading, error, loadEmployees } = useFetchEmployees();
  const { addEmployee, isSubmitting, submitError } = useAddEmployee({
    onSuccess: (newEmployee) => {
        loadEmployees()
    }
  })
  
  const {searchTerm, setSearchTerm, filteredUsers} = useSearch(employees)

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

  if (submitError) {
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
          <EmployeeCard 
            key={employee.id} 
            employee={employee} 
            isSelected={selectedEmployee?.id === employee.id}
            onSelectUser={onSelectEmployee} 
          />
        ))
      )}

      <AddEmployeeForm onAddEmployee={addEmployee} />

      {isSubmitting && <p className="saving-indicator">Saving new employee...</p>}
    </div>
  );
}