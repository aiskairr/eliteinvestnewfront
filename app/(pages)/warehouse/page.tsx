"use client"

import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Avatar } from '@/components/ui/avatar'
import { Card } from '@/components/ui/card'
import { Plus, Receipt, MinusCircle, MoreHorizontal, CircleDollarSign } from 'lucide-react'

type StockStatus = 'В наличии' | 'Заканчивается' | 'Нет в наличии'

interface ItemRow {
  id: string
  name: string
  sku: string
  qty: number
  unit: string
  price: string
  category: string
  status: StockStatus
}

const rows: ItemRow[] = [
  { id: '1', name: 'Кирпич облицовочный красный', sku: 'BR-001', qty: 3500, unit: 'шт', price: '25 с', category: 'Материалы', status: 'В наличии' },
  { id: '2', name: 'Перчатки строительные', sku: 'WD-017', qty: 3500, unit: '12', price: '55 с', category: 'Дерево', status: 'В наличии' },
  { id: '3', name: 'Доска обрезная 50×150×6000', sku: 'GL-045', qty: 3500, unit: '15', price: '55 с', category: 'Инструменты', status: 'Нет в наличии' },
  { id: '4', name: 'Цемент М500 (мешок 50 кг)', sku: 'CEM-500', qty: 3500, unit: '43', price: '380 с', category: 'Инструменты', status: 'Заканчивается' },
]

function StatusPill({ status }: { status: StockStatus }) {
  const color = status === 'В наличии' ? 'text-green-600' : status === 'Заканчивается' ? 'text-amber-600' : 'text-red-600'
  const dot = status === 'В наличии' ? 'bg-green-500' : status === 'Заканчивается' ? 'bg-amber-500' : 'bg-red-500'
  return (
    <div className={`flex items-center gap-2 ${color}`}>
      <span className={`w-2 h-2 rounded-full ${dot}`} />
      <span className="text-sm">{status}</span>
    </div>
  )
}

export default function WarehousePage() {
  return (
    <div className="p-6">
      <div className="text-sm text-gray-500 mb-4">Склад</div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-gray-900">Список товаров</h2>
        <div className="flex items-center gap-2">
          <Button className="h-8">
            <Plus className="w-4 h-4 mr-2" /> Добавить товар
          </Button>
          <Button variant="outline" className="h-8">
            <Receipt className="w-4 h-4 mr-2" /> Приход товара
          </Button>
          <Button variant="outline" className="h-8">
            <MinusCircle className="w-4 h-4 mr-2" /> Списание
          </Button>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 overflow-hidden bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10"><Checkbox /></TableHead>
              <TableHead>Название</TableHead>
              <TableHead>Артикул/SKU</TableHead>
              <TableHead>Кол-во на складе</TableHead>
              <TableHead>Ед.измерения</TableHead>
              <TableHead>Цена</TableHead>
              <TableHead>Категория</TableHead>
              <TableHead>Статус</TableHead>
              <TableHead className="w-10" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.concat(rows).concat(rows).map((r, idx) => (
              <TableRow key={r.id + '-' + idx} className={idx % 2 === 1 ? 'bg-gray-50/40' : ''}>
                <TableCell><Checkbox /></TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="w-6 h-6" />
                    <span className="text-sm text-gray-900">{r.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-sm text-gray-700">{r.sku}</TableCell>
                <TableCell className="text-sm text-gray-700">{r.qty}</TableCell>
                <TableCell className="text-sm text-gray-700">{r.unit}</TableCell>
                <TableCell className="text-sm text-gray-900 flex items-center gap-1"><CircleDollarSign className="w-4 h-4 text-gray-500" />{r.price}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className="bg-gray-100 text-gray-700">{r.category}</Badge>
                </TableCell>
                <TableCell><StatusPill status={r.status} /></TableCell>
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

      {/* Пагинация */}
      <div className="flex items-center justify-center gap-4 mt-6 text-sm text-gray-600">
        {[1,2,3,4,5].map(p => (
          <Card key={p} className="px-6 py-2 cursor-pointer hover:bg-gray-50">{p}</Card>
        ))}
      </div>
    </div>
  )
}



