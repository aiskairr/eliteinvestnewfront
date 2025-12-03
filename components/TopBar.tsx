'use client'

import { useEffect, useRef, useState } from 'react'
import { Search, Bell, ChevronDown } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const notifications = [
  {
    id: 1,
    title: 'You fixed a bug.',
    time: 'Just now',
    icon: '🐞',
  },
  {
    id: 2,
    title: 'New user registered.',
    time: '59 minutes ago',
    icon: '👤',
  },
  {
    id: 3,
    title: 'You fixed a bug.',
    time: '12 hours ago',
    icon: '🐞',
  },
  {
    id: 4,
    title: 'Andi Lane subscribed.',
    time: 'Today, 11:59 AM',
    icon: '💌',
  },
]

export function TopBar() {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const popoverRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        setIsNotificationsOpen(false)
      }
    }

    if (isNotificationsOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isNotificationsOpen])

  return (
    <div className="bg-white px-8 py-4 sticky top-0 z-20">
      <div className="flex items-center justify-between">
        {/* Search */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Поиск"
              className="pl-10 h-10 bg-gray-50 border-gray-200"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="relative flex items-center gap-4" ref={popoverRef}>
          {/* Notifications */}
          <button
            className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={() => setIsNotificationsOpen((prev) => !prev)}
          >
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {isNotificationsOpen && (
            <div className="absolute right-0 top-12 w-72 rounded-3xl border border-gray-100 bg-white p-4 shadow-2xl">
              <h3 className="text-lg font-semibold text-gray-900">Уведомления</h3>
              <div className="mt-3 space-y-3">
                {notifications.map((notification, index) => (
                  <div
                    key={notification.id}
                    className={`flex items-start gap-3 rounded-2xl px-3 py-2 ${
                      index === 1 ? 'bg-gray-50' : ''
                    }`}
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gray-100 text-lg">
                      {notification.icon}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {notification.title}
                      </p>
                      <p className="text-xs text-gray-500">{notification.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* User Profile */}
          <button className="flex items-center gap-3 hover:bg-gray-50 rounded-lg px-3 py-2 transition-colors">
            <Avatar className="w-8 h-8">
              <AvatarImage src="/avatars/user.jpg" />
              <AvatarFallback>АА</AvatarFallback>
            </Avatar>
            <div className="text-left">
              <div className="text-sm font-medium text-gray-900">Асанов А.</div>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>
    </div>
  )
}
