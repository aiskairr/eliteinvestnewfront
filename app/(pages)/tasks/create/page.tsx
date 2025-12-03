"use client"

import { Suspense, useMemo, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Task, TaskPriority, TaskStatus, TaskType } from '@/types/task'

const statusOptions = [
  { value: 'new', label: 'Новый' },
  { value: 'in_progress', label: 'В работе' },
  { value: 'completed', label: 'Завершен' },
  { value: 'overdue', label: 'Просрочен' },
]

const attachmentActions = [
  { id: 'upload', label: 'Загрузить', description: 'Перетащите или загрузите файлы' },
]

const priorityOptions: TaskPriority[] = ['low', 'medium', 'high']
const typeOptions: TaskType[] = ['client', 'deal']

const statusIcons: Record<TaskStatus, string> = {
  new: '🆕',
  in_progress: '⚙️',
  completed: '✅',
  overdue: '⏰',
}

function CreateTaskPageInner() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const statusParam = (searchParams?.get('status') as TaskStatus) || 'new'

  const [form, setForm] = useState({
    title: '',
    description: '',
    assignee: '',
    priority: 'medium' as TaskPriority,
    type: 'client' as TaskType,
    clientName: '',
  })

  const currentStatusLabel = useMemo(() => {
    return statusOptions.find((option) => option.value === statusParam)?.label || 'Новый'
  }, [statusParam])

  const handleBack = () => {
    router.back()
  }

  const handleChange = <K extends keyof typeof form>(field: K, value: (typeof form)[K]) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!form.title.trim()) {
      alert('Введите название задачи')
      return
    }

    const newTask: Task = {
      id: Date.now().toString(),
      title: form.title,
      deadline: '10 ноября 2025',
      assignee: {
        name: form.assignee || 'Без исполнителя',
        avatar: '/avatars/user1.jpg',
      },
      priority: form.priority,
      progress: {
        completed: 0,
        total: 1,
      },
      type: form.type,
      status: statusParam,
      icon: statusIcons[statusParam],
    }

    try {
      const existing =
        typeof window !== 'undefined'
          ? (JSON.parse(window.localStorage.getItem('customTasks') ?? '[]') as Task[])
          : []
      const updated = [...existing, newTask]
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('customTasks', JSON.stringify(updated))
      }
      router.push('/tasks')
    } catch (error) {
      console.error('Failed to save task', error)
      alert('Не удалось создать задачу. Попробуйте ещё раз.')
    }
  }

  return (
    <div className="min-h-screen bg-[#f6f7fb] px-6 py-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Задачи / Создать задачу</p>
            <h1 className="text-3xl font-semibold text-gray-900">Создать задачу</h1>
          </div>
          <Button
            variant="ghost"
            className="rounded-2xl border border-gray-200 bg-white text-gray-700"
            onClick={handleBack}
          >
            Назад
          </Button>
        </div>

        <div className="space-y-6 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
          <section>
            <h2 className="text-lg font-semibold text-gray-900">Общая информация</h2>
            <div className="mt-4 grid gap-4 lg:grid-cols-4">
              <div className="lg:col-span-2 space-y-2">
                <label className="text-sm font-medium text-gray-600">Заголовок</label>
                <Input
                  value={form.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  placeholder="Введите заголовок"
                  className="rounded-2xl border-gray-200"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-600">Тип задачи</label>
                <select
                  value={form.type}
                  onChange={(e) => handleChange('type', e.target.value as TaskType)}
                  className="w-full rounded-2xl border border-gray-200 bg-white px-3 py-2 text-sm"
                >
                  {typeOptions.map((type) => (
                    <option key={type} value={type}>
                      {type === 'client' ? 'Клиент' : 'Сделка'}
                    </option>
                  ))}
                </select>
              </div>
              <div className="lg:col-span-2 space-y-2">
                <label className="text-sm font-medium text-gray-600">Исполнитель</label>
                <Input
                  value={form.assignee}
                  onChange={(e) => handleChange('assignee', e.target.value)}
                  placeholder="Выберите исполнителя"
                  className="rounded-2xl border-gray-200"
                />
              </div>
              <div className="lg:col-span-2 space-y-2">
                <label className="text-sm font-medium text-gray-600">Привязка</label>
                <div className="flex gap-3 rounded-2xl border border-gray-200 bg-gray-50 p-3">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                    Клиент
                  </label>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <input type="checkbox" className="rounded border-gray-300" />
                    Сделка
                  </label>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-600">Приоритет</label>
                <select
                  value={form.priority}
                  onChange={(e) => handleChange('priority', e.target.value as TaskPriority)}
                  className="w-full rounded-2xl border border-gray-200 bg-white px-3 py-2 text-sm"
                >
                  {priorityOptions.map((priority) => (
                    <option key={priority} value={priority}>
                      {priority === 'low'
                        ? 'Низкий'
                        : priority === 'medium'
                          ? 'Средний'
                          : 'Высокий'}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-600">Дедлайн</label>
                <div className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-600">
                  4 октября, 2025
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-600">Статус</label>
                <div className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900">
                  {currentStatusLabel}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-600">Имя клиента</label>
                <Input
                  value={form.clientName}
                  onChange={(e) => handleChange('clientName', e.target.value)}
                  placeholder="Введите имя клиента"
                  className="rounded-2xl border-gray-200"
                />
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <label className="text-sm font-medium text-gray-600">Введите описание</label>
              <Textarea
                value={form.description}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder="Опишите задачу"
                className="min-h-[120px] rounded-2xl border-gray-200"
              />
            </div>
          </section>

          <section className="grid gap-4 lg:grid-cols-3">
            <div className="rounded-3xl border border-dashed border-gray-200 bg-gray-50 p-6">
              <div className="rounded-2xl bg-white p-4 text-center shadow">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                  <span className="text-2xl">🧑‍💻</span>
                </div>
                <p className="mt-3 text-sm text-gray-500">Загрузите аватарку</p>
                <Button variant="ghost" className="mt-3 rounded-2xl border border-gray-200">
                  Загрузить
                </Button>
              </div>
            </div>
            {attachmentActions.map((action) => (
              <div
                key={action.id}
                className="rounded-3xl border border-dashed border-gray-200 bg-gray-50 p-6 text-center"
              >
                <p className="text-base font-semibold text-gray-900">{action.label}</p>
                <p className="mt-2 text-sm text-gray-500">{action.description}</p>
                <Button className="mt-4 rounded-2xl bg-orange-500 text-white hover:bg-orange-600">
                  {action.label}
                </Button>
              </div>
            ))}
          </section>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Задачи</h2>
            <Button variant="ghost" className="rounded-2xl text-orange-500">
              + Добавить задачу
            </Button>
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            {[1, 2].map((card) => (
              <div key={card} className="space-y-2 rounded-3xl border border-gray-100 p-4">
                <Input placeholder="Заголовок задачи" className="rounded-2xl border-gray-200" />
                <Textarea
                  placeholder="Введите описание задачи"
                  className="min-h-[100px] rounded-2xl border-gray-200"
                />
              </div>
            ))}
            <div className="flex items-center justify-center rounded-3xl border-2 border-dashed border-gray-200 py-10 text-sm font-semibold text-gray-400">
              + Добавить задачу
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="ghost"
              className="rounded-2xl border border-gray-200 bg-white text-gray-700"
              onClick={handleBack}
            >
              Отмена
            </Button>
            <Button type="submit" className="rounded-2xl bg-orange-500 px-6 text-white hover:bg-orange-600">
              Создать задачу
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function CreateTaskPage() {
  return (
    <Suspense fallback={<div className="p-6">Загрузка...</div>}>
      <CreateTaskPageInner />
    </Suspense>
  )
}
