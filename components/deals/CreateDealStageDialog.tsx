import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { DealStatus } from '@/types/deal'
import { Plus } from 'lucide-react'

interface CreateDealStageDialogProps {
  open: boolean
  onClose: () => void
  onSelect: (status: DealStatus) => void
}

const stageOptions: Array<{
  id: DealStatus
  title: string
  description: string
}> = [
  { id: 'new', title: 'Новые', description: 'Только созданы, ждут начала работы' },
  { id: 'in_progress', title: 'В работе', description: 'Выполняются прямо сейчас' },
  { id: 'negotiation', title: 'Согласование', description: 'Успешно выполняются и закрыты' },
  { id: 'closed', title: 'Закрыта', description: 'Не выполнены в срок' },
]

export function CreateDealStageDialog({
  open,
  onClose,
  onSelect,
}: CreateDealStageDialogProps) {
  const handleSelect = (status: DealStatus) => {
    onSelect(status)
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        showCloseButton={false}
        className="max-w-md rounded-3xl border-0 bg-white/95 px-0 py-6 text-center shadow-xl"
      >
        <DialogTitle className="sr-only">Новая сделка</DialogTitle>
        <div className="px-8">
          <h3 className="text-2xl font-semibold text-gray-900">Новая сделка</h3>
          <p className="mt-1 text-sm text-gray-500">
            Выберите, на каком этапе находится сделка
          </p>
        </div>

        <div className="mt-4 space-y-3 px-6">
          {stageOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => handleSelect(option.id)}
              className="flex w-full items-center gap-3 rounded-2xl bg-gray-50 px-5 py-3 text-left text-gray-900 transition hover:bg-gray-100"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white shadow-sm">
                <Plus className="h-4 w-4 text-orange-500" />
              </span>
              <div>
                <p className="font-semibold">{option.title}</p>
                <p className="text-sm text-gray-500">{option.description}</p>
              </div>
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
