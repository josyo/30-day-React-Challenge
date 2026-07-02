interface ExecutionLocation {
  room: string
  floor: string
  building: string
  zoneCode: string
  coordinates: {
    lat: string
    lng: string
  }
}

interface Category {
  name: string
  focusArea: string
  billingCode: string
}

export interface Subtask {
  id: string
  title: string
  done: boolean
}

export interface ActivityEntry {
  id: string
  message: string
  timestamp: string
}

// --- Core entity ---
export interface Task {
  id: number;
  title: string;
  summary: string;
  reporterEmail: string;
  contactPhone: string;
  referenceUrl: string;
  status: 'COMPLETED' | 'IN_PROGRESS' | 'TODO'
  priority: 'LOW' | 'MEDIUM' | 'HIGH'
  dueDate: string
  tags: string[]
  estimatedHours: number
  trackedHours: number
  assignees: string[]
  subtasks: Subtask[]
  activity: ActivityEntry[]
  location: ExecutionLocation;
  category: Category;
}

export interface TaskListProps {
  selectedTask: Task | null
  onSelectTask: (task: Task) => void
}

export interface TaskCardProps {
  task: Task
  isSelected: boolean
  onSelectTask: (task: Task) => void
  onDelete: (id: number) => void
  onUpdateStatus: (task: Task, newStatus: Task['status']) => void
  isUpdatingStatus: boolean
}

export interface TaskDetailsProps {
  value: Task | null
  onChange: (task: Task | null) => void
}

export interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}

export interface AddTaskFormProps {
  onAddTask: (task: Omit<Task, 'id'>) => void
}

export interface StatusDropdownProps {
    task: Task;
    onUpdateStatus: (task: Task, mewStatus: Task["status"]) => void
}