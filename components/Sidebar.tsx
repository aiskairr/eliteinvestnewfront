import React from 'react';
import { Cloud, ShoppingCart, Package, Users, BarChart3, User } from 'lucide-react';

export interface SidebarItemProps {
    icon: React.ReactNode;
    label: string;
    href?: string;
    active?: boolean;
}

export const SidebarItem = ({ icon, label, href, active }: SidebarItemProps) => (
    <div className={`flex items-center gap-3 px-6 py-3 cursor-pointer transition-colors ${
        active ? 'bg-blue-800 border-r-4 border-blue-400' : 'hover:bg-blue-800/50'
    }`}>
        {icon}
        <a href={href} className="text-sm font-medium w-full block">
            {label}
        </a>
    </div>
);

interface SidebarProps {
    activeIndex?: number;
    items?: Array<{ icon: React.ReactNode; label: string; href?: string }>;
    bottom?: React.ReactNode;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeIndex = 1, items, bottom }) => {
    const defaultItems = [
        { icon: <Cloud className="w-5 h-5" />, label: 'Показатели', href: '/main/Indicators' },
        { icon: <ShoppingCart className="w-5 h-5" />, label: 'Закупки', href: '/procurement/orders' },
        { icon: <Package className="w-5 h-5" />, label: 'Товары', href: '/main/products' },
        { icon: <Users className="w-5 h-5" />, label: 'Контрагенты', href: '/main/clients' },
        { icon: <BarChart3 className="w-5 h-5" />, label: 'Производство', href: '/main/production' },
    ];
    const sidebarItems = items || defaultItems;
    return (
        <aside className="w-64 bg-blue-900 text-white flex flex-col">
            <div className="p-6 border-b border-blue-800">
                <h2 className="text-xl font-bold">CRM System</h2>
                <p className="text-xs text-blue-300 mt-1">Procurement</p>
            </div>
            <nav className="flex-1 py-4">
                {sidebarItems.map((item, idx) => (
                    <SidebarItem key={item.label} icon={item.icon} label={item.label} href={item.href} active={activeIndex === idx} />
                ))}
            </nav>
            <div className="p-4 border-t border-blue-800">
                {bottom || (
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
                            <User className="w-5 h-5 text-gray-700" />
                        </div>
                        <div className="flex-1">
                            <div className="text-sm font-medium">Магазин К.</div>
                            <div className="text-xs text-blue-300">admin@domain</div>
                        </div>
                    </div>
                )}
            </div>
        </aside>
    );
}
