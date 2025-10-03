"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { X, Plus, GripVertical, Bell, Calendar } from 'lucide-react'

interface Task {
    id: string
    title: string
    description: string
    dueDate: string
    reminder: string
    reminderShown: boolean
    createdAt: string
}

interface Column {
    id: string
    title: string
    tasks: Task[]
}

interface DraggedTask {
    task: Task
    fromColumnId: string
}

interface EditingTask extends Task {
    columnId: string
}

interface NewTaskForm {
    title: string
    description: string
    dueDate: string
    reminder: string
}

const TasksPage = () => {
    const [columns, setColumns] = useState<Column[]>([
        { id: '1', title: 'К выполнению', tasks: [] },
        { id: '2', title: 'В процессе', tasks: [] },
        { id: '3', title: 'Выполнено', tasks: [] }
    ])
    
    const [draggedTask, setDraggedTask] = useState<DraggedTask | null>(null)
    const [isAddingTask, setIsAddingTask] = useState<string | null>(null)
    const [isAddingColumn, setIsAddingColumn] = useState<boolean>(false)
    const [newColumnTitle, setNewColumnTitle] = useState<string>('')
    const [newTask, setNewTask] = useState<NewTaskForm>({ title: '', description: '', dueDate: '', reminder: '' })
    const [editingTask, setEditingTask] = useState<EditingTask | null>(null)

    // Проверка напоминаний
    useEffect(() => {
        const checkReminders = setInterval(() => {
            const now = new Date()
            columns.forEach(column => {
                column.tasks.forEach(task => {
                    if (task.reminder && !task.reminderShown) {
                        const reminderTime = new Date(task.reminder)
                        if (reminderTime <= now) {
                            showNotification(task)
                            markReminderAsShown(task.id)
                        }
                    }
                })
            })
        }, 30000) // Проверка каждые 30 секунд

        return () => clearInterval(checkReminders)
    }, [columns])

    const showNotification = (task: any) => {
        if ('Notification' in window && Notification.permission === 'granted') {
            new Notification('Напоминание о задаче', {
                body: `${task.title}\n${task.dueDate ? 'Срок: ' + new Date(task.dueDate).toLocaleDateString() : ''}`,
                icon: '🔔'
            })
        } else {
            alert(`Напоминание: ${task.title}`)
        }
    }

    const markReminderAsShown = (taskId: any) => {
        setColumns(prevColumns => 
            prevColumns.map(column => ({
                ...column,
                tasks: column.tasks.map(task => 
                    task.id === taskId ? { ...task, reminderShown: true } : task
                )
            }))
        )
    }

    const requestNotificationPermission = () => {
        if ('Notification' in window && Notification.permission === 'default') {
            Notification.requestPermission()
        }
    }

    useEffect(() => {
        requestNotificationPermission()
    }, [])

    const addColumn = () => {
        if (newColumnTitle.trim()) {
            setColumns([...columns, {
                id: Date.now().toString(),
                title: newColumnTitle,
                tasks: []
            }])
            setNewColumnTitle('')
            setIsAddingColumn(false)
        }
    }

    const deleteColumn = (columnId: any) => {
        setColumns(columns.filter(col => col.id !== columnId))
    }

    const addTask = (columnId: any) => {
        if (newTask.title.trim()) {
            const task = {
                id: Date.now().toString(),
                title: newTask.title,
                description: newTask.description,
                dueDate: newTask.dueDate,
                reminder: newTask.reminder,
                reminderShown: false,
                createdAt: new Date().toISOString()
            }
            
            setColumns(columns.map(col => 
                col.id === columnId 
                    ? { ...col, tasks: [...col.tasks, task] }
                    : col
            ))
            
            setNewTask({ title: '', description: '', dueDate: '', reminder: '' })
            setIsAddingTask(null)
        }
    }

    const deleteTask = (columnId: any, taskId: any) => {
        setColumns(columns.map(col => 
            col.id === columnId 
                ? { ...col, tasks: col.tasks.filter(task => task.id !== taskId) }
                : col
        ))
    }

    const updateTask = (columnId: any, taskId: any, updates: any) => {
        setColumns(columns.map(col => 
            col.id === columnId 
                ? { 
                    ...col, 
                    tasks: col.tasks.map(task => 
                        task.id === taskId 
                            ? { ...task, ...updates, reminderShown: false }
                            : task
                    )
                }
                : col
        ))
        setEditingTask(null)
    }

    const handleDragStart = (e: any, task: any, columnId: any) => {
        setDraggedTask({ task, fromColumnId: columnId })
    }

    const handleDragOver = (e: any) => {
        e.preventDefault()
    }

    const handleDrop = (e: any, toColumnId: any) => {
        e.preventDefault()
        if (!draggedTask) return

        const { task, fromColumnId } = draggedTask
        
        if (fromColumnId === toColumnId) {
            setDraggedTask(null)
            return
        }

        setColumns(columns.map(col => {
            if (col.id === fromColumnId) {
                return { ...col, tasks: col.tasks.filter(t => t.id !== task.id) }
            }
            if (col.id === toColumnId) {
                return { ...col, tasks: [...col.tasks, task] }
            }
            return col
        }))
        
        setDraggedTask(null)
    }

    const isOverdue = (dueDate: any) => {
        if (!dueDate) return false
        return new Date(dueDate) < new Date()
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-9xl mx-auto">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-black">Доска задач</h1>
                    <p className="text-gray-600 mt-2">Управляйте задачами с помощью drag & drop</p>
                </div>

                <div className="flex gap-4 overflow-x-auto pb-4">
                    {columns.map(column => (
                        <div 
                            key={column.id}
                            className="flex-shrink-0 w-80"
                            onDragOver={handleDragOver}
                            onDrop={(e) => handleDrop(e, column.id)}
                        >
                            <Card className="h-full border-2 border-gray-200">
                                <CardHeader className="bg-gray-100 border-b-2 border-gray-200">
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="text-lg font-semibold">
                                            {column.title}
                                            <span className="ml-2 text-sm text-gray-500">
                                                ({column.tasks.length})
                                            </span>
                                        </CardTitle>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => deleteColumn(column.id)}
                                            className="h-8 w-8 p-0 hover:bg-red-100"
                                        >
                                            <X className="h-4 w-4 text-red-600" />
                                        </Button>
                                    </div>
                                </CardHeader>

                                <CardContent className="p-3 space-y-3 min-h-[200px]">
                                    {column.tasks.map(task => (
                                        <div key={task.id}>
                                            {editingTask?.id === task.id && editingTask?.columnId === column.id ? (
                                                <Card className="p-3 border-2 border-blue-500">
                                                    <div className="space-y-2">
                                                        <Input
                                                            placeholder="Название задачи"
                                                            value={editingTask.title}
                                                            onChange={(e) => setEditingTask({...editingTask, title: e.target.value})}
                                                            className="font-semibold"
                                                        />
                                                        <Textarea
                                                            placeholder="Описание"
                                                            value={editingTask.description}
                                                            onChange={(e) => setEditingTask({...editingTask, description: e.target.value})}
                                                            rows={2}
                                                        />
                                                        <div className="grid grid-cols-2 gap-2">
                                                            <div>
                                                                <Label className="text-xs">Срок</Label>
                                                                <Input
                                                                    type="datetime-local"
                                                                    value={editingTask.dueDate}
                                                                    onChange={(e) => setEditingTask({...editingTask, dueDate: e.target.value})}
                                                                    className="text-xs"
                                                                />
                                                            </div>
                                                            <div>
                                                                <Label className="text-xs">Напоминание</Label>
                                                                <Input
                                                                    type="datetime-local"
                                                                    value={editingTask.reminder}
                                                                    onChange={(e) => setEditingTask({...editingTask, reminder: e.target.value})}
                                                                    className="text-xs"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="flex gap-2">
                                                            <Button
                                                                size="sm"
                                                                onClick={() => updateTask(column.id, task.id, editingTask)}
                                                                className="flex-1"
                                                            >
                                                                Сохранить
                                                            </Button>
                                                            <Button
                                                                size="sm"
                                                                variant="outline"
                                                                onClick={() => setEditingTask(null)}
                                                                className="flex-1"
                                                            >
                                                                Отмена
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </Card>
                                            ) : (
                                                <Card
                                                    draggable
                                                    onDragStart={(e) => handleDragStart(e, task, column.id)}
                                                    className="cursor-move hover:shadow-md transition-shadow border-2 border-gray-200 hover:border-gray-400"
                                                    onClick={() => setEditingTask({ ...task, columnId: column.id })}
                                                >
                                                    <CardContent className="p-3">
                                                        <div className="flex items-start justify-between mb-2">
                                                            <div className="flex items-start gap-2 flex-1">
                                                                <GripVertical className="h-4 w-4 text-gray-400 mt-1 flex-shrink-0" />
                                                                <div className="flex-1">
                                                                    <h3 className="font-semibold text-sm">{task.title}</h3>
                                                                    {task.description && (
                                                                        <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                                                                            {task.description}
                                                                        </p>
                                                                    )}
                                                                </div>
                                                            </div>
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                onClick={(e) => {
                                                                    e.stopPropagation()
                                                                    deleteTask(column.id, task.id)
                                                                }}
                                                                className="h-6 w-6 p-0 hover:bg-red-100 ml-2"
                                                            >
                                                                <X className="h-3 w-3 text-red-600" />
                                                            </Button>
                                                        </div>
                                                        
                                                        <div className="flex flex-wrap gap-2 mt-2">
                                                            {task.dueDate && (
                                                                <div className={`flex items-center gap-1 text-xs px-2 py-1 rounded ${
                                                                    isOverdue(task.dueDate) 
                                                                        ? 'bg-red-100 text-red-700' 
                                                                        : 'bg-blue-100 text-blue-700'
                                                                }`}>
                                                                    <Calendar className="h-3 w-3" />
                                                                    {new Date(task.dueDate).toLocaleDateString('ru-RU', {
                                                                        day: '2-digit',
                                                                        month: 'short',
                                                                        hour: '2-digit',
                                                                        minute: '2-digit'
                                                                    })}
                                                                </div>
                                                            )}
                                                            {task.reminder && !task.reminderShown && (
                                                                <div className="flex items-center gap-1 text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">
                                                                    <Bell className="h-3 w-3" />
                                                                    {new Date(task.reminder).toLocaleDateString('ru-RU', {
                                                                        day: '2-digit',
                                                                        month: 'short',
                                                                        hour: '2-digit',
                                                                        minute: '2-digit'
                                                                    })}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            )}
                                        </div>
                                    ))}

                                    {isAddingTask === column.id ? (
                                        <Card className="p-3 border-2 border-blue-500">
                                            <div className="space-y-2">
                                                <Input
                                                    placeholder="Название задачи"
                                                    value={newTask.title}
                                                    onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                                                    autoFocus
                                                />
                                                <Textarea
                                                    placeholder="Описание (необязательно)"
                                                    value={newTask.description}
                                                    onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                                                    rows={2}
                                                />
                                                <div className="grid grid-cols-2 gap-2">
                                                    <div>
                                                        <Label className="text-xs">Срок выполнения</Label>
                                                        <Input
                                                            type="datetime-local"
                                                            value={newTask.dueDate}
                                                            onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
                                                            className="text-xs"
                                                        />
                                                    </div>
                                                    <div>
                                                        <Label className="text-xs">Напоминание</Label>
                                                        <Input
                                                            type="datetime-local"
                                                            value={newTask.reminder}
                                                            onChange={(e) => setNewTask({...newTask, reminder: e.target.value})}
                                                            className="text-xs"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="flex gap-2">
                                                    <Button
                                                        size="sm"
                                                        onClick={() => addTask(column.id)}
                                                        className="flex-1"
                                                    >
                                                        Добавить
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        onClick={() => {
                                                            setIsAddingTask(null)
                                                            setNewTask({ title: '', description: '', dueDate: '', reminder: '' })
                                                        }}
                                                        className="flex-1"
                                                    >
                                                        Отмена
                                                    </Button>
                                                </div>
                                            </div>
                                        </Card>
                                    ) : (
                                        <Button
                                            variant="ghost"
                                            className="w-full justify-start text-gray-600 hover:bg-gray-100"
                                            onClick={() => setIsAddingTask(column.id)}
                                        >
                                            <Plus className="h-4 w-4 mr-2" />
                                            Добавить задачу
                                        </Button>
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                    ))}

                    {isAddingColumn ? (
                        <div className="flex-shrink-0 w-80">
                            <Card className="border-2 border-blue-500">
                                <CardContent className="p-4">
                                    <Input
                                        placeholder="Название колонки"
                                        value={newColumnTitle}
                                        onChange={(e) => setNewColumnTitle(e.target.value)}
                                        autoFocus
                                        onKeyPress={(e) => e.key === 'Enter' && addColumn()}
                                    />
                                    <div className="flex gap-2 mt-3">
                                        <Button size="sm" onClick={addColumn} className="flex-1">
                                            Добавить
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => {
                                                setIsAddingColumn(false)
                                                setNewColumnTitle('')
                                            }}
                                            className="flex-1"
                                        >
                                            Отмена
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    ) : (
                        <Button
                            variant="outline"
                            className="flex-shrink-0 w-80 h-fit border-2 border-dashed border-gray-300 hover:border-gray-400 hover:bg-gray-50"
                            onClick={() => setIsAddingColumn(true)}
                        >
                            <Plus className="h-5 w-5 mr-2" />
                            Добавить колонку
                        </Button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default TasksPage