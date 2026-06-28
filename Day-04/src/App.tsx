import { useState } from 'react';
import EmployeeList from './components/EmployeeList';
import type { Employee } from './types/employee';
import './App.css';
import { EmployeeDetails } from './components/EmployeeDetails';

export default function App() {
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Directory Overview</h1>
        <p>Manage system operations, active records, and connected personnel profiles.</p>
      </header>
      
      <main className={`dashboard-grid ${selectedEmployee ? 'has-selection' : ''}`}>
        {/* Primary Operational Section */}
        <div>
          <EmployeeList selectedEmployee={selectedEmployee} onSelectEmployee={setSelectedEmployee} />
        </div>

        {/* Side Detail Inspection Panel */}
        <EmployeeDetails 
          value={selectedEmployee} 
          onChange={setSelectedEmployee} 
        />
      </main>
    </div>
  );
}