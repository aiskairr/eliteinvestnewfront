import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ChevronDown, TrendingDown, TrendingUp } from 'lucide-react'

function MetricCard({ title, value, trend, positive }: { title: string; value: string; trend: string; positive?: boolean }) {
  return (
    <Card>
      <CardContent className="pt-5">
        <div className="text-sm text-gray-600 mb-4">{title}</div>
        <div className="flex items-center gap-3">
          <div className="text-3xl font-semibold text-gray-900">{value}</div>
          <div className={`flex items-center gap-1 text-xs ${positive ? 'text-green-600' : 'text-red-600'}`}>
            {positive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            <span>{trend}</span>
          </div>
        </div>
        <div className="mt-4 text-xs text-blue-600 flex items-center gap-1">
          За месяц <ChevronDown className="w-3 h-3" />
        </div>
      </CardContent>
    </Card>
  )
}

function SalesBars() {
  const bars = [40, 90, 60, 85, 55, 92, 70, 88, 62, 78, 45, 90]
  return (
    <div className="flex h-48 items-end gap-4">
      {bars.map((h, i) => (
        <div key={i} className="flex-1 flex items-end">
          <div className="w-4 h-full bg-gray-100 rounded-md relative overflow-hidden">
            <div className="absolute bottom-0 left-0 right-0 mx-auto w-4 rounded-md bg-orange-500" style={{ height: `${h}%` }} />
          </div>
        </div>
      ))}
    </div>
  )
}

export default function MainPage() {
  return (
    <div className="p-6">
      <div className="text-sm text-gray-500 mb-4">Главная</div>

      <h2 className="text-2xl font-semibold text-gray-900 mb-4">Метрика</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <MetricCard title="Активные сделки" value="238" trend="12.5 %" positive />
        <MetricCard title="Выручка" value="238" trend="12.5 %" positive />
        <MetricCard title="Конверсия" value="238" trend="12.5 %" />
        <MetricCard title="Новые клиенты" value="238" trend="12.5 %" positive />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between py-4">
            <CardTitle className="text-base font-medium">График продаж и выручки</CardTitle>
            <Badge variant="secondary" className="text-xs font-normal">За месяц</Badge>
          </CardHeader>
          <CardContent>
            <SalesBars />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="py-4">
            <CardTitle className="text-base font-medium">Активности</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[1,2,3].map((i) => (
                <div key={i} className="flex items-start gap-3 rounded-lg border border-gray-200 px-3 py-2">
                  <div className="w-5 h-5 rounded-full bg-green-100 border border-green-200 flex items-center justify-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-gray-800">Монтаж кровли на объекте &quot;ЖК Солнечный&quot;</div>
                    <div className="text-[11px] text-gray-400">21 апреля 2025</div>
                  </div>
                </div>
              ))}
              <div className="text-xs text-blue-600 cursor-pointer">Показать все</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="py-4">
          <CardTitle className="text-base font-medium">Воронка продаж</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-72 bg-gray-50 rounded-lg border border-dashed border-gray-200" />
        </CardContent>
      </Card>
    </div>
  )
}
