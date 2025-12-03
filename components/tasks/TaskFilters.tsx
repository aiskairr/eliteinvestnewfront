import { TaskStatus } from '@/types/task'

interface TaskFiltersProps {
  activeStatus: TaskStatus | 'all'
  onStatusChange: (status: TaskStatus | 'all') => void
  counts: {
    new: number
    in_progress: number
    completed: number
    overdue: number
  }
}

const statusConfig = [
  { id: 'new' as const, label: 'Новые', color: 'bg-blue-100 text-blue-700' },
  { id: 'in_progress' as const, label: 'В работе', color: 'bg-yellow-100 text-yellow-700' },
  { id: 'completed' as const, label: 'Завершенные', color: 'bg-green-100 text-green-700' },
  { id: 'overdue' as const, label: 'Просроченные', color: 'bg-red-100 text-red-700' },
]

export function TaskFilters({ activeStatus, onStatusChange, counts }: TaskFiltersProps) {
  return (
    <div className="flex items-center gap-3 flex-wrap">
      {statusConfig.map((status) => (
        <button
          key={status.id}
          onClick={() => onStatusChange(status.id)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            activeStatus === status.id
              ? 'bg-gray-900 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
          }`}
        >
          <span>+ {status.label}</span>
          <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
            activeStatus === status.id ? 'bg-white/20 text-white' : status.color
          }`}>
            {counts[status.id]}
          </span>
        </button>
      ))}
    </div>
  )
}
