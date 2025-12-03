import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Illustration15 from '@/public/Illustration15.svg'

interface TaskEmptyStateProps {
  onCreate?: () => void
}

export function TaskEmptyState({ onCreate }: TaskEmptyStateProps) {
  return (
    <div className="flex h-[calc(100vh-250px)] flex-col items-center justify-center rounded-3xl border border-dashed border-gray-200 bg-white/80 text-center">
      <div className="relative h-48 w-48">
        <Image
          src={Illustration15}
          alt="Нет задач"
          fill
          sizes="192px"
          className="object-contain"
        />
      </div>
      <h3 className="mt-6 text-2xl font-semibold text-gray-900">Список задач пуст</h3>
      <p className="mt-2 max-w-sm text-sm text-gray-500">
        Создайте задачу, чтобы распределить работу и следить за сроками выполнения
      </p>
      <Button
        onClick={onCreate}
        className="mt-6 rounded-2xl bg-orange-500 px-6 text-white hover:bg-orange-600"
      >
        + Создать задачу
      </Button>
    </div>
  )
}
