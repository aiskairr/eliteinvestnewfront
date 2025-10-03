
'use client';

import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
    Bell, 
    HelpCircle, 
    User, 
    Cloud, 
    ShoppingCart, 
    Package, 
    Users, 
    BarChart3, 
    Menu, 
    Search,
    Filter,
    Clock,
    FileText,
    Edit,
    Trash2,
    Download,
    UserCheck,
    Calendar
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Sidebar } from '@/components/Sidebar';

const AuditPage = () => {
    const auditLogs = [
        {
            id: '1',
            action: 'Создание',
            description: 'Создан новый договор поставки №123',
            date: '2025-10-03 14:30',
            user: 'Иван Петров',
            type: 'document',
            status: 'success'
        },
        {
            id: '2',
            action: 'Изменение',
            description: 'Обновлены данные клиента ООО "Технопром"',
            date: '2025-10-03 13:15',
            user: 'Мария Сидорова',
            type: 'client',
            status: 'warning'
        },
        {
            id: '3',
            action: 'Удаление',
            description: 'Удален счет №456',
            date: '2025-10-03 12:45',
            user: 'Алексей Иванов',
            type: 'invoice',
            status: 'danger'
        },
        {
            id: '4',
            action: 'Экспорт',
            description: 'Выгружен отчет по продажам за сентябрь',
            date: '2025-10-03 11:20',
            user: 'Елена Смирнова',
            type: 'export',
            status: 'info'
        },
        {
            id: '5',
            action: 'Авторизация',
            description: 'Выполнен вход в систему',
            date: '2025-10-03 09:00',
            user: 'Иван Петров',
            type: 'auth',
            status: 'success'
        }
    ]

    const getActionIcon = (type: string) => {
        switch (type) {
            case 'document':
                return <FileText className="w-4 h-4" />
            case 'client':
                return <User className="w-4 h-4" />
            case 'invoice':
                return <FileText className="w-4 h-4" />
            case 'export':
                return <Download className="w-4 h-4" />
            case 'auth':
                return <UserCheck className="w-4 h-4" />
            default:
                return <Edit className="w-4 h-4" />
        }
    }

   const STYLES = {
  success: 'bg-green-100 text-green-800',
  warning: 'bg-yellow-100 text-yellow-800',
  danger:  'bg-red-100 text-red-800',
  info:    'bg-blue-100 text-blue-800',
} as any;

type Status = keyof typeof STYLES; // 'success' | 'warning' | 'danger' | 'info'

function getStatusBadge(status: Status) {
  return STYLES[status]; // Ок
}


    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <Sidebar activeIndex={0} />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col">
                {/* Top Bar */}
                <header className="bg-white border-b px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Menu className="w-6 h-6 text-gray-600 cursor-pointer" />
                        <h1 className="text-lg font-semibold text-gray-800">Аудит</h1>
                    </div>
                    
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon">
                            <Bell className="w-5 h-5 text-gray-600" />
                        </Button>
                        <Button variant="ghost" size="icon">
                            <HelpCircle className="w-5 h-5 text-gray-600" />
                        </Button>
                    </div>
                </header>

                {/* Secondary Navigation */}
                <div className="bg-white border-b">
                    <div className="px-6 py-3 flex gap-6">
                        <a href="/main/Indicators" className="text-gray-600 hover:text-blue-500 pb-2 text-sm">
                            Показатели
                        </a>
                        <a href="/main/documents" className="text-gray-600 hover:text-blue-500 pb-2 text-sm">
                            Документы
                        </a>
                        <a href="/main/trash" className="text-gray-600 hover:text-blue-500 pb-2 text-sm">
                            Корзина
                        </a>
                        <a href="/main/audit" className="text-blue-500 border-b-2 border-blue-500 pb-2 text-sm font-medium">
                            Аудит
                        </a>
                        <a href="/main/files" className="text-gray-600 hover:text-blue-500 pb-2 text-sm">
                            Файлы
                        </a>
                    </div>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-auto bg-gray-50">
                    <div className="max-w-7xl mx-auto px-6 py-8">
                        {/* Actions Bar */}
                        <div className="mb-6 flex justify-between items-center">
                            <div className="flex gap-4">
                                <Button variant="outline" className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    Выбрать период
                                </Button>
                                <Button variant="outline" className="flex items-center gap-2">
                                    <Download className="w-4 h-4" />
                                    Экспорт
                                </Button>
                            </div>
                            <div className="flex gap-4">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <Input
                                        placeholder="Поиск в журнале..."
                                        className="pl-10 w-64"
                                    />
                                </div>
                                <Button variant="outline" className="flex items-center gap-2">
                                    <Filter className="w-4 h-4" />
                                    Фильтры
                                </Button>
                            </div>
                        </div>

                        {/* Audit Log */}
                        <Card>
                            <CardHeader>
                                <CardTitle>История действий</CardTitle>
                                <CardDescription>
                                    Журнал всех действий пользователей в системе
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {auditLogs.map((log) => (
                                        <div key={log.id} className="border rounded-lg p-4 bg-white hover:shadow-sm transition-shadow">
                                            <div className="flex items-start justify-between">
                                                <div className="flex gap-4">
                                                    <div className={`p-2 rounded-lg ${getStatusBadge(log.status)}`}>
                                                        {getActionIcon(log.type)}
                                                    </div>
                                                    <div>
                                                        <div className="flex items-center gap-2">
                                                            <h3 className="font-medium">{log.action}</h3>
                                                            <Badge variant="secondary" className="font-normal">
                                                                {log.type}
                                                            </Badge>
                                                        </div>
                                                        <p className="text-gray-600 mt-1">
                                                            {log.description}
                                                        </p>
                                                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                                                            <div className="flex items-center gap-1">
                                                                <Clock className="w-4 h-4" />
                                                                {log.date}
                                                            </div>
                                                            <div className="flex items-center gap-1">
                                                                <User className="w-4 h-4" />
                                                                {log.user}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Pagination */}
                                <div className="mt-6 flex items-center justify-between text-sm text-gray-500">
                                    <div>Показано 1-5 из 50</div>
                                    <div className="flex items-center gap-2">
                                        <Button variant="outline" size="sm">
                                            Назад
                                        </Button>
                                        <Button variant="outline" size="sm">
                                            Вперед
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}

interface SidebarItemProps {
    icon: React.ReactNode
    label: string
    active?: boolean
}



export default AuditPage;