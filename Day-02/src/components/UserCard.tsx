import './../App.css';

export interface User {
  id: number;
  name: string;
  email: string;
  company: string;
}

interface UserCardProps {
  user: User;
  isSelected: boolean;
  onSelectUser: (user: User) => void;
}

export default function UserCard({ user, isSelected, onSelectUser }: UserCardProps) {
  return (
    <div 
      className={`user-card ${isSelected ? 'is-active' : ''}`}
      onClick={() => onSelectUser(user)}
    >
      <div className="user-info">
        <h3>{user.name}</h3>
        <div className="user-meta">
          <span>{user.email}</span>
        </div>
      </div>
      <button className="view-btn">
        {isSelected ? 'Viewing' : 'Details'}
      </button>
    </div>
  );
}