'use client';

import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
    Bell, 
    HelpCircle, 
    Menu, 
    Trash2, 
    RotateCcw,
    Search,
    Filter,
    MoreVertical,
    Download
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Sidebar } from '@/components/Sidebar';

const TrashPage = () => {
    const deletedItems = [
        {
            id: '1',
            name: 'Договор поставки №123',
            type: 'Документ',
            deletedDate: '2025-10-01',
            deletedBy: 'Иван Петров',
            size: '256 KB'
        },
        {
            id: '2',
            name: 'Коммерческое предложение',
            type: 'PDF',
            deletedDate: '2025-10-02',
            deletedBy: 'Мария Сидорова',
            size: '1.2 MB'
        },
        {
            id: '3',
            name: 'Счет-фактура №456',
            type: 'Документ',
            deletedDate: '2025-10-03',
            deletedBy: 'Алексей Иванов',
            size: '128 KB'
        }
    ]

    return (
        <div className="min-h-screen bg-white flex">
            {/* Sidebar */}
           <Sidebar activeIndex={0} />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col">
                {/* Top Bar */}
                <header className="bg-white border-b px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Menu className="w-6 h-6 text-gray-600 cursor-pointer" />
                        <h1 className="text-lg font-semibold text-gray-800">Корзина</h1>
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
                        <a href="/main/trash" className="text-blue-500 border-b-2 border-blue-500 pb-2 text-sm font-medium">
                            Корзина
                        </a>
                        <a href="/main/audit" className="text-gray-600 hover:text-blue-500 pb-2 text-sm">
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
                                    <RotateCcw className="w-4 h-4" />
                                    Восстановить выбранные
                                </Button>
                                <Button variant="destructive" className="flex items-center gap-2">
                                    <Trash2 className="w-4 h-4" />
                                    Удалить навсегда
                                </Button>
                            </div>
                            <div className="flex gap-4">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <Input
                                        placeholder="Поиск в корзине..."
                                        className="pl-10 w-64"
                                    />
                                </div>
                                <Button variant="outline" className="flex items-center gap-2">
                                    <Filter className="w-4 h-4" />
                                    Фильтры
                                </Button>
                            </div>
                        </div>

                        {/* Deleted Items List */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-red-600">Удаленные элементы</CardTitle>
                                <CardDescription>
                                    Элементы хранятся в корзине 30 дней, после чего автоматически удаляются
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <table className="w-full">
                                    <thead className="border-b">
                                        <tr className="text-sm text-gray-600">
                                            <th className="text-left py-3 px-4">
                                                <input type="checkbox" className="rounded border-gray-300" />
                                            </th>
                                            <th className="text-left py-3">Название</th>
                                            <th className="text-left py-3">Тип</th>
                                            <th className="text-left py-3">Дата удаления</th>
                                            <th className="text-left py-3">Удалил</th>
                                            <th className="text-right py-3">Размер</th>
                                            <th className="text-right py-3 px-4">Действия</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {deletedItems.map((item) => (
                                            <tr key={item.id} className="border-b hover:bg-gray-50">
                                                <td className="py-3 px-4">
                                                    <input type="checkbox" className="rounded border-gray-300" />
                                                </td>
                                                <td className="py-3">
                                                    <div className="flex items-center gap-2">
                                                        <Trash2 className="w-4 h-4 text-gray-400" />
                                                        <span>{item.name}</span>
                                                    </div>
                                                </td>
                                                <td className="py-3">
                                                    <Badge variant="secondary">
                                                        {item.type}
                                                    </Badge>
                                                </td>
                                                <td className="py-3">{item.deletedDate}</td>
                                                <td className="py-3">{item.deletedBy}</td>
                                                <td className="py-3 text-right">{item.size}</td>
                                                <td className="py-3 px-4">
                                                    <div className="flex justify-end gap-2">
                                                        <Button variant="ghost" size="sm">
                                                            <RotateCcw className="w-4 h-4" />
                                                        </Button>
                                                        <Button variant="ghost" size="sm">
                                                            <Download className="w-4 h-4" />
                                                        </Button>
                                                        <Button variant="ghost" size="sm">
                                                            <MoreVertical className="w-4 h-4" />
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                {/* Pagination */}
                                <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                                    <div>Показано 1-3 из 3</div>
                                    <div className="flex items-center gap-2">
                                        <Button variant="outline" size="sm" disabled>
                                            Назад
                                        </Button>
                                        <Button variant="outline" size="sm" disabled>
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

export default TrashPage
