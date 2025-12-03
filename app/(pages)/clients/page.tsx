'use client'

import Link from 'next/link'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Checkbox } from '@/components/ui/checkbox'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Dialog, DialogClose, DialogContent } from '@/components/ui/dialog'
import {
  MoreHorizontal,
  CircleDollarSign,
  ChevronLeft,
  ChevronRight,
  Plus,
  FileText,
  Trash2,
  X,
} from 'lucide-react'

type ClientStatus = 'Активный' | 'Холодный' | 'Потенциальный'
type InteractionStatus = 'Звонок' | 'Встреча' | 'Письмо'

interface ClientHistoryItem {
  date: string
  description: string
  status: InteractionStatus
}

interface ClientDealItem {
  id: string
  title: string
  subtitle: string
  fileSize: string
}

interface ClientFinance {
  totalOrders: string
  paid: string
  debt: string
  paymentTerms: string
}

interface ClientDetails {
  notes: string
  history: ClientHistoryItem[]
  deals: ClientDealItem[]
  finance: ClientFinance
}

interface ClientRow {
  id: string
  company: string
  contactName: string
  contactAvatar?: string
  contactRole?: string
  phone: string
  flag: string
  deals: number
  total: string
  segment: string
  tags: string[]
  status: ClientStatus
  details: ClientDetails
}

const historyStatusColors: Record<InteractionStatus, string> = {
  Звонок: 'text-blue-600',
  Встреча: 'text-emerald-600',
  Письмо: 'text-orange-500',
}

const sharedDetails: ClientDetails = {
  notes:
    'Клиент предпочитает общение по телефону, решения принимает после одобрения руководителя. Планирует новые закупки в декабре.',
  history: [
    { date: '05.11.2025', description: 'Уточнение сроков поставки', status: 'Звонок' },
    { date: '10.10.2025', description: 'Обсуждение договора', status: 'Встреча' },
    { date: '20.10.2025', description: 'Отправлено КП', status: 'Письмо' },
    { date: '12.10.2025', description: 'Обсуждение договора', status: 'Встреча' },
    { date: '10.10.2025', description: 'Отправлено КП', status: 'Письмо' },
  ],
  deals: [
    { id: 'd1', title: 'Договор №245 с СК «Высота»', subtitle: 'Договор и спецификация', fileSize: '5.6 MB' },
    { id: 'd2', title: 'Приложение №1 к договору', subtitle: 'Дополнительное соглашение', fileSize: '5.6 MB' },
    { id: 'd3', title: 'Приложение №2 к договору', subtitle: 'Файлы согласования', fileSize: '5.6 MB' },
  ],
  finance: {
    totalOrders: '4 580 000 сом',
    paid: '3 950 000 сом',
    debt: '630 000 сом',
    paymentTerms: '50% предоплата | 50% по факту поставки',
  },
}

const rows: ClientRow[] = [
  {
    id: '1',
    company: 'Osmon Group',
    contactName: 'Natali Craig',
    contactAvatar: 'https://i.pravatar.cc/96?img=5',
    contactRole: 'Контактное лицо',
    phone: '+7 701 123 4567',
    flag: '🇰🇿',
    deals: 13,
    total: '1 324 000',
    segment: 'Подрядчик',
    tags: ['Подрядчик'],
    status: 'Активный',
    details: sharedDetails,
  },
  {
    id: '2',
    company: 'РемСтройСервис Ст...',
    contactName: 'Kate Morrison',
    contactAvatar: 'https://i.pravatar.cc/96?img=47',
    contactRole: 'Контактное лицо',
    phone: '+7 701 123 4567',
    flag: '🇷🇺',
    deals: 13,
    total: '1 324 000',
    segment: 'Подрядчик',
    tags: ['Подрядчик', 'VIP'],
    status: 'Потенциальный',
    details: sharedDetails,
  },
  {
    id: '3',
    company: 'Erkin Design',
    contactName: 'Drew Cano',
    contactAvatar: 'https://i.pravatar.cc/96?img=32',
    contactRole: 'Контактное лицо',
    phone: '+996 700 700 700',
    flag: '🇰🇬',
    deals: 15,
    total: '1 324 000',
    segment: 'Подрядчик',
    tags: ['Подрядчик'],
    status: 'Холодный',
    details: sharedDetails,
  },
  {
    id: '4',
    company: 'РемСтройСервис Ст...',
    contactName: 'Orlando Diggs',
    contactAvatar: 'https://i.pravatar.cc/96?img=4',
    contactRole: 'Контактное лицо',
    phone: '+996 700 700 700',
    flag: '🇰🇬',
    deals: 43,
    total: '1 324 000',
    segment: 'Подрядчик',
    tags: ['Подрядчик'],
    status: 'Потенциальный',
    details: sharedDetails,
  },
  {
    id: '5',
    company: 'Erkin Design',
    contactName: 'Andi Lane',
    contactAvatar: 'https://i.pravatar.cc/96?img=57',
    contactRole: 'Контактное лицо',
    phone: '+998 90 123 4567',
    flag: '🇺🇿',
    deals: 12,
    total: '1 324 000',
    segment: 'Подрядчик',
    tags: ['Подрядчик'],
    status: 'Активный',
    details: sharedDetails,
  },
  {
    id: '6',
    company: 'Osmon Group',
    contactName: 'Natali Craig',
    contactAvatar: 'https://i.pravatar.cc/96?img=65',
    contactRole: 'Контактное лицо',
    phone: '+996 700 700 700',
    flag: '🇰🇬',
    deals: 21,
    total: '1 324 000',
    segment: 'Подрядчик',
    tags: ['Подрядчик', 'Потенциальный'],
    status: 'Холодный',
    details: sharedDetails,
  },
  {
    id: '7',
    company: 'Erkin Design',
    contactName: 'Kate Morrison',
    contactAvatar: 'https://i.pravatar.cc/96?img=22',
    contactRole: 'Контактное лицо',
    phone: '+996 700 700 700',
    flag: '🇰🇬',
    deals: 45,
    total: '1 324 000',
    segment: 'Подрядчик',
    tags: ['Подрядчик'],
    status: 'Активный',
    details: sharedDetails,
  },
  {
    id: '8',
    company: 'Osmon Group',
    contactName: 'Drew Cano',
    contactAvatar: 'https://i.pravatar.cc/96?img=13',
    contactRole: 'Контактное лицо',
    phone: '+998 90 123 4567',
    flag: '🇺🇿',
    deals: 32,
    total: '1 324 000',
    segment: 'Подрядчик',
    tags: ['Подрядчик'],
    status: 'Холодный',
    details: sharedDetails,
  },
  {
    id: '9',
    company: 'РемСтройСервис Ст...',
    contactName: 'Orlando Diggs',
    contactAvatar: 'https://i.pravatar.cc/96?img=16',
    contactRole: 'Контактное лицо',
    phone: '+996 700 700 700',
    flag: '🇰🇬',
    deals: 11,
    total: '1 324 000',
    segment: 'Подрядчик',
    tags: ['Подрядчик'],
    status: 'Потенциальный',
    details: sharedDetails,
  },
  {
    id: '10',
    company: 'Osmon Group',
    contactName: 'Andi Lane',
    contactAvatar: 'https://i.pravatar.cc/96?img=14',
    contactRole: 'Контактное лицо',
    phone: '+996 700 700 700',
    flag: '🇰🇬',
    deals: 32,
    total: '1 324 000',
    segment: 'Подрядчик',
    tags: ['Подрядчик'],
    status: 'Активный',
    details: sharedDetails,
  },
  {
    id: '11',
    company: 'Osmon Group',
    contactName: 'Orlando Diggs',
    contactAvatar: 'https://i.pravatar.cc/96?img=67',
    contactRole: 'Контактное лицо',
    phone: '+998 90 123 4567',
    flag: '🇺🇿',
    deals: 11,
    total: '1 324 000',
    segment: 'Подрядчик',
    tags: ['Подрядчик'],
    status: 'Потенциальный',
    details: sharedDetails,
  },
  {
    id: '12',
    company: 'Осmon Group',
    contactName: 'Andi Lane',
    contactAvatar: 'https://i.pravatar.cc/96?img=23',
    contactRole: 'Контактное лицо',
    phone: '+996 700 700 700',
    flag: '🇰🇬',
    deals: 32,
    total: '1 324 000',
    segment: 'Подрядчик',
    tags: ['Подрядчик'],
    status: 'Активный',
    details: sharedDetails,
  },
]

function StatusPill({ status }: { status: ClientStatus }) {
  const color =
    status === 'Активный'
      ? 'text-green-600'
      : status === 'Холодный'
        ? 'text-blue-600'
        : 'text-amber-500'

  return (
    <div className={`flex items-center gap-2 ${color}`}>
      <span
        className={`h-2 w-2 rounded-full ${
          status === 'Активный' ? 'bg-green-500' : status === 'Холодный' ? 'bg-blue-500' : 'bg-amber-500'
        }`}
      ></span>
      <span className="text-sm">{status}</span>
    </div>
  )
}

export default function ClientsPage() {
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [selectedClient, setSelectedClient] = useState<ClientRow | null>(null)
  const [relatedOpen, setRelatedOpen] = useState(false)
  const [activeRelatedIndex, setActiveRelatedIndex] = useState(0)

  const handleOpenDetails = (client: ClientRow) => {
    setSelectedClient(client)
    setDetailsOpen(true)
    setRelatedOpen(false)
    setActiveRelatedIndex(0)
  }

  const relatedDeals = selectedClient?.details.deals ?? []
  const relatedDates = ['20.11.2025', '05.12.2025', '12.01.2026', '20.01.2026']
  const activeDeal = relatedDeals[activeRelatedIndex] ?? null

  return (
    <div className="p-6">
      <div className="text-sm text-gray-500 mb-4">Клиенты</div>

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-gray-900">Клиенты</h2>
        <div className="flex flex-wrap items-center gap-3">
          <Input placeholder="Поиск" className="w-80" />
          <Button asChild>
            <Link href="/clients/add" className="inline-flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Добавить клиента
            </Link>
          </Button>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 overflow-hidden bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10">
                <Checkbox aria-label="select-all" />
              </TableHead>
              <TableHead>Название</TableHead>
              <TableHead>Контактное лицо</TableHead>
              <TableHead>Телефон</TableHead>
              <TableHead>Кол-во сделок</TableHead>
              <TableHead>Общая сумма</TableHead>
              <TableHead>Теги / сегменты</TableHead>
              <TableHead>Статус</TableHead>
              <TableHead className="w-10" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((r, idx) => (
              <TableRow key={r.id} className={idx === 3 ? 'bg-gray-50/60' : ''}>
                <TableCell>
                  <Checkbox aria-label={`select-${r.id}`} />
                </TableCell>
                <TableCell className="font-medium text-gray-900">{r.company}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={r.contactAvatar || ''} />
                      <AvatarFallback>{r.contactName.slice(0, 1)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-sm text-gray-900">{r.contactName}</div>
                      <div className="text-xs text-gray-500">{r.contactRole || 'Контактное лицо'}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-sm text-gray-700">
                  <div className="flex items-center gap-2">
                    <span className="text-lg leading-none">{r.flag}</span>
                    {r.phone}
                  </div>
                </TableCell>
                <TableCell className="text-sm text-gray-700">{r.deals}</TableCell>
                <TableCell className="text-sm text-gray-900 flex items-center gap-1">
                  <CircleDollarSign className="w-4 h-4 text-gray-500" /> {r.total}
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                    {r.segment}
                  </Badge>
                </TableCell>
                <TableCell>
                  <StatusPill status={r.status} />
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onSelect={(event) => {
                          event.preventDefault()
                          handleOpenDetails(r)
                        }}
                      >
                        Подробнее
                      </DropdownMenuItem>
                      <DropdownMenuItem>Редактировать</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">Удалить</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between mt-6 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1">
            <ChevronLeft className="w-4 h-4" />Назад
          </Button>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((p) => (
              <Button
                key={p}
                variant={p === 1 ? 'default' : 'outline'}
                size="sm"
                className="w-10 justify-center"
              >
                {p}
              </Button>
            ))}
          </div>
          <Button variant="outline" size="sm" className="gap-1">
            Далее<ChevronRight className="w-4 h-4" />
          </Button>
        </div>
        <div className="text-gray-500">Показаны 1–12</div>
      </div>

      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent
          showCloseButton={false}
          className="w-full border-0 bg-transparent p-0 shadow-none"
          style={{ maxWidth: 'min(1180px, calc(100vw - 2rem))' }}
        >
          {selectedClient && (
            <div className="relative max-h-[90vh] overflow-y-auto rounded-[32px] border border-gray-100 bg-white p-6 shadow-2xl md:p-10">
              <DialogClose asChild>
                <button
                  className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition hover:bg-gray-50"
                  aria-label="Закрыть"
                >
                  <X className="h-5 w-5" />
                </button>
              </DialogClose>

              <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
                <div className="space-y-6 rounded-[28px] border border-gray-100 bg-white/70 p-6 shadow-sm">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-16 w-16 border-2 border-white shadow">
                        <AvatarImage src={selectedClient.contactAvatar || ''} />
                        <AvatarFallback>{selectedClient.contactName.slice(0, 1)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="text-2xl font-semibold text-gray-900">{selectedClient.contactName}</div>
                        <p className="text-sm text-gray-500">{selectedClient.contactRole || 'Контактное лицо'}</p>
                      </div>
                    </div>
                    <Badge className="rounded-full bg-emerald-50 px-4 py-1.5 text-emerald-600">
                      {selectedClient.status}
                    </Badge>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    {[
                      { label: 'Название', value: selectedClient.company },
                      { label: 'Телефон', value: selectedClient.phone },
                      { label: 'Количество сделок', value: `${selectedClient.deals}` },
                      { label: 'Общая сумма', value: `${selectedClient.total} сом` },
                      { label: 'Теги / сегменты', value: selectedClient.tags },
                      { label: 'Статус', value: selectedClient.status },
                    ].map((card) => (
                      <div key={card.label} className="rounded-2xl border border-gray-200 p-4">
                        <div className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                          {card.label}
                        </div>
                        {Array.isArray(card.value) ? (
                          <div className="mt-2 flex flex-wrap gap-2">
                            {card.value.map((tag) => (
                              <Badge key={tag} className="bg-orange-50 px-3 py-1 text-orange-600">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        ) : card.label === 'Статус' ? (
                          <div className="mt-3">
                            <StatusPill status={selectedClient.status} />
                          </div>
                        ) : (
                          <div className="mt-2 text-base font-medium text-gray-900">{card.value}</div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div>
                    <div className="text-sm font-semibold text-gray-900">Заметки</div>
                    <p className="mt-2 rounded-2xl bg-gray-50 p-4 text-sm leading-6 text-gray-600">
                      {selectedClient.details.notes}
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="rounded-[28px] border border-gray-100 bg-white/70 p-6 shadow-sm">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <div className="text-lg font-semibold text-gray-900">История взаимодействий</div>
                        <p className="text-sm text-gray-500">Последние действия по клиенту</p>
                      </div>
                      <Button variant="outline" size="sm" className="whitespace-nowrap">
                        Посмотреть всю историю
                      </Button>
                    </div>
                    <div className="mt-4 space-y-2">
                      {selectedClient.details.history.map((item) => (
                        <div
                          key={`${item.date}-${item.description}`}
                          className="grid grid-cols-[110px,1fr,auto] items-center gap-4 rounded-2xl px-4 py-3 hover:bg-gray-50"
                        >
                          <div className="text-sm font-medium text-gray-900">{item.date}</div>
                          <div className="text-sm text-gray-700">{item.description}</div>
                          <span className={`text-sm font-semibold ${historyStatusColors[item.status]}`}>
                            {item.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-[28px] border border-gray-100 bg-white/70 p-6 shadow-sm">
                    <div className="text-lg font-semibold text-gray-900">Связанные сделки</div>
                    <div className="mt-4 space-y-3">
                      {selectedClient.details.deals.map((deal) => (
                        <button
                          key={deal.id}
                          onClick={() => {
                            const index = selectedClient.details.deals.findIndex((d) => d.id === deal.id)
                            setActiveRelatedIndex(index === -1 ? 0 : index)
                            setRelatedOpen(true)
                          }}
                          className="flex w-full items-center justify-between rounded-2xl border border-gray-100 p-4 text-left transition hover:bg-gray-50"
                        >
                          <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-50">
                              <FileText className="h-5 w-5 text-gray-500" />
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">{deal.title}</div>
                              <p className="text-sm text-gray-500">{deal.subtitle}</p>
                            </div>
                          </div>
                          <div className="text-sm text-gray-500">{deal.fileSize}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-[28px] border border-gray-100 bg-white/70 p-6 shadow-sm">
                <div className="grid gap-6 md:grid-cols-4">
                  <div>
                    <div className="text-sm text-gray-500">Общий объем заказов</div>
                    <div className="mt-2 text-2xl font-semibold text-gray-900">
                      {selectedClient.details.finance.totalOrders}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Оплачено</div>
                    <div className="mt-2 text-2xl font-semibold text-gray-900">
                      {selectedClient.details.finance.paid}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Задолженность</div>
                    <div className="mt-2 text-2xl font-semibold text-gray-900">
                      {selectedClient.details.finance.debt}
                    </div>
                  </div>
                  <div className="md:col-span-1">
                    <div className="text-sm text-gray-500">Условия оплаты</div>
                    <div className="mt-2 text-base font-medium text-gray-900">
                      {selectedClient.details.finance.paymentTerms}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-4 border-t border-gray-100 pt-6 md:flex-row md:items-center md:justify-between">
                <Button
                  type="button"
                  variant="outline"
                  className="border-red-200 text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                  Удалить клиента
                </Button>
                <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:justify-end">
                  <Button variant="outline" onClick={() => setDetailsOpen(false)}>
                    Закрыть
                  </Button>
                  <Button asChild>
                    <Link href="/clients/add">Редактировать</Link>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={relatedOpen} onOpenChange={setRelatedOpen}>
        <DialogContent
          showCloseButton={false}
          className="w-full border-0 bg-transparent p-0 shadow-none"
          style={{ maxWidth: 'min(1120px, calc(100vw - 2rem))' }}
        >
          {activeDeal && selectedClient && (
            <div className="relative max-h-[90vh] overflow-y-auto rounded-[36px] border border-gray-100 bg-white/95 p-6 shadow-2xl md:p-10">
              <DialogClose asChild>
                <button
                  className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition hover:bg-gray-50"
                  aria-label="Закрыть"
                >
                  <X className="h-5 w-5" />
                </button>
              </DialogClose>

              <div className="flex items-center gap-2 text-sm text-gray-500">
                <button
                  onClick={() => setRelatedOpen(false)}
                  className="flex items-center gap-1 text-gray-500 transition hover:text-gray-900"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Назад
                </button>
                <span className="text-2xl font-semibold text-gray-900">Связанные сделки</span>
                <span className="text-gray-400">({relatedDeals.length})</span>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                {relatedDeals.map((deal, index) => (
                  <button
                    key={deal.id}
                    onClick={() => setActiveRelatedIndex(index)}
                    className={`rounded-full px-4 py-1.5 text-sm font-semibold ${
                      index === activeRelatedIndex
                        ? 'bg-orange-100 text-orange-600'
                        : 'border border-gray-200 text-gray-600'
                    }`}
                  >
                    {relatedDates[index] || '10.10.2025'}
                  </button>
                ))}
              </div>

              <div className="mt-6 rounded-[28px] bg-gray-50 p-6 shadow-inner">
                <div className="grid gap-5 md:grid-cols-3">
                  <div className="md:col-span-2 space-y-4">
                    <div className="rounded-2xl border border-white bg-white px-4 py-3">
                      <p className="text-xs font-semibold text-gray-500 uppercase">Название</p>
                      <p className="mt-2 text-base font-medium text-gray-900">{activeDeal.title}</p>
                    </div>
                    <div className="rounded-2xl border border-white bg-white px-4 py-3">
                      <p className="text-xs font-semibold text-gray-500 uppercase">Описание</p>
                      <p className="mt-2 text-sm text-gray-600 leading-6">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="rounded-2xl border border-white bg-white px-4 py-3">
                      <p className="text-xs font-semibold text-gray-500 uppercase">Клиент</p>
                      <p className="mt-2 text-sm font-medium text-gray-900">{selectedClient.contactName}</p>
                    </div>
                    <div className="rounded-2xl border border-white bg-white px-4 py-3">
                      <p className="text-xs font-semibold text-gray-500 uppercase">Сумма</p>
                      <p className="mt-2 text-sm font-medium text-gray-900">1 200 000</p>
                    </div>
                    <div className="rounded-2xl border border-white bg-white px-4 py-3">
                      <p className="text-xs font-semibold text-gray-500 uppercase">Ответственный менеджер</p>
                      <p className="mt-2 text-sm font-medium text-gray-900">{selectedClient.contactName}</p>
                    </div>
                    <div className="rounded-2xl border border-white bg-white px-4 py-3">
                      <p className="text-xs font-semibold text-gray-500 uppercase">Этап</p>
                      <p className="mt-2 text-sm font-medium text-orange-500">{selectedClient.status}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl border border-white bg-white px-4 py-3">
                    <p className="text-xs font-semibold text-gray-500 uppercase">Дата создания</p>
                    <p className="mt-2 text-sm font-medium text-gray-900">10.10.2025</p>
                  </div>
                  <div className="rounded-2xl border border-white bg-white px-4 py-3">
                    <p className="text-xs font-semibold text-gray-500 uppercase">Ожидаемое закрытие</p>
                    <p className="mt-2 text-sm font-medium text-gray-900">20.10.2025</p>
                  </div>
                </div>

                <div className="mt-6 rounded-2xl border border-white bg-white px-4 py-4">
                  <p className="text-xs font-semibold text-gray-500 uppercase">Прогресс</p>
                  <div className="mt-3 h-8 rounded-full bg-gray-100">
                    <div
                      className="flex h-full items-center justify-end rounded-full bg-blue-500 pr-4 text-xs font-semibold text-white"
                      style={{ width: '74%' }}
                    >
                      74%
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-4 border-t border-gray-100 pt-6 md:flex-row md:items-center md:justify-between">
                <Button
                  type="button"
                  variant="ghost"
                  className="w-full rounded-2xl border border-red-100 bg-white text-red-600 hover:bg-red-50 md:w-auto"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Удалить сделку
                </Button>
                <div className="flex w-full flex-col gap-3 sm:flex-row sm:justify-end md:w-auto">
                  <Button
                    variant="outline"
                    className="rounded-2xl border-gray-200 bg-white text-gray-700"
                    onClick={() => setRelatedOpen(false)}
                  >
                    Закрыть
                  </Button>
                  <Button className="rounded-2xl bg-orange-500 px-6 text-white hover:bg-orange-600">
                    Редактировать
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
