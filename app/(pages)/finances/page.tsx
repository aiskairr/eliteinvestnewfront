"use client"

import { useMemo, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Checkbox } from '@/components/ui/checkbox'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { ChevronDown, MoreHorizontal, Plus, TrendingDown, TrendingUp, Upload } from 'lucide-react'

type TxStatus = 'Оплачено' | 'Ожидает' | 'Просрочено'
type TxType = 'Приход' | 'Расход'

interface TxRow {
  id: string
  date: string
  type: TxType
  amount: string
  category: string
  binding: string
  status: TxStatus
}

const rows: TxRow[] = [
  { id: '1', date: '22.10.2025', type: 'Приход', amount: '1 324 000', category: 'Оплата по договору', binding: 'Клиент', status: 'Оплачено' },
  { id: '2', date: '23.10.2025', type: 'Расход', amount: '1 324 000', category: 'Закупка материалов', binding: 'Сделка', status: 'Ожидает' },
  { id: '3', date: '23.10.2025', type: 'Расход', amount: '1 324 000', category: 'Оплата по договору', binding: 'Клиент', status: 'Просрочено' },
  { id: '4', date: '25.10.2025', type: 'Приход', amount: '1 324 000', category: 'Закупка материалов', binding: 'Сделка', status: 'Просрочено' },
  { id: '5', date: '23.10.2025', type: 'Расход', amount: '1 324 000', category: 'Закупка материалов', binding: 'Сделка', status: 'Оплачено' },
]

export default function FinancesPage() {
  const [view, setView] = useState<'list' | 'graph'>('graph')
  const metrics = useMemo(() => ([
    { title: 'Активные сделки', value: '238', positive: true, bg: 'bg-green-50' },
    { title: 'Выручка', value: '238', positive: true, bg: 'bg-blue-50' },
    { title: 'Конверсия', value: '238', positive: false, bg: 'bg-orange-50' },
    { title: 'Новые клиенты', value: '238', positive: true, bg: 'bg-indigo-50' },
  ]), [])

  return (
    <div className="p-6">
      <div className="text-sm text-gray-500 mb-3">Финансы</div>
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">Финансы</h2>

      {/* Метрики */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-4">
        {metrics.map((m) => (
          <Card key={m.title} className={m.bg}>
            <CardContent className="pt-5">
              <div className="text-sm text-gray-700 mb-3">{m.title}</div>
              <div className="flex items-center gap-3">
                <div className="text-3xl font-semibold text-gray-900">{m.value}</div>
                <div className={`flex items-center gap-1 text-xs ${m.positive ? 'text-green-600' : 'text-red-600'}`}>
                  {m.positive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  <span>12.5 %</span>
                </div>
              </div>
              <div className="mt-3 text-xs text-blue-600 flex items-center gap-1">За месяц <ChevronDown className="w-3 h-3" /></div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Панель переключателей и действий */}
      <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-3 py-2 mb-4">
        <div className="flex items-center gap-2 text-sm">
          <Button variant={view==='list' ? 'default' : 'outline'} size="sm" onClick={()=>setView('list')}>Список</Button>
          <Button variant={view==='graph' ? 'default' : 'outline'} size="sm" onClick={()=>setView('graph')}>График</Button>
        </div>
        <div className="flex items-center gap-2">
          <Button className="bg-orange-500 hover:bg-orange-600 text-white h-8">
            <Plus className="w-4 h-4 mr-2" /> Добавить транзакцию
          </Button>
          <Button variant="outline" className="h-8">
            Выставить счет
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Экспорт">
            <Upload className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {view==='graph' ? (
        <Card>
          <CardContent className="p-6">
            {/* Простая имитация линейного графика */}
            <div className="h-[440px] w-full relative">
              <svg viewBox="0 0 800 400" className="w-full h-full">
                <polyline fill="none" stroke="#E5E7EB" strokeWidth="1" points="0,350 800,350" />
                <polyline fill="none" stroke="#D1D5DB" strokeWidth="1" points="0,280 800,280" />
                <polyline fill="none" stroke="#D1D5DB" strokeWidth="1" points="0,210 800,210" />
                <polyline fill="none" stroke="#D1D5DB" strokeWidth="1" points="0,140 800,140" />
                <polyline fill="none" stroke="#9CA3AF" strokeWidth="2" points="0,300 120,260 200,280 320,230 400,250 520,180 560,220 640,160 720,140 800,120" />
                <polyline fill="none" stroke="#93C5FD" strokeWidth="2" strokeDasharray="6 6" points="0,330 100,300 200,310 300,290 420,330 520,340 560,260 640,200 720,220 800,160" />
                <line x1="140" y1="40" x2="140" y2="360" stroke="#3B82F6" strokeWidth="3" />
                <circle cx="140" cy="180" r="6" fill="#3B82F6" stroke="#FFFFFF" strokeWidth="2" />
              </svg>
              <div className="absolute left-[140px] top-10 text-blue-600 text-lg font-semibold">10,256,598</div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="rounded-xl border border-gray-200 overflow-hidden bg-white">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10"><Checkbox /></TableHead>
                <TableHead>Дата</TableHead>
                <TableHead>Тип</TableHead>
                <TableHead>Сумма</TableHead>
                <TableHead>Категория</TableHead>
                <TableHead>Привязка</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead className="w-10" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((r) => (
                <TableRow key={r.id}>
                  <TableCell><Checkbox /></TableCell>
                  <TableCell className="text-sm text-gray-700">{r.date}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={`${r.type==='Приход' ? 'bg-gray-100 text-gray-700' : 'bg-gray-100 text-gray-700'}`}>{r.type}</Badge>
                  </TableCell>
                  <TableCell className="text-sm">{r.amount}</TableCell>
                  <TableCell className="text-sm text-gray-700">{r.category}</TableCell>
                  <TableCell className="text-sm text-gray-700">{r.binding}</TableCell>
                  <TableCell>
                    <div className={`flex items-center gap-2 ${r.status==='Оплачено'?'text-green-600': r.status==='Ожидает' ? 'text-amber-600' : 'text-red-600'}`}>
                      <span className={`w-2 h-2 rounded-full ${r.status==='Оплачено'?'bg-green-500': r.status==='Ожидает' ? 'bg-amber-500' : 'bg-red-500'}`} />
                      <span className="text-sm">{r.status}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Подробнее</DropdownMenuItem>
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
      )}
    </div>
  )
}


