import { Task } from '@/types/task'

export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Приготовить смету...',
    deadline: '10 ноября 2025',
    assignee: {
      name: 'Иван Петров',
      avatar: '/avatars/user1.jpg',
    },
    priority: 'low',
    progress: {
      completed: 36,
      total: 49,
    },
    type: 'client',
    status: 'new',
    icon: '🎯',
  },
  {
    id: '2',
    title: 'Приготовить смету...',
    deadline: '10 ноября 2025',
    assignee: {
      name: 'Мария Сидорова',
      avatar: '/avatars/user2.jpg',
    },
    priority: 'medium',
    progress: {
      completed: 36,
      total: 49,
    },
    type: 'deal',
    status: 'in_progress',
    icon: '📊',
  },
  {
    id: '3',
    title: 'Приготовить смету...',
    deadline: '10 ноября 2025',
    assignee: {
      name: 'Алексей Иванов',
      avatar: '/avatars/user3.jpg',
    },
    priority: 'low',
    progress: {
      completed: 49,
      total: 49,
    },
    type: 'client',
    status: 'completed',
    icon: '🎨',
  },
  {
    id: '4',
    title: 'Приготовить смету...',
    deadline: '10 ноября 2025',
    assignee: {
      name: 'Елена Смирнова',
      avatar: '/avatars/user4.jpg',
    },
    priority: 'high',
    progress: {
      completed: 36,
      total: 49,
    },
    type: 'deal',
    status: 'overdue',
    icon: '📋',
  },
  {
    id: '5',
    title: 'Приготовить смету...',
    deadline: '10 ноября 2025',
    assignee: {
      name: 'Дмитрий Козлов',
      avatar: '/avatars/user5.jpg',
    },
    priority: 'high',
    progress: {
      completed: 36,
      total: 49,
    },
    type: 'deal',
    status: 'in_progress',
    icon: '⚡',
  },
  {
    id: '6',
    title: 'Приготовить смету...',
    deadline: '10 ноября 2025',
    assignee: {
      name: 'Анна Волкова',
      avatar: '/avatars/user6.jpg',
    },
    priority: 'low',
    progress: {
      completed: 49,
      total: 49,
    },
    type: 'client',
    status: 'completed',
    icon: 'F',
  },
  {
    id: '7',
    title: 'Приготовить смету...',
    deadline: '10 ноября 2025',
    assignee: {
      name: 'Сергей Новиков',
      avatar: '/avatars/user7.jpg',
    },
    priority: 'medium',
    progress: {
      completed: 36,
      total: 49,
    },
    type: 'deal',
    status: 'in_progress',
    icon: '🎯',
  },
]
