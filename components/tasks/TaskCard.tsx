import { Task } from '@/types/task'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Users, Briefcase } from 'lucide-react'

interface TaskCardProps {
  task: Task
}

const getPriorityColor = (priority: Task['priority']) => {
  switch (priority) {
    case 'low':
      return 'text-green-600 bg-green-50'
    case 'medium':
      return 'text-yellow-600 bg-yellow-50'
    case 'high':
      return 'text-red-600 bg-red-50'
  }
}

const getPriorityText = (priority: Task['priority']) => {
  switch (priority) {
    case 'low':
      return 'Низкий приоритет'
    case 'medium':
      return 'Средний приоритет'
    case 'high':
      return 'Высокий приоритет'
  }
}

export function TaskCard({ task }: TaskCardProps) {
  const percentage = Math.round((task.progress.completed / task.progress.total) * 100)

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-lg transition-all duration-200 cursor-pointer">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 flex-1">
          {task.title}
        </h3>
        <div className="ml-2 flex-shrink-0 w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-2xl">
          {task.icon}
        </div>
      </div>

      {/* Deadline */}
      <p className="text-xs text-gray-500 mb-3">
        Дедлайн: {task.deadline}
      </p>

      {/* Assignee and Priority */}
      <div className="flex items-center justify-between mb-4">
        <Avatar className="w-8 h-8">
          <AvatarImage src={task.assignee.avatar} alt={task.assignee.name} />
          <AvatarFallback>{task.assignee.name[0]}</AvatarFallback>
        </Avatar>

        <span className={`text-xs px-2 py-1 rounded-full font-medium ${getPriorityColor(task.priority)}`}>
          • {getPriorityText(task.priority)}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="mb-3">
        <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
          <span>{task.progress.completed} / {task.progress.total} Задач</span>
          <span className="font-semibold">{percentage}%</span>
        </div>
        <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-300"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Type Badge */}
      <div className="flex items-center gap-1 text-xs text-gray-600">
        {task.type === 'client' ? (
          <>
            <Users className="w-3.5 h-3.5" />
            <span>Клиент</span>
          </>
        ) : (
          <>
            <Briefcase className="w-3.5 h-3.5" />
            <span>Сделка</span>
          </>
        )}
      </div>
    </div>
  )
}
