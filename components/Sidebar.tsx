'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, type ReactNode } from 'react'
import { 
    Home, 
    CheckSquare, 
    Briefcase, 
    Users, 
    MessageSquare, 
    DollarSign, 
    Calendar, 
    Package, 
    Settings,
    LogOut,
    ChevronLeft
} from 'lucide-react'

interface SidebarItemProps {
    icon: ReactNode
    label: string
    href: string
    active?: boolean
    collapsed: boolean
}

const SidebarItem = ({ icon, label, href, active, collapsed }: SidebarItemProps) => (
    <Link 
        href={href}
        aria-label={label}
        className={`relative group flex items-center gap-3 px-4 py-3 rounded-lg mx-2 transition-colors ${
            collapsed ? 'justify-center' : ''
        } ${
            active 
                ? 'bg-white shadow-sm text-orange-600' 
                : 'text-gray-700 hover:bg-gray-100'
        }`}
    >
        <div className="w-5 h-5 flex items-center justify-center">{icon}</div>
        <span
            className={`text-sm font-medium transition-all duration-200 ${
                collapsed 
                    ? 'opacity-0 translate-x-2 pointer-events-none absolute' 
                    : 'opacity-100 translate-x-0'
            }`}
        >
            {label}
        </span>
        {collapsed && (
            <span className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-2 py-1 rounded bg-gray-900 text-white text-xs whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto shadow-lg">
                {label}
            </span>
        )}
    </Link>
)

interface SidebarProps {
    activeIndex?: number
}

export const Sidebar = ({ activeIndex }: SidebarProps) => {
    const pathname = usePathname()
    const [isCollapsed, setIsCollapsed] = useState(false)
    
    const menuItems = [
        { icon: <Home />, label: 'Главная', href: '/main' },
        { icon: <CheckSquare />, label: 'Задачи', href: '/tasks' },
        { icon: <Briefcase />, label: 'Сделки', href: '/deals' },
        { icon: <Users />, label: 'Клиенты', href: '/clients' },
        { icon: <MessageSquare />, label: 'Чат', href: '/chats' },
        { icon: <DollarSign />, label: 'Финансы', href: '/finances' },
        { icon: <Calendar />, label: 'Календарь', href: '/calendar' },
        { icon: <Package />, label: 'Склад', href: '/warehouse' },
        { icon: <Settings />, label: 'Настройки', href: '/settings' },
    ]

    return (
        <aside className={`${isCollapsed ? 'w-20' : 'w-64'} bg-[#F4F6F7]   flex flex-col h-screen sticky top-0 transition-all duration-300`}>
            {/* Logo */}
            <div className={`p-6 flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'}`}>
                <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-lg">L</span>
                </div>
                {!isCollapsed && (
                    <span className="font-bold text-lg text-gray-900">Logoipsum</span>
                )}
                <button 
                    className={`ml-auto text-gray-400 hover:text-gray-600 transition-transform ${isCollapsed ? 'rotate-180' : ''}`} 
                    onClick={() => setIsCollapsed((prev) => !prev)}
                    type="button"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-4 overflow-y-auto">
                {menuItems.map((item, idx) => {
                    const isActive = typeof activeIndex === 'number'
                        ? activeIndex === idx
                        : pathname?.startsWith(item.href)

                    return (
                    <SidebarItem
                        key={item.href}
                        icon={item.icon}
                        label={item.label}
                        href={item.href}
                        collapsed={isCollapsed}
                        active={isActive}
                    />
                    )
                })}
            </nav>

            {/* Logout */}
            <div className="p-4 border-t border-gray-200">
                <button className={`relative group flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors w-full ${isCollapsed ? 'justify-center' : ''}`}>
                    <LogOut className="w-5 h-5" />
                    {!isCollapsed && (
                        <span className="text-sm font-medium">Выйти с аккаунта</span>
                    )}
                    {isCollapsed && (
                        <span className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-2 py-1 rounded bg-gray-900 text-white text-xs whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto shadow-lg">
                            Выйти с аккаунта
                        </span>
                    )}
                </button>
            </div>
        </aside>
    )
}
