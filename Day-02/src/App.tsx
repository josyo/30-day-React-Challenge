import { useState } from 'react';
import UserList from './components/userList';
import type { User } from './components/userCard';
import './App.css';

export default function App() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Directory Overview</h1>
        <p>Manage system operations, active records, and connected personnel profiles.</p>
      </header>
      
      <main className={`dashboard-grid ${selectedUser ? 'has-selection' : ''}`}>
        {/* Primary Operational Section */}
        <div>
          <UserList selectedUser={selectedUser} onSelectUser={setSelectedUser} />
        </div>

        {/* Side Detail Inspection Panel */}
        {selectedUser && (
          <aside className="details-panel">
            <div className="panel-header">
              <h2>User Details</h2>
              <button className="close-btn" onClick={() => setSelectedUser(null)}>
                ✕
              </button>
            </div>
            
            <hr className="panel-divider" />
            
            <div className="detail-group">
              <div className="detail-label">Identification String</div>
              <div className="detail-value" style={{ fontFamily: 'monospace', color: 'var(--text-muted)' }}>
                usr_{selectedUser.id}2026_x9
              </div>
            </div>

            <div className="detail-group">
              <div className="detail-label">Full Name</div>
              <div className="detail-value" style={{ fontWeight: 500 }}>{selectedUser.name}</div>
            </div>

            <div className="detail-group">
              <div className="detail-label">Email Endpoint</div>
              <div className="detail-value">{selectedUser.email}</div>
            </div>

            <div className="detail-group">
              <div className="detail-label">Assigned Entity</div>
              <div className="detail-value">{selectedUser.country}</div>
            </div>
          </aside>
        )}
      </main>
    </div>
  );
}