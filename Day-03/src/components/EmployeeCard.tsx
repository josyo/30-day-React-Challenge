import './../App.css';
import type {UserCardProps} from '../types/employee'

export default function EmployeeCrad({ employee, isSelected, onSelectUser }: UserCardProps) {
  return (
    <div 
      className={`user-card ${isSelected ? 'is-active' : ''}`}
      onClick={() => onSelectUser(employee)}
    >
      <div className="user-info">
        <h3>{employee.name}</h3>
        <div className="user-meta">
          <span>{employee.email}</span>
        </div>
      </div>
      <button className="view-btn">
        {isSelected ? 'Viewing' : 'Details'}
      </button>
    </div>
  );
}