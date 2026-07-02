export interface TeamMember {
  id: string
  name: string
  initials: string
  color: string
}

export const TEAM_MEMBERS: TeamMember[] = [
  { id: 'tm_1', name: 'Sarah Johnson', initials: 'SJ', color: '#8b5cf6' },
  { id: 'tm_2', name: 'Mike Reyes', initials: 'MR', color: '#06b6d4' },
  { id: 'tm_3', name: 'Priya Patel', initials: 'PP', color: '#f59e0b' },
  { id: 'tm_4', name: 'David Chen', initials: 'DC', color: '#10b981' },
  { id: 'tm_5', name: 'Amara Okafor', initials: 'AO', color: '#ec4899' },
]