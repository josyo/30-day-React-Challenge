import '../App.css'
import type { EmployeeDetailsProps } from '../types/employee'

export function EmployeeDetails({ value, onChange }: EmployeeDetailsProps) {
  if (!value) return <div />;

  return (
    <aside className="details-panel">
      <div className="panel-header">
        <h2>Employee Profile</h2>
        <button className="close-btn" onClick={() => onChange(null)}>✕</button>
      </div>

      <hr className="panel-divider" />

      {/* Identity */}
      <div className="detail-section-label">Identity</div>

      <div className="detail-group">
        <div className="detail-label">Full Name</div>
        <div className="detail-value" style={{ fontWeight: 500 }}>{value.name}</div>
      </div>

      <div className="detail-group">
        <div className="detail-label">Username</div>
        <div className="detail-value detail-mono">@{value.username}</div>
      </div>

      <div className="detail-group">
        <div className="detail-label">System ID</div>
        <div className="detail-value detail-mono">usr_{value.id}_2026</div>
      </div>

      <hr className="panel-divider" />

      {/* Contact */}
      <div className="detail-section-label">Contact</div>

      <div className="detail-group">
        <div className="detail-label">Email</div>
        <div className="detail-value">{value.email}</div>
      </div>

      <div className="detail-group">
        <div className="detail-label">Phone</div>
        <div className="detail-value">{value.phone}</div>
      </div>

      <div className="detail-group">
        <div className="detail-label">Website</div>
        <div className="detail-value">
          <a
            href={`https://${value.website}`}
            target="_blank"
            rel="noreferrer"
            className="detail-link"
          >
            {value.website}
          </a>
        </div>
      </div>

      <hr className="panel-divider" />

      {/* Address */}
      <div className="detail-section-label">Address</div>

      <div className="detail-group">
        <div className="detail-label">Street</div>
        <div className="detail-value">{value.address.suite}, {value.address.street}</div>
      </div>

      <div className="detail-group">
        <div className="detail-label">City / Zip</div>
        <div className="detail-value">{value.address.city}, {value.address.zipcode}</div>
      </div>

      <div className="detail-group">
        <div className="detail-label">Coordinates</div>
        <div className="detail-value detail-mono">
          {value.address.geo.lat}, {value.address.geo.lng}
        </div>
      </div>

      <hr className="panel-divider" />

      {/* Company */}
      <div className="detail-section-label">Company</div>

      <div className="detail-group">
        <div className="detail-label">Name</div>
        <div className="detail-value" style={{ fontWeight: 500 }}>{value.company.name}</div>
      </div>

      <div className="detail-group">
        <div className="detail-label">Catchphrase</div>
        <div className="detail-value detail-italic">"{value.company.catchPhrase}"</div>
      </div>

      <div className="detail-group">
        <div className="detail-label">Business</div>
        <div className="detail-value">{value.company.bs}</div>
      </div>
    </aside>
  );
}