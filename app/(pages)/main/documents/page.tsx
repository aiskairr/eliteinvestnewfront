"use client"

import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Bell, HelpCircle, User, Cloud, ShoppingCart, Package, Users, BarChart3, Menu, Info, ChevronLeft, ChevronRight } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Sidebar } from '@/components/Sidebar'

const MainPage = () => {
    const salesData = [
        { month: 'Май', приход: 0, расход: 0, остаток: 0 },
        { month: 'Июнь', приход: 0, расход: 0, остаток: 0 },
        { month: 'Июль', приход: 0, расход: 0, остаток: 0 },
        { month: 'Авг', приход: 0, расход: 0, остаток: 0 },
        { month: 'Сент', приход: 0, расход: 0, остаток: 0 },
        { month: 'Окт', приход: 0, расход: 0, остаток: 0 },
    ]

    const weekData = [
        { day: 'Пн', value: 0 },
        { day: 'Вт', value: 0 },
        { day: 'Ср', value: 0 },
        { day: 'Чт', value: 0 },
        { day: 'Пт', value: 0 },
        { day: 'Сб', value: 0 },
        { day: 'Вс', value: 0 },
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
                        <h1 className="text-lg font-semibold text-gray-800">Показатели</h1>
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
                        {/* Sales Section */}
                        <div className="mb-8">
                            <h2 className="text-xl font-bold text-red-600 mb-4">Продажи</h2>
                            
                            {/* Time Period Tabs */}
                            <div className="flex gap-2 mb-4">
                                <Button variant="outline" size="sm" className="bg-gray-200">Неделя</Button>
                                <Button variant="outline" size="sm">Месяц</Button>
                                <Button variant="outline" size="sm">Год</Button>
                            </div>

                            {/* Stats Cards */}
                            <div className="grid grid-cols-3 gap-4 mb-6">
                                <Card>
                                    <CardContent className="pt-6">
                                        <div className="text-center">
                                            <div className="text-sm text-gray-500 mb-2">Сегодня, пятница 3 октября</div>
                                            <div className="text-3xl font-bold mb-1">0</div>
                                            <div className="text-sm text-gray-500">Продаж</div>
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardContent className="pt-6">
                                        <div className="text-center">
                                            <div className="text-3xl font-bold mb-1">0</div>
                                            <div className="text-sm text-gray-500">сом</div>
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardContent className="pt-6">
                                        <div className="text-center">
                                            <div className="text-3xl font-bold mb-1">0 <span className="text-sm">сом</span> (0%)</div>
                                            <div className="text-sm text-gray-500">По сравнению с интервалом</div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Week Stats */}
                            <div className="grid grid-cols-3 gap-4 mb-6">
                                <Card>
                                    <CardContent className="pt-6">
                                        <div className="text-center">
                                            <div className="text-sm text-gray-500 mb-2">На этой неделе</div>
                                            <div className="text-3xl font-bold mb-1">0</div>
                                            <div className="text-sm text-gray-500">Продаж</div>
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardContent className="pt-6">
                                        <div className="text-center">
                                            <div className="text-3xl font-bold mb-1">0</div>
                                            <div className="text-sm text-gray-500">сом</div>
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardContent className="pt-6">
                                        <div className="text-center">
                                            <div className="text-3xl font-bold mb-1">0 <span className="text-sm">сом</span> (0%)</div>
                                            <div className="text-sm text-gray-500">По сравнению с прошлой неделей</div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Chart */}
                            <Card className="mb-6">
                                <CardContent className="pt-6">
                                    <ResponsiveContainer width="100%" height={250}>
                                        <LineChart data={weekData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="day" />
                                            <YAxis />
                                            <Tooltip />
                                            <Line type="monotone" dataKey="value" stroke="#3b82f6" />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Orders and Invoices */}
                        <div className="grid grid-cols-2 gap-6 mb-8">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-red-600">
                                        <Info className="w-5 h-5" />
                                        Просроченные заказы
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-center py-4">
                                        <div className="text-3xl font-bold mb-2">0</div>
                                        <div className="text-sm text-gray-500 mb-4">Заказов</div>
                                        <div className="text-3xl font-bold">0</div>
                                        <div className="text-sm text-gray-500">сом</div>
                                    </div>
                                    <table className="w-full mt-4">
                                        <thead className="border-b">
                                            <tr className="text-sm text-gray-600">
                                                <th className="text-left py-2">Контрагент</th>
                                                <th className="text-right py-2">Заказ</th>
                                                <th className="text-right py-2">Сумма</th>
                                                <th className="text-right py-2">Срок</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td  className="text-center py-8 text-gray-400">
                                                    Нет данных
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-red-600">
                                        <Info className="w-5 h-5" />
                                        Просроченные счета
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-center py-4">
                                        <div className="text-3xl font-bold mb-2">0</div>
                                        <div className="text-sm text-gray-500 mb-4">Счетов</div>
                                        <div className="text-3xl font-bold">0</div>
                                        <div className="text-sm text-gray-500">сом</div>
                                    </div>
                                    <table className="w-full mt-4">
                                        <thead className="border-b">
                                            <tr className="text-sm text-gray-600">
                                                <th className="text-left py-2">Контрагент</th>
                                                <th className="text-right py-2">Счет</th>
                                                <th className="text-right py-2">Сумма</th>
                                                <th className="text-right py-2">Срок</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td  className="text-center py-8 text-gray-400">
                                                    Нет данных
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Money Section */}
                        <div className="mb-8">
                            <h2 className="text-xl font-bold text-red-600 mb-4">Деньги</h2>
                            
                            <Card>
                                <CardContent className="pt-6">
                                    <div className="text-center mb-6">
                                        <div className="text-3xl font-bold">0</div>
                                        <div className="text-sm text-gray-500">сом</div>
                                    </div>

                                    <table className="w-full">
                                        <thead className="border-b">
                                            <tr className="text-sm text-gray-600">
                                                <th className="text-left py-3">Юр. лицо</th>
                                                <th className="text-right py-3">Остаток</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="border-b">
                                                <td className="py-3">ИП Матвеев Женишбек Камилович</td>
                                                <td className="text-right py-3">0</td>
                                            </tr>
                                        </tbody>
                                    </table>

                                    <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
                                        <div className="flex gap-2">
                                            <Button variant="ghost" size="icon" className="h-6 w-6">
                                                <ChevronLeft className="w-4 h-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="h-6 w-6">
                                                <ChevronLeft className="w-4 h-4" />
                                            </Button>
                                        </div>
                                        <span>1-1 из 1</span>
                                        <div className="flex gap-2">
                                            <Button variant="ghost" size="icon" className="h-6 w-6">
                                                <ChevronRight className="w-4 h-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="h-6 w-6">
                                                <ChevronRight className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Money Chart */}
                            <Card className="mt-6">
                                <CardContent className="pt-6">
                                    <ResponsiveContainer width="100%" height={300}>
                                        <LineChart data={salesData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="month" />
                                            <YAxis />
                                            <Tooltip />
                                            <Legend />
                                            <Line type="monotone" dataKey="приход" stroke="#82ca9d" name="Приход" />
                                            <Line type="monotone" dataKey="расход" stroke="#ff6b6b" name="Расход" />
                                            <Line type="monotone" dataKey="остаток" stroke="#3b82f6" name="Остаток" />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const SidebarItem = ({ icon, label, active }: any) => {
    return (
        <div className={`flex items-center gap-3 px-6 py-3 cursor-pointer transition-colors ${
            active 
                ? 'bg-blue-800 border-r-4 border-blue-400' 
                : 'hover:bg-blue-800/50'
        }`}>
            {icon}
            <span className="text-sm font-medium">{label}</span>
        </div>
    )
}

export default MainPage