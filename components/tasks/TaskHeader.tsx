import { useEffect, useMemo, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Plus, LayoutGrid, List, Filter, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'

interface TaskHeaderProps {
  view: 'list' | 'board'
  onViewChange: (view: 'list' | 'board') => void
  selectedMonth: string
  onMonthChange: (month: string) => void
  onCreateTask: () => void
}

export function TaskHeader({
  view,
  onViewChange,
  selectedMonth,
  onMonthChange,
  onCreateTask,
}: TaskHeaderProps) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())
  const popoverRef = useRef<HTMLDivElement | null>(null)
  const buttonRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        !buttonRef.current?.contains(event.target as Node)
      ) {
        setIsCalendarOpen(false)
      }
    }

    if (isCalendarOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isCalendarOpen])

  const formatMonthYear = (date: Date) => {
    const month = date.toLocaleString('ru-RU', { month: 'long' })
    return `${month.charAt(0).toUpperCase()}${month.slice(1)}, ${date.getFullYear()}`
  }

  const monthLabel = useMemo(() => formatMonthYear(currentDate), [currentDate])

  const daysMatrix = useMemo(() => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const firstDay = new Date(year, month, 1)
    const firstDayIndex = (firstDay.getDay() + 6) % 7 // Monday first
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const cells: Array<Date | null> = []

    for (let i = 0; i < firstDayIndex; i++) {
      cells.push(null)
    }

    for (let day = 1; day <= daysInMonth; day++) {
      cells.push(new Date(year, month, day))
    }

    while (cells.length < 42) {
      cells.push(null)
    }

    return cells
  }, [currentDate])

  const handleSelectDate = (date: Date) => {
    setSelectedDate(date)
    onMonthChange(formatMonthYear(date))
    setIsCalendarOpen(false)
  }

  return (
    <div className="mb-6">
      {/* Title and View Toggle */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-gray-900">Список задач</h1>
          
          <div className="flex items-center bg-white rounded-lg border border-gray-200">
            <button
              onClick={() => onViewChange('board')}
              className={`flex items-center gap-2 px-4 py-2 rounded-l-lg text-sm font-medium transition-all ${
                view === 'board'
                  ? 'bg-white text-gray-900 border-r border-gray-200'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              Карточки
            </button>
            <button
              onClick={() => onViewChange('list')}
              className={`flex items-center gap-2 px-4 py-2 rounded-r-lg text-sm font-medium transition-all ${
                view === 'list'
                  ? 'bg-white text-gray-900'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <List className="w-4 h-4" />
              Список
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3 relative">
          <button
            ref={buttonRef}
            onClick={() => setIsCalendarOpen((prev) => !prev)}
            className="px-4 py-2 border border-gray-300 rounded-lg flex items-center gap-2 hover:bg-gray-50 relative"
          >
            <span className="text-sm">{selectedMonth}</span>
            <ChevronDown className="w-4 h-4" />
          </button>
          {isCalendarOpen && (
            <div
              ref={popoverRef}
              className="fixed left-1/2 top-[120px] w-72 -translate-x-1/2 rounded-3xl border border-gray-100 bg-white p-4 shadow-2xl z-30"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">
                    {selectedDate.toLocaleDateString('en-US')}
                  </p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {selectedDate
                      .toLocaleDateString('en-US', {
                        month: 'long',
                        day: '2-digit',
                        year: 'numeric',
                      })
                      .replace(',', ' • ')}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      setCurrentDate(
                        new Date(
                          currentDate.getFullYear(),
                          currentDate.getMonth() - 1,
                          1,
                        ),
                      )
                    }
                    className="rounded-full border border-gray-200 p-1"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() =>
                      setCurrentDate(
                        new Date(
                          currentDate.getFullYear(),
                          currentDate.getMonth() + 1,
                          1,
                        ),
                      )
                    }
                    className="rounded-full border border-gray-200 p-1"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-gray-500">
                <button
                  onClick={() => {
                    const today = new Date()
                    setCurrentDate(today)
                    handleSelectDate(today)
                  }}
                  className="rounded-full border border-gray-200 px-3 py-1"
                >
                  Today
                </button>
                <button
                  onClick={() => {
                    setCurrentDate(selectedDate)
                  }}
                  className="rounded-full border border-gray-200 px-3 py-1"
                >
                  Last selection
                </button>
                <span className="ml-auto text-sm font-medium capitalize">
                  {monthLabel}
                </span>
              </div>

              <div className="mt-4 grid grid-cols-7 gap-2 text-center text-xs font-semibold text-gray-400">
                {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((day) => (
                  <span key={day}>{day}</span>
                ))}
                {daysMatrix.map((date, index) => {
                  const isSelected =
                    date &&
                    selectedDate.toDateString() === date.toDateString()
                  return (
                    <button
                      key={index}
                      onClick={() => date && handleSelectDate(date)}
                      disabled={!date}
                      className={`h-9 w-9 rounded-full text-sm font-medium ${
                        !date
                          ? 'text-transparent'
                          : isSelected
                            ? 'bg-indigo-500 text-white'
                            : 'text-gray-700 hover:bg-indigo-50'
                      }`}
                    >
                      {date ? date.getDate() : ''}
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          <Button variant="ghost" size="icon">
            <Filter className="w-5 h-5" />
          </Button>

          <Button 
            onClick={onCreateTask}
            className="bg-orange-500 hover:bg-orange-600 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Создать задачу
          </Button>
        </div>
      </div>
    </div>
  )
}
