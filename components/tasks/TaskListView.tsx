import { Task } from '@/types/task'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface TaskListViewProps {
  tasks: Task[]
}

interface TimeSlot {
  time: string
  tasks: Task[]
}

const HOURS = [
  '8 AM', '9 AM', '10 AM', '11 AM', '12 PM', 
  '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM'
]

const WEEKDAYS = [
  { short: 'Пн', date: '12' },
  { short: 'Вт', date: '13' },
  { short: 'Ср', date: '14' },
  { short: 'Чт', date: '15' },
  { short: 'Пт', date: '16' },
  { short: 'Сб', date: '17' },
  { short: 'Вс', date: '18' },
]

// Моковые данные событий для календаря
const mockEvents = [
  { 
    title: 'Cloud project meeting', 
    time: '8:00 - 10:00', 
    day: 0, 
    hour: 0, 
    duration: 2,
    assignees: ['/avatars/user1.jpg']
  },
  { 
    title: 'Test the prototypes', 
    time: '8:30 - 10:00', 
    day: 1, 
    hour: 0.5, 
    duration: 1.5,
    assignees: ['/avatars/user2.jpg']
  },
  { 
    title: 'Design feedback', 
    time: '8:30 - 9:50', 
    day: 4, 
    hour: 0.5, 
    duration: 1.3,
    assignees: ['/avatars/user3.jpg']
  },
  { 
    title: 'Requirements discussion', 
    time: '10:30 - 12:30', 
    day: 1, 
    hour: 2.5, 
    duration: 2,
    assignees: ['/avatars/user1.jpg', '/avatars/user4.jpg']
  },
  { 
    title: 'Meeting with Emma', 
    time: '10:30 - 12:30', 
    day: 3, 
    hour: 2.5, 
    duration: 2,
    assignees: ['/avatars/user5.jpg']
  },
  { 
    title: 'Team Lunch', 
    time: '13:00 - 14:00', 
    day: 1, 
    hour: 5, 
    duration: 1,
    assignees: []
  },
  { 
    title: 'Project Kick off', 
    time: '16:00 - 18:00', 
    day: 0, 
    hour: 8, 
    duration: 2,
    assignees: ['/avatars/user1.jpg', '/avatars/user2.jpg']
  },
  { 
    title: 'Meeting with John', 
    time: '14:30 - 16:30', 
    day: 2, 
    hour: 6.5, 
    duration: 2,
    assignees: ['/avatars/user3.jpg']
  },
  { 
    title: 'Test', 
    time: '14:00 - 15:00', 
    day: 4, 
    hour: 6, 
    duration: 1,
    assignees: []
  },
  { 
    title: 'Drew birthday', 
    time: '11:00 - 15:00', 
    day: 5, 
    hour: 3, 
    duration: 4,
    assignees: ['/avatars/user1.jpg', '/avatars/user4.jpg', '/avatars/user5.jpg']
  },
  { 
    title: 'New Product meeting', 
    time: '15:30 - 18:00', 
    day: 3, 
    hour: 7.5, 
    duration: 2.5,
    assignees: ['/avatars/user2.jpg', '/avatars/user3.jpg', '/avatars/user4.jpg']
  },
]

export function TaskListView({ tasks }: TaskListViewProps) {
  const currentTime = new Date().getHours() - 8 // Assuming 8 AM start

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h3 className="font-semibold text-gray-900">Список</h3>
        <span className="text-sm text-gray-500">Сегодня</span>
      </div>

      {/* Calendar Grid */}
      <div className="overflow-x-auto">
        <div className="min-w-[1000px]">
          {/* Weekday Headers */}
          <div className="grid grid-cols-8 border-b border-gray-200">
            <div className="p-3"></div>
            {WEEKDAYS.map((day, idx) => (
              <div key={idx} className="p-3 text-center">
                <div className="text-xs text-gray-500">{day.short}</div>
                <div className={`text-sm font-medium mt-1 ${
                  idx === 3 ? 'w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto' : ''
                }`}>
                  {day.date}
                </div>
              </div>
            ))}
          </div>

          {/* Time Slots */}
          <div className="relative">
            {HOURS.map((hour, hourIdx) => (
              <div key={hour} className="grid grid-cols-8 border-b border-gray-100 min-h-[80px]">
                {/* Time Label */}
                <div className="p-3 text-xs text-gray-500 sticky left-0 bg-white">
                  {hour}
                </div>

                {/* Day Columns */}
                {WEEKDAYS.map((day, dayIdx) => {
                  // Найти события для этого дня и часа
                  const dayEvents = mockEvents.filter(
                    event => event.day === dayIdx && 
                    Math.floor(event.hour) === hourIdx
                  )

                  return (
                    <div 
                      key={dayIdx} 
                      className="relative border-l border-gray-100 p-2"
                    >
                      {dayEvents.map((event, eventIdx) => {
                        const topOffset = (event.hour - Math.floor(event.hour)) * 80
                        const height = event.duration * 80 - 8

                        return (
                          <div
                            key={eventIdx}
                            className="absolute left-2 right-2 bg-blue-50 rounded-lg p-2 border-l-4 border-blue-400 hover:shadow-md transition-shadow cursor-pointer"
                            style={{
                              top: `${topOffset}px`,
                              height: `${height}px`,
                            }}
                          >
                            <div className="text-xs font-medium text-gray-900 line-clamp-2">
                              {event.title}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              {event.time}
                            </div>
                            {event.assignees.length > 0 && (
                              <div className="flex -space-x-2 mt-2">
                                {event.assignees.slice(0, 3).map((avatar, idx) => (
                                  <Avatar key={idx} className="w-6 h-6 border-2 border-white">
                                    <AvatarImage src={avatar} />
                                    <AvatarFallback>U</AvatarFallback>
                                  </Avatar>
                                ))}
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  )
                })}
              </div>
            ))}

            {/* Current Time Indicator */}
            {currentTime >= 0 && currentTime < 12 && (
              <div 
                className="absolute left-0 right-0 h-0.5 bg-red-500 z-10"
                style={{ top: `${currentTime * 80 + 40}px` }}
              >
                <div className="absolute left-0 w-3 h-3 bg-red-500 rounded-full -translate-y-1/2"></div>
                <div className="absolute left-8 -top-3 bg-black text-white text-xs px-2 py-1 rounded">
                  {new Date().getHours()}:{String(new Date().getMinutes()).padStart(2, '0')}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
