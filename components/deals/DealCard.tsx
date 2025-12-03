import { Deal } from '@/types/deal'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card } from '@/components/ui/card'
import { MoreVertical } from 'lucide-react'

interface DealCardProps {
  deal: Deal
}

const statusMeta: Record<
  Deal['status'],
  {
    text: string
    dot: string
    badge: string
  }
> = {
  new: {
    text: 'Новый',
    dot: 'bg-[#3B7DFF]',
    badge: 'text-[#3B7DFF]',
  },
  in_progress: {
    text: 'В работе',
    dot: 'bg-[#FFB703]',
    badge: 'text-[#FFB703]',
  },
  negotiation: {
    text: 'Согласование',
    dot: 'bg-[#22C55E]',
    badge: 'text-[#22C55E]',
  },
  closed: {
    text: 'Закрыта',
    dot: 'bg-[#A855F7]',
    badge: 'text-[#A855F7]',
  },
}

export function DealCard({ deal }: DealCardProps) {
  const statusInfo = statusMeta[deal.status]

  return (
    <Card className="rounded-3xl border border-gray-100 bg-white/90 p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-gray-900">{deal.title}</h3>
          <p className="text-sm text-gray-500">{deal.company}</p>
        </div>
        <button className="text-gray-400 transition hover:text-gray-700" aria-label="Настройки сделки">
          <MoreVertical className="h-5 w-5" />
        </button>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={deal.manager.avatar} alt={deal.manager.name} />
            <AvatarFallback>{deal.manager.name[0]}</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium text-gray-900">{deal.manager.name}</span>
        </div>
        <span className={`flex items-center gap-2 text-sm font-semibold ${statusInfo.badge}`}>
          <span className={`h-2 w-2 rounded-full ${statusInfo.dot}`} />
          {statusInfo.text}
        </span>
      </div>

      <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
        <div>
          <p className="font-medium text-gray-600">Старт</p>
          <p>{deal.startDate}</p>
        </div>
        <div>
          <p className="font-medium text-gray-600">Дедлайн</p>
          <p>{deal.endDate}</p>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 rounded-2xl bg-gray-50 px-3 py-2 text-sm font-semibold text-gray-900">
        <span>💰</span>
        <span>{deal.amount.toLocaleString('ru-RU')} сом</span>
      </div>

      {deal.result && (
        <div className="mt-3">
          {deal.result === 'won' ? (
            <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
              ✓ Выиграна
            </span>
          ) : (
            <span className="inline-flex items-center rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-600">
              ✕ Проиграна
            </span>
          )}
        </div>
      )}

      <div className="mt-4 space-y-2">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>Прогресс</span>
          <span className="font-semibold text-gray-900">{deal.progress}%</span>
        </div>
        <div className="h-2 rounded-full bg-gray-100">
          <div
            className={`h-full rounded-full bg-gradient-to-r from-blue-400 to-blue-600 transition-all`}
            style={{ width: `${deal.progress}%` }}
          />
        </div>
      </div>
    </Card>
  )
}
