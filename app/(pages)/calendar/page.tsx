"use client"

import { useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react'

type EventType = 'meeting' | 'site' | 'handoff' | 'inspection' | 'update'

interface CalendarEvent {
  id: string
  date: string // YYYY-MM-DD
  title: string
  time: string
  type: EventType
}

const colors: Record<EventType, string> = {
  meeting: 'bg-blue-100 text-blue-900',
  site: 'bg-green-100 text-green-900',
  handoff: 'bg-rose-100 text-rose-900',
  inspection: 'bg-rose-100 text-rose-900',
  update: 'bg-green-100 text-green-900',
}

function formatYearMonth(d: Date) {
  return d.toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' })
}

function monthMatrix(active: Date): Date[][] {
  const start = new Date(active.getFullYear(), active.getMonth(), 1)
  const end = new Date(active.getFullYear(), active.getMonth() + 1, 0)
  const startDay = (start.getDay() + 6) % 7 // make Monday=0
  const daysInMonth = end.getDate()
  const weeks: Date[][] = []
  let current = new Date(start)
  current.setDate(current.getDate() - startDay)
  for (let w = 0; w < 6; w++) {
    const week: Date[] = []
    for (let d = 0; d < 7; d++) {
      week.push(new Date(current))
      current.setDate(current.getDate() + 1)
    }
    weeks.push(week)
  }
  return weeks
}

export default function CalendarPage() {
  const [active, setActive] = useState(() => new Date())

  const events = useMemo<CalendarEvent[]>(() => ([
    { id: 'e1', date: '2025-11-01', title: 'Подготовить смету по объекту ЖК “Высота”', time: '10:00 - 13:00', type: 'meeting' },
    { id: 'e2', date: '2025-11-01', title: 'Выезд на объект ЖК “Город Солнца” — проверка монтажа окон', time: '10:00 - 13:00', type: 'site' },
    { id: 'e3', date: '2025-11-01', title: 'Передача сметы клиенту “СтройДом” — согласование бюджета', time: '10:00 - 13:00', type: 'handoff' },
    { id: 'e4', date: '2025-11-01', title: 'Совещание по проекту ТРЦ “Орион” — уточнение сроков поставки', time: '10:00 - 13:00', type: 'meeting' },
    { id: 'e5', date: '2025-11-01', title: 'Осмотр участка под фундамент — ул. Акунбаева, 124', time: '10:00 - 13:00', type: 'inspection' },
    { id: 'e6', date: '2025-11-01', title: 'Плановое обновление статуса проекта “Green Park” — отдел продаж', time: '10:00 - 13:00', type: 'update' },
  ]), [])

  const matrix = monthMatrix(active)
  const monthIndex = active.getMonth()

  const eventMap = useMemo(() => {
    const map: Record<string, CalendarEvent[]> = {}
    for (const ev of events) {
      map[ev.date] = map[ev.date] || []
      map[ev.date].push(ev)
    }
    return map
  }, [events])

  const toKey = (d: Date) => `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`

  return (
    <div className="p-6">
      <div className="text-sm text-gray-500 mb-3">Календарь</div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-gray-900">{formatYearMonth(active)}</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={()=>setActive(new Date(active.getFullYear(), active.getMonth()-1, 1))}>
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={()=>setActive(new Date())}>Сегодня</Button>
          <Button variant="outline" size="icon" onClick={()=>setActive(new Date(active.getFullYear(), active.getMonth()+1, 1))}>
            <ChevronRight className="w-4 h-4" />
          </Button>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white">
            <Plus className="w-4 h-4 mr-2" /> Создать событие
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="grid grid-cols-7 border-b border-gray-200 bg-gray-50 text-xs text-gray-500">
            {['Пн','Вт','Ср','Чт','Пт','Сб','Вс'].map((d)=> (
              <div key={d} className="px-3 py-2">{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-px bg-gray-200">
            {matrix.map((week, wi)=> week.map((d, di)=> {
              const key = toKey(d)
              const inMonth = d.getMonth() === monthIndex
              const dayEvents = eventMap[key] || []
              return (
                <div key={`${wi}-${di}`} className={`min-h-[120px] bg-white ${inMonth? '':'bg-gray-50 text-gray-400'}`}>
                  <div className="px-3 py-2 text-xs text-gray-500 flex items-center justify-between">
                    <span className={`text-sm ${inMonth? 'text-gray-900':'text-gray-400'}`}>{d.getDate()}</span>
                  </div>
                  <div className="px-2 pb-2 space-y-1">
                    {dayEvents.slice(0,3).map(ev => (
                      <div key={ev.id} className={`${colors[ev.type]} rounded-md px-2 py-1 text-[11px]`}> 
                        <div className="truncate">{ev.title}</div>
                        <div className="opacity-70">{ev.time}</div>
                      </div>
                    ))}
                    {dayEvents.length>3 && (
                      <div className="text-[11px] text-blue-600">Еще {dayEvents.length-3}…</div>
                    )}
                  </div>
                </div>
              )
            }))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


