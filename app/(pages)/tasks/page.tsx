"use client"

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { TaskHeader } from '@/components/tasks/TaskHeader'
import { TaskListView } from '@/components/tasks/TaskListView'
import { TaskBoardView } from '@/components/tasks/TaskBoardView'
import { mockTasks } from '@/data/mockTasks'
import { TaskStatus, Task } from '@/types/task'
import { CreateTaskStageDialog } from '@/components/tasks/CreateTaskStageDialog'
import { TaskEmptyState } from '@/components/tasks/TaskEmptyState'

export default function TasksPage() {
    const [activeStatus, setActiveStatus] = useState<TaskStatus | 'all'>('new')
    const [view, setView] = useState<'list' | 'board'>('board')
    const [selectedMonth, setSelectedMonth] = useState('Ноябрь, 2025')
    const [isStageDialogOpen, setIsStageDialogOpen] = useState(false)
    const router = useRouter()
    const [tasks, setTasks] = useState<Task[]>(mockTasks)
    const baseTaskIds = useMemo(() => new Set(mockTasks.map(task => task.id)), [])

    const readCustomTasks = () => {
        if (typeof window === 'undefined') return []
        try {
            const raw = window.localStorage.getItem('customTasks')
            return raw ? (JSON.parse(raw) as Task[]) : []
        } catch (error) {
            console.error('Failed to parse stored tasks', error)
            return []
        }
    }

    const persistCustomTasks = (updatedTasks: Task[]) => {
        const customTasks = updatedTasks.filter(task => !baseTaskIds.has(task.id))
        window.localStorage.setItem('customTasks', JSON.stringify(customTasks))
    }

    useEffect(() => {
        const storedTasks = readCustomTasks()
        if (storedTasks.length) {
            setTasks([...mockTasks, ...storedTasks])
        }
    }, [])
    
    const handleCreateTask = (newTask: Omit<Task, 'id'>) => {
        const task: Task = {
            ...newTask,
            id: Date.now().toString(),
        }
        const updatedTasks = [...tasks, task]
        setTasks(updatedTasks)
        if (typeof window !== 'undefined') {
            persistCustomTasks(updatedTasks)
        }
    }
    
    const handleOpenCreateDialog = () => {
        setIsStageDialogOpen(true)
    }

    const handleStageSelect = (status: TaskStatus) => {
        setIsStageDialogOpen(false)
        router.push(`/tasks/create?status=${status}`)
    }

    return (
        <div className="min-h-screen bg-white">
            <div className="p-8">
                {/* Header */}
                <TaskHeader
                    view={view}
                    onViewChange={setView}
                    selectedMonth={selectedMonth}
                    onMonthChange={setSelectedMonth}
                    onCreateTask={handleOpenCreateDialog}
                />

                {view === 'board' ? (
                    tasks.length === 0 ? (
                        <TaskEmptyState onCreate={handleOpenCreateDialog} />
                    ) : (
                        <div className="mt-6">
                            <TaskBoardView 
                                tasks={tasks} 
                                onCreateTask={handleCreateTask}
                            />
                        </div>
                    )
                ) : (
                    <>
                        {/* Filters for List View */}
                        <div className="mb-6 flex items-center gap-3">
                            <button 
                                onClick={() => setActiveStatus('new')}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                    activeStatus === 'new' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                                }`}
                            >
                                <span>✏️ Новые</span>
                            </button>
                            <button 
                                onClick={() => setActiveStatus('in_progress')}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                    activeStatus === 'in_progress' ? 'bg-yellow-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                                }`}
                            >
                                <span>📋 В работе</span>
                            </button>
                            <button 
                                onClick={() => setActiveStatus('completed')}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                    activeStatus === 'completed' ? 'bg-green-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                                }`}
                            >
                                <span>✅ Завершенные</span>
                            </button>
                            <button 
                                onClick={() => setActiveStatus('overdue')}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                    activeStatus === 'overdue' ? 'bg-red-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                                }`}
                            >
                                <span>⏰ Просроченные</span>
                            </button>
                        </div>
                        
                        <div className="mt-6">
                            {tasks.length === 0 ? (
                                <TaskEmptyState onCreate={handleOpenCreateDialog} />
                            ) : (
                                <TaskListView tasks={tasks} />
                            )}
                        </div>
                    </>
                )}
            </div>

            <CreateTaskStageDialog
                open={isStageDialogOpen}
                onClose={() => setIsStageDialogOpen(false)}
                onSelect={handleStageSelect}
            />

        </div>
    )
}
