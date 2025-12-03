import { DealStatus } from '@/types/deal'

interface DealFiltersProps {
  activeStatus: DealStatus | 'all'
  onStatusChange: (status: DealStatus | 'all') => void
  counts: {
    new: number
    in_progress: number
    negotiation: number
    closed: number
  }
}

const statusConfig = [
  { id: 'new' as const, label: 'Новые', color: 'bg-blue-100 text-blue-700' },
  { id: 'in_progress' as const, label: 'В работе', color: 'bg-yellow-100 text-yellow-700' },
  { id: 'negotiation' as const, label: 'Согласование', color: 'bg-green-100 text-green-700' },
  { id: 'closed' as const, label: 'Закрыта', color: 'bg-gray-100 text-gray-700' },
]

export function DealFilters({ activeStatus, onStatusChange, counts }: DealFiltersProps) {
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
