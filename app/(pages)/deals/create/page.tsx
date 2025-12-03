"use client"

import { Suspense, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Deal, DealStatus, DealResult } from '@/types/deal'

const statusOptions: Record<DealStatus, string> = {
  new: 'Новые',
  in_progress: 'В работе',
  negotiation: 'Согласование',
  closed: 'Закрыта',
}

function CreateDealPageInner() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const statusParam = (searchParams?.get('status') as DealStatus) || 'new'

  const [form, setForm] = useState({
    title: '',
    manager: '',
    company: '',
    startDate: '2025-10-04',
    endDate: '2025-10-04',
    amount: '',
    progress: 28,
    result: 'won' as DealResult,
  })

  const canSubmit = form.title.trim() && form.manager.trim() && form.company.trim()

  const handleChange = <K extends keyof typeof form>(field: K, value: (typeof form)[K]) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!canSubmit) {
      alert('Заполните обязательные поля')
      return
    }

    const newDeal: Deal = {
      id: Date.now().toString(),
      title: form.title,
      company: form.company,
      manager: {
        name: form.manager,
        avatar: '/avatars/user1.jpg',
      },
      status: statusParam,
      startDate: new Date(form.startDate).toLocaleDateString('ru-RU'),
      endDate: new Date(form.endDate).toLocaleDateString('ru-RU'),
      amount: Number(form.amount) || 0,
      progress: form.progress,
      result: statusParam === 'closed' ? form.result : null,
    }

    try {
      const existing =
        typeof window !== 'undefined'
          ? (JSON.parse(window.localStorage.getItem('customDeals') ?? '[]') as Deal[])
          : []
      const updated = [...existing, newDeal]
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('customDeals', JSON.stringify(updated))
      }
      router.push('/deals')
    } catch (error) {
      console.error('Failed to save deal', error)
      alert('Не удалось создать сделку. Попробуйте ещё раз.')
    }
  }

  return (
    <div className="min-h-screen bg-[#f6f7fb] px-6 py-8">
      <div className="mx-auto max-w-[1200px] space-y-6">
        <div>
          <p className="text-sm text-gray-500">
            Сделки / Новая сделка ({statusOptions[statusParam]})
          </p>
          <h1 className="text-3xl font-semibold text-gray-900">Новая сделка</h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-[32px] border border-gray-100 bg-white p-8 shadow-sm"
        >
          <div className="rounded-[28px] bg-[#f6f7fb] p-6">
            <h2 className="text-lg font-semibold text-gray-900">Общая информация</h2>
            <div className="mt-6 grid gap-5 md:grid-cols-3">
              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-medium text-gray-500">Название</label>
                <Input
                  placeholder="Введите название сделки"
                  value={form.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  className="h-12 rounded-2xl border-gray-200 bg-white"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-500">Исполнитель</label>
                <Input
                  placeholder="Выберите исполнителя"
                  value={form.manager}
                  onChange={(e) => handleChange('manager', e.target.value)}
                  className="h-12 rounded-2xl border-gray-200 bg-white"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-500">Клиент</label>
                <Input
                  placeholder="Введите название клиента"
                  value={form.company}
                  onChange={(e) => handleChange('company', e.target.value)}
                  className="h-12 rounded-2xl border-gray-200 bg-white"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-500">Сумма</label>
                <Input
                  placeholder="Введите сумму сделки"
                  type="number"
                  value={form.amount}
                  onChange={(e) => handleChange('amount', e.target.value)}
                  className="h-12 rounded-2xl border-gray-200 bg-white"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-500">Дата создания</label>
                <Input
                  type="date"
                  value={form.startDate}
                  onChange={(e) => handleChange('startDate', e.target.value)}
                  className="h-12 rounded-2xl border-gray-200 bg-white"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-500">Дата закрытия</label>
                <Input
                  type="date"
                  value={form.endDate}
                  onChange={(e) => handleChange('endDate', e.target.value)}
                  className="h-12 rounded-2xl border-gray-200 bg-white"
                />
              </div>
              <div className="space-y-2 md:col-span-1">
                <label className="text-sm font-medium text-gray-500">Прогресс</label>
                <div className="rounded-2xl bg-white px-4 py-3">
                  <div className="relative h-8 rounded-full bg-gray-100">
                    <div
                      className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-blue-400 to-blue-600"
                      style={{ width: `${form.progress}%` }}
                    />
                    <span className="absolute inset-y-0 right-3 flex items-center text-xs font-semibold text-gray-900">
                      {form.progress}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={form.progress}
                    onChange={(e) => handleChange('progress', Number(e.target.value))}
                    className="mt-3 w-full accent-blue-500"
                  />
                </div>
              </div>
            </div>

            {statusParam === 'closed' && (
              <div className="mt-6 space-y-2 md:w-1/3">
                <label className="text-sm font-medium text-gray-500">Результат</label>
                <select
                  value={form.result ?? 'won'}
                  onChange={(e) => handleChange('result', e.target.value as DealResult)}
                  className="w-full rounded-2xl border border-gray-200 bg-white px-3 py-2 text-sm"
                >
                  <option value="won">Выиграна</option>
                  <option value="lost">Проиграна</option>
                </select>
              </div>
            )}
          </div>

          <div className="mt-6 flex gap-4">
            <Button
              type="button"
              variant="outline"
              className="min-w-[140px] rounded-2xl border-gray-200 bg-white text-gray-700"
              onClick={() => router.back()}
            >
              Отмена
            </Button>
            <Button
              type="submit"
              disabled={!canSubmit}
              className="min-w-[140px] rounded-2xl bg-orange-500 px-6 text-white hover:bg-orange-600 disabled:opacity-40"
            >
              Добавить
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function CreateDealPage() {
  return (
    <Suspense fallback={<div className="p-6">Загрузка...</div>}>
      <CreateDealPageInner />
    </Suspense>
  )
}
