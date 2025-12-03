'use client'

import { useState, useEffect } from 'react'
import { Task, TaskStatus } from '@/types/task'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Plus, MoreVertical } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { CreateTaskDialog } from './CreateTaskDialog'
import { CreateColumnDialog } from './CreateColumnDialog'

interface Column {
    id: string
    title: string
    tasks: Task[]
}

interface TaskBoardViewProps {
    tasks: Task[]
    onCreateTask?: (task: Omit<Task, 'id'>) => void
}

export function TaskBoardView({ tasks, onCreateTask }: TaskBoardViewProps) {
    const [columns, setColumns] = useState<Column[]>([
        {
            id: 'new',
            title: 'Новые',
            tasks: tasks.filter(t => t.status === 'new')
        },
        {
            id: 'in_progress',
            title: 'В работе',
            tasks: tasks.filter(t => t.status === 'in_progress')
        },
        {
            id: 'completed',
            title: 'Завершенные',
            tasks: tasks.filter(t => t.status === 'completed')
        },
        {
            id: 'overdue',
            title: 'Просроченные',
            tasks: tasks.filter(t => t.status === 'overdue')
        },
    ])

    const [draggedTask, setDraggedTask] = useState<{ task: Task; fromColumnId: string } | null>(null)
    const [dragOverTarget, setDragOverTarget] = useState<{ columnId: string; taskId?: string } | null>(null)
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
    const [isCreateColumnDialogOpen, setIsCreateColumnDialogOpen] = useState(false)
    const [selectedColumnForNewTask, setSelectedColumnForNewTask] = useState<TaskStatus>('new')

    // Синхронизация колонок с внешним состоянием tasks
    useEffect(() => {
        setColumns([
            {
                id: 'new',
                title: 'Новые',
                tasks: tasks.filter(t => t.status === 'new')
            },
            {
                id: 'in_progress',
                title: 'В работе',
                tasks: tasks.filter(t => t.status === 'in_progress')
            },
            {
                id: 'completed',
                title: 'Завершенные',
                tasks: tasks.filter(t => t.status === 'completed')
            },
            {
                id: 'overdue',
                title: 'Просроченные',
                tasks: tasks.filter(t => t.status === 'overdue')
            },
        ])
    }, [tasks])

    const handleDragStart = (task: Task, columnId: string) => {
        setDraggedTask({ task, fromColumnId: columnId })
    }

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
    }

    const handleDragEnterTask = (taskId: string, columnId: string) => {
        setDragOverTarget({ columnId, taskId })
    }

    const handleDragEnterColumn = (columnId: string) => {
        setDragOverTarget({ columnId })
    }

    const handleDrop = (toColumnId: string) => {
        if (!draggedTask) return

        setColumns(prevColumns => {
            // Remove task from all columns first
            const cleanedColumns = prevColumns.map(col => ({
                ...col,
                tasks: col.tasks.filter(t => t.id !== draggedTask.task.id)
            }))

            return cleanedColumns.map(col => {
                if (col.id !== toColumnId) return col

                const tasksCopy = [...col.tasks]
                if (dragOverTarget && dragOverTarget.columnId === toColumnId && dragOverTarget.taskId) {
                    const targetIndex = tasksCopy.findIndex(t => t.id === dragOverTarget.taskId)
                    if (targetIndex === -1) {
                        tasksCopy.push(draggedTask.task)
                    } else {
                        tasksCopy.splice(targetIndex, 0, draggedTask.task)
                    }
                } else {
                    tasksCopy.push(draggedTask.task)
                }

                return { ...col, tasks: tasksCopy }
            })
        })

        setDraggedTask(null)
        setDragOverTarget(null)
    }

    const handleCreateTask = (newTask: Omit<Task, 'id'>) => {
        if (onCreateTask) {
            // Используем внешнюю функцию создания если она передана
            onCreateTask(newTask)
        } else {
            // Локальное создание задачи (fallback)
            const task: Task = {
                ...newTask,
                id: Date.now().toString(),
            }

            setColumns(prevColumns =>
                prevColumns.map(col =>
                    col.id === selectedColumnForNewTask
                        ? { ...col, tasks: [...col.tasks, task] }
                        : col
                )
            )
        }
    }

    const handleOpenCreateDialog = (columnId: TaskStatus) => {
        setSelectedColumnForNewTask(columnId)
        setIsCreateDialogOpen(true)
    }

    const handleCreateColumn = (title: string) => {
        const newColumn: Column = {
            id: `custom_${Date.now()}`,
            title: title,
            tasks: []
        }
        setColumns([...columns, newColumn])
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

    return (
        <div className="flex gap-4 h-[calc(100vh-250px)] overflow-x-auto pb-4">
            {columns.map((column) => {
                const isActiveColumn = dragOverTarget?.columnId === column.id

                return (
                <div
                    key={column.id}
                    className={`flex-shrink-0 w-80 rounded-2xl bg-gray-50/60 p-3 transition ${
                        isActiveColumn ? 'ring-2 ring-blue-200' : ''
                    }`}
                    onDragOver={handleDragOver}
                    onDrop={() => handleDrop(column.id)}
                >
                    {/* Column Header */}
                    <div className="flex items-center gap-2 mb-4">
                        <button 
                            onClick={() => handleOpenCreateDialog(column.id as TaskStatus)}
                            className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                        >
                            <Plus className="w-4 h-4" />
                            <span>{column.title}</span>
                        </button>
                        <span className="bg-yellow-100 text-yellow-700 text-xs font-semibold px-2 py-1 rounded">
                            {column.tasks.length}
                        </span>
                    </div>

                    {/* Tasks */}
                    <div
                        className="space-y-3 overflow-y-auto max-h-full"
                        onDragEnter={() => handleDragEnterColumn(column.id)}
                    >
                        {column.tasks.map((task, index) => {
                            const percentage = Math.round((task.progress.completed / task.progress.total) * 100)

                            const priorityText =
                                task.priority === 'low'
                                    ? 'Низкий приоритет'
                                    : task.priority === 'medium'
                                        ? 'Средний приоритет'
                                        : 'Высокий приоритет'

                            const priorityColor =
                                task.priority === 'low'
                                    ? 'text-green-500'
                                    : task.priority === 'medium'
                                        ? 'text-yellow-500'
                                        : 'text-red-500'

                            const showIndicator =
                                dragOverTarget?.columnId === column.id &&
                                dragOverTarget?.taskId === task.id

                            return (
                                <div key={task.id} className="space-y-2">
                                    {showIndicator && (
                                        <div className="h-1 rounded-full bg-blue-400 transition-all" />
                                    )}
                                <Card
                                    draggable
                                    onDragStart={() => handleDragStart(task, column.id)}
                                    className="cursor-grab rounded-2xl border border-transparent bg-[#F9F9FA] p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-blue-100 hover:shadow-lg active:cursor-grabbing"
                                    onDragEnter={() => handleDragEnterTask(task.id, column.id)}
                                >
                                    {/* Task Header */}
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="flex-1">
                                            <h4 className="text-base font-semibold text-gray-900">
                                                {task.title}
                                            </h4>
                                            <p className="text-xs text-gray-400 mt-1">
                                                Дедлайн: {task.deadline}
                                            </p>
                                        </div>
                                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-orange-50 text-xl">
                                            {task.icon}
                                        </div>
                                    </div>

                                    {/* Assignee & Priority */}
                                    <div className="mt-4 flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Avatar className="h-8 w-8">
                                                <AvatarImage src={task.assignee.avatar} alt={task.assignee.name} />
                                                <AvatarFallback>{task.assignee.name[0]}</AvatarFallback>
                                            </Avatar>
                                            <span className="text-sm font-medium text-gray-800">
                                                {task.assignee.name}
                                            </span>
                                        </div>
                                        <div className={`flex items-center gap-1 text-xs font-semibold ${priorityColor}`}>
                                            <span className={`h-2 w-2 rounded-full ${priorityColor.replace('text', 'bg')}`} />
                                            {priorityText}
                                        </div>
                                    </div>

                                    {/* Progress Bar */}
                                    <div className="mt-4">
                                        <div className="flex items-center justify-between text-xs text-gray-500">
                                            <span>{task.progress.completed} / {task.progress.total} Задач</span>
                                            <span className="font-semibold text-gray-900">{percentage}%</span>
                                        </div>
                                        <div className="mt-2 h-1.5 rounded-full bg-blue-100">
                                            <div
                                                className="h-full rounded-full bg-blue-500 transition-all duration-300"
                                                style={{ width: `${percentage}%` }}
                                            />
                                        </div>
                                    </div>

                                    {/* Type */}
                                    <div className="mt-4 flex items-center gap-2 text-xs font-medium text-gray-600">
                                        <span>📁</span>
                                        <span>{task.type === 'client' ? 'Клиент' : 'Сделка'}</span>
                                    </div>
                                </Card>
                                </div>
                            )
                        })}

                        {isActiveColumn && !dragOverTarget?.taskId && (
                            <div className="h-1 rounded-full bg-blue-400 transition-all" />
                        )}

                    </div>
                </div>
            )})}

            {/* Add Column Button */}
            <div className="flex-shrink-0 w-80">
                <button
                    onClick={() => setIsCreateColumnDialogOpen(true)}
                    className="w-full py-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:text-gray-700 hover:border-gray-400 hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
                >
                    <Plus className="w-5 h-5" />
                    <span className="text-sm font-medium">Добавить колонку</span>
                </button>
            </div>

            {/* Create Task Dialog */}
            <CreateTaskDialog
                open={isCreateDialogOpen}
                onClose={() => setIsCreateDialogOpen(false)}
                onCreateTask={handleCreateTask}
                defaultStatus={selectedColumnForNewTask}
            />

            {/* Create Column Dialog */}
            <CreateColumnDialog
                open={isCreateColumnDialogOpen}
                onClose={() => setIsCreateColumnDialogOpen(false)}
                onCreateColumn={handleCreateColumn}
            />
        </div>
    )
}
