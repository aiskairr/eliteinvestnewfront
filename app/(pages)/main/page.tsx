import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { X, Bell, HelpCircle, User, Cloud, ShoppingCart, Package, Users, BarChart3, CreditCard, RefreshCw, Smartphone, Menu } from 'lucide-react'
import { Sidebar } from '@/components/Sidebar'


interface Helpcard {
    title?: string;
    description: string;
    buttonText?: string;
    showAvatar?: boolean;
}
interface FeatureCard {
    icon: React.ReactNode;
    iconBg: string;
    label?: string;
    title: string;
    buttonText: string;
}
interface NavItem {
    icon: React.ReactNode;
    label: string;
}
interface SidebarItem {
    icon: React.ReactNode;
    label: string;
    active?: boolean;
}


const MainPage = () => {
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
                        <h1 className="text-lg font-semibold text-gray-800">Главная страница</h1>
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
                        <a href="/main/Indicators" className="text-blue-500 border-b-2 border-blue-500 pb-2 text-sm font-medium">
                            Показатели
                        </a>
                        <a href="#" className="text-gray-600 hover:text-blue-500 pb-2 text-sm">
                            Документы
                        </a>
                        <a href="#" className="text-gray-600 hover:text-blue-500 pb-2 text-sm">
                            Корзина
                        </a>
                        <a href="#" className="text-gray-600 hover:text-blue-500 pb-2 text-sm">
                            Аудит
                        </a>
                        <a href="#" className="text-gray-600 hover:text-blue-500 pb-2 text-sm">
                            Файлы
                        </a>
                        <a href="#" className="text-gray-600 hover:text-blue-500 pb-2 text-sm">
                            Начало работы
                        </a>
                    </div>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-auto">
                    <div className="max-w-7xl mx-auto px-8 py-10">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-12">
                            <div>
                                <h1 className="text-4xl font-bold text-blue-900 mb-2">
                                    Заголовок страницы
                                </h1>
                                <p className="text-gray-600">
                                    Описание страницы
                                </p>
                            </div>
                            <div className="text-right">
                                <Button variant="outline" className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white">
                                    Действие
                                </Button>
                                <p className="text-xs text-gray-500 mt-2">
                                    Дополнительная информация
                                </p>
                            </div>
                        </div>

                        {/* Feature Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                            <FeatureCard
                                icon={<CreditCard className="w-10 h-10 text-white" />}
                                iconBg="bg-gradient-to-br from-blue-400 to-blue-600"
                                label="Категория 1"
                                title="Заголовок карточки"
                                buttonText="Кнопка действия"
                            />
                            <FeatureCard
                                icon={<RefreshCw className="w-10 h-10 text-white" />}
                                iconBg="bg-gradient-to-br from-green-400 to-green-600"
                                label="Категория 2"
                                title="Заголовок карточки"
                                buttonText="Кнопка действия"
                            />
                            <FeatureCard
                                icon={<Smartphone className="w-10 h-10 text-white" />}
                                iconBg="bg-gradient-to-br from-blue-300 to-blue-500"
                                label="Категория 3"
                                title="Заголовок карточки"
                                buttonText="Кнопка действия"
                            />
                        </div>

                        {/* Help Section */}
                        <div className="mb-12">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-blue-900">
                                    Секция помощи
                                </h2>
                                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-600">
                                    Закрыть <X className="w-4 h-4 ml-2" />
                                </Button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <HelpCard
                                    title="Опция 1"
                                    description="Описание первой опции"
                                    buttonText="Кнопка"
                                    showAvatar
                                />
                                <HelpCard
                                    title="Опция 2"
                                    description="Описание второй опции"
                                    buttonText="Кнопка"
                                />
                                <HelpCard
                                    title="Опция 3"
                                    description="Описание третьей опции"
                                    buttonText="Кнопка"
                                />
                            </div>
                        </div>

                        {/* Overview Section */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-2xl text-blue-900">
                                    Обзор возможностей
                                </CardTitle>
                                <CardDescription>
                                    Описание раздела с возможностями
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div>
                                        <h4 className="font-semibold text-blue-900 mb-2">
                                            Функция 1
                                        </h4>
                                        <p className="text-sm text-gray-600">
                                            Описание первой функции
                                        </p>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-blue-900 mb-2">
                                            Функция 2
                                        </h4>
                                        <p className="text-sm text-gray-600">
                                            Описание второй функции
                                        </p>
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

const NavItem = ({ icon, label }: NavItem) => {
    return (
        <div className="flex flex-col items-center gap-1 px-5 py-3 cursor-pointer hover:bg-blue-600 transition-colors border-r border-blue-400/30">
            {icon}
            <span className="text-xs">{label}</span>
        </div>
    )
}

const FeatureCard = ({ icon, iconBg, label, title, buttonText }: FeatureCard) => {
    return (
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="pt-6">
                <div className={`w-20 h-20 ${iconBg} rounded-xl flex items-center justify-center mb-4`}>
                    {icon}
                </div>
                <Badge variant="secondary" className="mb-3 text-xs">
                    {label}
                </Badge>
                <h3 className="font-semibold text-blue-900 mb-4 text-lg leading-tight">
                    {title}
                </h3>
                <Button variant="outline" className="w-full border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white">
                    {buttonText}
                </Button>
            </CardContent>
        </Card>
    )
}

const HelpCard = ({ title, description, buttonText, showAvatar }: Helpcard) => {
    return (
        <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
                {showAvatar && (
                    <div className="w-16 h-16 bg-blue-100 rounded-full mb-4"></div>
                )}
                <h3 className="font-semibold text-blue-900 mb-3 text-lg">
                    {title}
                </h3>
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                    {description}
                </p>
                <Button variant="outline" className="w-full border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white">
                    {buttonText}
                </Button>
            </CardContent>
        </Card>
    )
}

export default MainPage