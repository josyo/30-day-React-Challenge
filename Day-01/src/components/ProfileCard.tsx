import { useState } from 'react'
import '../App.css'

export type Profile = {
  name: string
  role: "Developer" | "Owner" | "Guest"
  goal: string
}

const INITIAL_SKILLS: string[] = [
  "HTML",
  "CSS",
  "JavaScript",
  "React"
]

export function ProfileCard({ name, role, goal }: Profile) {
  const [hours, setHours] = useState<number>(0)
  const [newSkill, setNewSkill] = useState<string>('')
  const [skillSet, setSkillSet] = useState<string[]>(INITIAL_SKILLS)

  const handleAddSkill = () => {
    if (newSkill.trim() === '') return
    setSkillSet([...skillSet, newSkill.trim()])
    setNewSkill('')
  }

  return (
    <div className="card-container">
      {/* Profile Header */}
      <div className="profile-header">
        <div className="avatar-placeholder">{name.charAt(0)}</div>
        <div>
          <h1 className="profile-name">{name}</h1>
          <span className="badge">{role}</span>
        </div>
      </div>

      <div className="goal-section">
        <p className="section-label">Current Goal</p>
        <p className="goal-text">“ {goal} ”</p>
      </div>

      <hr className="divider" />

      {/* Tracker Section */}
      <div className="tracker-row">
        <div>
          <p className="section-label">Progress Tracker</p>
          <h2 className="counter-text">Hours Studied: <span className="highlight">{hours}h</span></h2>
        </div>
        <button className="btn-counter" onClick={() => setHours(prev => prev + 1)}>+</button>
      </div>

      <hr className="divider" />

      {/* Skills Section */}
      <div className="skills-section">
        <div className="skills-header">
          <p className="section-label">Skills Trained Today</p>
          <span className="count-tag">{skillSet.length} Total</span>
        </div>
        
        <ul className="skills-list">
          {skillSet.map((skill, index) => (
            <li key={index} className="skill-item">{skill}</li>
          ))}
        </ul>
      </div>

      {/* Input Action Group */}
      <div className="input-group">
        <input
          type="text"
          className="skill-input"
          placeholder="Add a new skill..."
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAddSkill()}
        />
        <button className="btn-primary" onClick={handleAddSkill}>
          Add Skill
        </button>
      </div>
    </div>
  )
}