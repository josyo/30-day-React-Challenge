import { useState, useEffect, useCallback } from 'react';
import UserCard from './userCard';
import type { User } from './userCard'
import './../App.css';

interface UserListProps {
  selectedUser: User | null;
  onSelectUser: (user: User) => void;
}

export default function UserList({ selectedUser, onSelectUser }: UserListProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const loadSystemUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('http://localhost:4000/users');
      
      if (!response.ok) {
        throw new Error('Failed to load users');
      }
      
      const data = await response.json();
      setUsers(data);
    } catch (err: any) {
      setError(err.message || 'An unexpected connection error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSystemUsers();
  }, [loadSystemUsers]);

  // Derived state filter (recomputes instantly on typing input updates)
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
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
        <button className="retry-btn" onClick={loadSystemUsers}>Try Again</button>
      </div>
    );
  }

  return (
    <div>
      <div className="search-wrapper">
        <input
          type="text"
          className="search-input"
          placeholder="Filter down directory by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredUsers.length === 0 ? (
        <div className="empty-state">No matching team members found.</div>
      ) : (
        filteredUsers.map((user) => (
          <UserCard 
            key={user.id} 
            user={user} 
            isSelected={selectedUser?.id === user.id}
            onSelectUser={onSelectUser} 
          />
        ))
      )}
    </div>
  );
}