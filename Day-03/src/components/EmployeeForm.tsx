import type { AddEmployeeFormProps } from '../types/employee'
import { useState } from 'react'

export function AddEmployeeForm({ onAddEmployee }: AddEmployeeFormProps) {
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [city, setCity] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!name || !username || !email) {
      return setError('Name, username, and email are required')
    }

    onAddEmployee({
      name,
      username,
      email,
      phone,
      website: '',
      address: {
        street: '',
        suite: '',
        city,
        zipcode: '',
        geo: { lat: '0', lng: '0' },
      },
      company: {
        name: companyName,
        catchPhrase: '',
        bs: '',
      },
    })

    setName('')
    setUsername('')
    setEmail('')
    setPhone('')
    setCity('')
    setCompanyName('')
  }

  if (error) {
    throw new Error(error)
  }

  return (
    <div className="form-wrapper">
      <form onSubmit={handleSubmit}>
        <h3 className="form-title">Register Employee</h3>
        
        

        <div className="form-group">
          <label>Full Name</label>
          <input className="form-input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Leanne Graham" />
        </div>

        <div className="form-group">
          <label>Username</label>
          <input className="form-input" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="leanne.g" />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input className="form-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="leanne@company.com" />
        </div>

        <div className="form-group">
          <label>Phone <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>(optional)</span></label>
          <input className="form-input" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="1-800-000-0000" />
        </div>

        <div className="form-group">
          <label>City <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>(optional)</span></label>
          <input className="form-input" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Lagos" />
        </div>

        <div className="form-group">
          <label>Company <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>(optional)</span></label>
          <input className="form-input" value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="Acme Corp" />
        </div>

        <button className="form-submit" type="submit">Register Employee</button>
      </form>
    </div>
  )
}