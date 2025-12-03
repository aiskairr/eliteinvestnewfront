'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Task, TaskStatus, TaskPriority, TaskType } from '@/types/task'

interface CreateTaskDialogProps {
  open: boolean
  onClose: () => void
  onCreateTask: (task: Omit<Task, 'id'>) => void
  defaultStatus?: TaskStatus
}

export function CreateTaskDialog({ open, onClose, onCreateTask, defaultStatus = 'new' }: CreateTaskDialogProps) {
  const [formData, setFormData] = useState({
    title: '',
    deadline: '',
    assignee: {
      name: '',
      avatar: '/avatars/user1.jpg'
    },
    priority: 'medium' as TaskPriority,
    progress: {
      completed: 0,
      total: 0
    },
    type: 'client' as TaskType,
    status: defaultStatus,
    icon: '🎯'
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.title.trim() || !formData.deadline || !formData.assignee.name.trim()) {
      alert('Пожалуйста, заполните все обязательные поля')
      return
    }

    onCreateTask({
      ...formData,
      assignee: {
        name: formData.assignee.name,
        avatar: formData.assignee.avatar
      }
    })

    // Сбросить форму
    setFormData({
      title: '',
      deadline: '',
      assignee: {
        name: '',
        avatar: '/avatars/user1.jpg'
      },
      priority: 'medium',
      progress: {
        completed: 0,
        total: 0
      },
      type: 'client',
      status: defaultStatus,
      icon: '🎯'
    })

    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Создать новую задачу</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Название */}
          <div className="space-y-2">
            <Label htmlFor="title">Название задачи *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Приготовить смету..."
              required
            />
          </div>

          {/* Дедлайн */}
          <div className="space-y-2">
            <Label htmlFor="deadline">Дедлайн *</Label>
            <Input
              id="deadline"
              type="date"
              value={formData.deadline}
              onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
              required
            />
          </div>

          {/* Исполнитель */}
          <div className="space-y-2">
            <Label htmlFor="assignee">Исполнитель *</Label>
            <Input
              id="assignee"
              value={formData.assignee.name}
              onChange={(e) => setFormData({ 
                ...formData, 
                assignee: { ...formData.assignee, name: e.target.value }
              })}
              placeholder="Имя исполнителя"
              required
            />
          </div>

          {/* Приоритет */}
          <div className="space-y-2">
            <Label htmlFor="priority">Приоритет</Label>
            <select
              id="priority"
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: e.target.value as TaskPriority })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="low">Низкий</option>
              <option value="medium">Средний</option>
              <option value="high">Высокий</option>
            </select>
          </div>

          {/* Тип */}
          <div className="space-y-2">
            <Label htmlFor="type">Тип задачи</Label>
            <select
              id="type"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value as TaskType })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="client">Клиент</option>
              <option value="deal">Сделка</option>
            </select>
          </div>

          {/* Количество подзадач */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="completed">Выполнено</Label>
              <Input
                id="completed"
                type="number"
                min="0"
                value={formData.progress.completed}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  progress: { ...formData.progress, completed: parseInt(e.target.value) || 0 }
                })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="total">Всего задач</Label>
              <Input
                id="total"
                type="number"
                min="0"
                value={formData.progress.total}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  progress: { ...formData.progress, total: parseInt(e.target.value) || 0 }
                })}
              />
            </div>
          </div>

          {/* Иконка */}
          <div className="space-y-2">
            <Label htmlFor="icon">Иконка (emoji)</Label>
            <Input
              id="icon"
              value={formData.icon}
              onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
              placeholder="🎯"
              maxLength={2}
            />
          </div>

          {/* Кнопки */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Отмена
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
            >
              Создать задачу
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
