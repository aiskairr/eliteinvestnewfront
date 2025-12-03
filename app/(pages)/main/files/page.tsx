
'use client';

import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
    Bell, 
    HelpCircle, 
    Menu, 
    Search,
    Filter,
    FileText,
    Download,
    MoreVertical,
    Trash2,
    Plus
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Sidebar } from '@/components/Sidebar';

const files = [
    {
        id: '1',
        name: 'Договор поставки №123.pdf',
        type: 'PDF',
        size: '256 KB',
        uploadedDate: '2025-10-01',
        uploadedBy: 'Иван Петров'
    },
    {
        id: '2',
        name: 'Коммерческое предложение.docx',
        type: 'DOCX',
        size: '1.2 MB',
        uploadedDate: '2025-10-02',
        uploadedBy: 'Мария Сидорова'
    },
    {
        id: '3',
        name: 'Счет-фактура №456.xlsx',
        type: 'XLSX',
        size: '128 KB',
        uploadedDate: '2025-10-03',
        uploadedBy: 'Алексей Иванов'
    }
]

const FilesPage = () => {
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
                        <h1 className="text-lg font-semibold text-gray-800">Файлы</h1>
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
                        <a href="/main/audit" className="text-gray-600 hover:text-blue-500 pb-2 text-sm">
                            Аудит
                        </a>
                        <a href="/main/files" className="text-blue-500 border-b-2 border-blue-500 pb-2 text-sm font-medium">
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
                                    <Plus className="w-4 h-4" />
                                    Загрузить файл
                                </Button>
                                <Button variant="outline" className="flex items-center gap-2">
                                    <Trash2 className="w-4 h-4" />
                                    Удалить выбранные
                                </Button>
                            </div>
                            <div className="flex gap-4">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <Input
                                        placeholder="Поиск по файлам..."
                                        className="pl-10 w-64"
                                    />
                                </div>
                                <Button variant="outline" className="flex items-center gap-2">
                                    <Filter className="w-4 h-4" />
                                    Фильтры
                                </Button>
                            </div>
                        </div>

                        {/* Files List */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Список файлов</CardTitle>
                                <CardDescription>
                                    Все загруженные файлы в системе
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
                                            <th className="text-left py-3">Дата загрузки</th>
                                            <th className="text-left py-3">Загрузил</th>
                                            <th className="text-right py-3">Размер</th>
                                            <th className="text-right py-3 px-4">Действия</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {files.map((file) => (
                                            <tr key={file.id} className="border-b hover:bg-gray-50">
                                                <td className="py-3 px-4">
                                                    <input type="checkbox" className="rounded border-gray-300" />
                                                </td>
                                                <td className="py-3">
                                                    <div className="flex items-center gap-2">
                                                        <FileText className="w-4 h-4 text-gray-400" />
                                                        <span>{file.name}</span>
                                                    </div>
                                                </td>
                                                <td className="py-3">
                                                    <Badge variant="secondary">
                                                        {file.type}
                                                    </Badge>
                                                </td>
                                                <td className="py-3">{file.uploadedDate}</td>
                                                <td className="py-3">{file.uploadedBy}</td>
                                                <td className="py-3 text-right">{file.size}</td>
                                                <td className="py-3 px-4">
                                                    <div className="flex justify-end gap-2">
                                                        <Button variant="ghost" size="sm">
                                                            <Download className="w-4 h-4" />
                                                        </Button>
                                                        <Button variant="ghost" size="sm">
                                                            <Trash2 className="w-4 h-4" />
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

export default FilesPage;
