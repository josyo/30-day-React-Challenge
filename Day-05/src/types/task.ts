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

interface  Category {
  name: string
  focusArea: string
  billingCode: string
}


// --- Core entity ---
export interface Task {
  id: number;
  title: string;
  summary: string;
  reporterEmail: string;
  contactPhone: string;
  referenceUrl: string;
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