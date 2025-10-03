
'use client';

import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
    Bell, HelpCircle, Menu, Search, Filter, MoreVertical, Plus, FileText
} from 'lucide-react'
import { Sidebar } from '@/components/Sidebar'
import { Input } from '@/components/ui/input'

const orders = [
    {
        id: '1',
        supplier: 'ООО "Техно"',
        orderNumber: 'ORD-001',
        date: '2025-10-01',
        status: 'В обработке',
        amount: '120 000 руб.'
    },
    {
        id: '2',
        supplier: 'ИП Петрова',
        orderNumber: 'ORD-002',
        date: '2025-10-02',
        status: 'Выполнен',
        amount: '75 000 руб.'
    },
    {
        id: '3',
        supplier: 'АО "Строй+"',
        orderNumber: 'ORD-003',
        date: '2025-10-03',
        status: 'Ожидает оплату',
        amount: '210 000 руб.'
    }
]

const OrdersPage = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <Sidebar activeIndex={1} />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col">
                {/* Top Bar */}
                <header className="bg-white border-b px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Menu className="w-6 h-6 text-gray-600 cursor-pointer" />
                        <h1 className="text-lg font-semibold text-gray-800">Заказы поставщикам</h1>
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
                        <a href="/procurement/orders" className="text-blue-500 border-b-2 border-blue-500 pb-2 text-sm font-medium">Заказы поставщикам</a>
                        <a href="/procurement/invoices" className="text-gray-600 hover:text-blue-500 pb-2 text-sm">Счета поставщиков</a>
                        <a href="/procurement/receipts" className="text-gray-600 hover:text-blue-500 pb-2 text-sm">Приемки</a>
                        <a href="/procurement/returns" className="text-gray-600 hover:text-blue-500 pb-2 text-sm">Возвраты поставщикам</a>
                        <a href="/procurement/factures" className="text-gray-600 hover:text-blue-500 pb-2 text-sm">Счета-фактуры полученные</a>
                        <a href="/procurement/management" className="text-gray-600 hover:text-blue-500 pb-2 text-sm">Управление закупками</a>
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
                                    Новый заказ
                                </Button>
                                <Button variant="outline" className="flex items-center gap-2">
                                    <Filter className="w-4 h-4" />
                                    Фильтры
                                </Button>
                            </div>
                            <div className="flex gap-4">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <Input
                                        placeholder="Поиск по заказам..."
                                        className="pl-10 w-64"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Orders List */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Список заказов поставщикам</CardTitle>
                                <CardDescription>Все заказы, оформленные у поставщиков</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <table className="w-full">
                                    <thead className="border-b">
                                        <tr className="text-sm text-gray-600">
                                            <th className="text-left py-3 px-4">Поставщик</th>
                                            <th className="text-left py-3">Номер заказа</th>
                                            <th className="text-left py-3">Дата</th>
                                            <th className="text-left py-3">Статус</th>
                                            <th className="text-right py-3">Сумма</th>
                                            <th className="text-right py-3 px-4">Действия</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders.map((order) => (
                                            <tr key={order.id} className="border-b hover:bg-gray-50">
                                                <td className="py-3 px-4">{order.supplier}</td>
                                                <td className="py-3">{order.orderNumber}</td>
                                                <td className="py-3">{order.date}</td>
                                                <td className="py-3">
                                                    <Badge variant="secondary">{order.status}</Badge>
                                                </td>
                                                <td className="py-3 text-right">{order.amount}</td>
                                                <td className="py-3 px-4">
                                                    <div className="flex justify-end gap-2">
                                                        <Button variant="ghost" size="sm">
                                                            <FileText className="w-4 h-4" />
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


export default OrdersPage;
