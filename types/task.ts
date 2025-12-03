export type TaskStatus = 'new' | 'in_progress' | 'completed' | 'overdue'

export type TaskPriority = 'low' | 'medium' | 'high'

export type TaskType = 'client' | 'deal'

export interface Task {
  id: string
  title: string
  deadline: string
  assignee: {
    name: string
    avatar: string
  }
  priority: TaskPriority
  progress: {
    completed: number
    total: number
  }
  type: TaskType
  status: TaskStatus
  icon: string
}

export interface TaskFilter {
  status: TaskStatus | 'all'
  month: string
  view: 'cards' | 'list'
}
