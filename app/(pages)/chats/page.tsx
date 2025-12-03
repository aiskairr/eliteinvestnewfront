"use client"

import * as React from "react"
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { 
    MessageCircle, 
    Send, 
    Search, 
    Phone, 
    MoreVertical,
    X,
    User,
    Mail,
    MapPin,
    Briefcase,
    Clock,
    CheckCheck,
    Check
} from 'lucide-react'

interface Message {
    id: string
    text: string
    sender: 'user' | 'client'
    timestamp: string
    status: 'sent' | 'delivered' | 'read'
}

interface Chat {
    id: string
    clientName: string
    clientAvatar: string
    lastMessage: string
    timestamp: string
    unread: number
    messenger: 'whatsapp' | 'telegram' | 'viber' | 'instagram'
    online: boolean
    messages: Message[]
}

interface ClientCard {
    id: string
    name: string
    email: string
    phone: string
    address: string
    company: string
    position: string
    notes: string
    lastContact: string
    tags: string[]
}

const ChatsPage = () => {
    const [chats] = useState<Chat[]>([
        {
            id: '1',
            clientName: 'ByeWind',
            clientAvatar: 'BW',
            lastMessage: 'Печатает…',
            timestamp: '19:28',
            unread: 12,
            messenger: 'telegram',
            online: true,
            messages: [
                { id: 'm1', text: 'Привет, Айбек! Клиент по офису на Масалиева подтвердил смету, можно переводить в этап "Согласование".', sender: 'user', timestamp: '12:35', status: 'read' },
                { id: 'm2', text: 'Окей, и не забудь отметить тег "Срочно", они хотят начать в начале ноября.', sender: 'user', timestamp: '12:35', status: 'delivered' },
                { id: 'm3', text: 'Отлично 🙌 Я добавлю договор и поставлю дедлайн на 28 октября.', sender: 'client', timestamp: '12:36', status: 'sent' },
                { id: 'm4', text: 'Принято, сейчас сделаю.', sender: 'client', timestamp: '12:36', status: 'sent' },
            ]
        }
    ])

    const [clientCards] = useState<ClientCard[]>([
        {
            id: '1',
            name: 'ByeWind',
            email: 'hello@byewind.com',
            phone: '+996 700 700 700',
            address: 'Бишкек, ул. Масалиева, 10',
            company: 'ByeWind',
            position: 'Компания',
            notes: 'Активный диалог, запрашивали КП',
            lastContact: '2025-10-21',
            tags: ['Срочно', 'Важный']
        }
    ])

    const [selectedChat, setSelectedChat] = useState<Chat | null>(chats[0])
    const [searchQuery, setSearchQuery] = useState<string>('')
    const [messageInput, setMessageInput] = useState<string>('')
    const [activeTab, setActiveTab] = useState<'all' | 'unread' | 'important'>('all')
    const [showClientCard, setShowClientCard] = useState<boolean>(false)
    const [selectedClientCard, setSelectedClientCard] = useState<ClientCard | null>(null)

    const getMessengerColor = (messenger: Chat['messenger']): string => {
        const colors = {
            whatsapp: 'bg-green-500',
            telegram: 'bg-blue-500',
            viber: 'bg-purple-500',
            instagram: 'bg-pink-500'
        }
        return colors[messenger]
    }

    const getMessengerIcon = (): React.ReactNode => {
        return <MessageCircle className="h-4 w-4 text-white" />
    }

    const getMessageStatus = (status: Message['status']): React.ReactNode => {
        if (status === 'read') return <CheckCheck className="h-4 w-4 text-blue-500" />
        if (status === 'delivered') return <CheckCheck className="h-4 w-4 text-gray-400" />
        return <Check className="h-4 w-4 text-gray-400" />
    }

    const handleSendMessage = (): void => {
        if (!messageInput.trim() || !selectedChat) return
        const newMessage: Message = {
            id: Date.now().toString(),
            text: messageInput,
            sender: 'user',
            timestamp: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
            status: 'sent'
        }
        selectedChat.messages.push(newMessage)
        setMessageInput('')
    }

    const openClientCard = (chatId: string): void => {
        const client = clientCards.find(c => c.id === chatId)
        if (client) {
            setSelectedClientCard(client)
            setShowClientCard(true)
        }
    }

    const filteredChats = chats
        .filter(chat => chat.clientName.toLowerCase().includes(searchQuery.toLowerCase()))
        .filter(chat => {
            if (activeTab === 'unread') return chat.unread > 0
            if (activeTab === 'important') return true
            return true
        })

    return (
        <div className="p-6">
            <div className="mb-4">
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">Сообщения</h2>
                <div className="flex items-center gap-2 max-w-md">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Поиск по чатам"
                            className="pl-9"
                        />
                    </div>
                    <Button variant="outline" onClick={() => setSearchQuery('')}>
                        Сбросить
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-12 gap-4 h-[calc(100vh-220px)]">
                {/* Список чатов */}
                <div className="col-span-3 border-gray-200 flex flex-col rounded-xl overflow-hidden">
                <div className="flex items-center gap-6 text-sm">
                    <button onClick={() => setActiveTab('all')} className={`${activeTab==='all'?'text-black font-medium border-b-2 border-black':'text-gray-500'} pb-1`}>Все <span className="text-orange-500 ml-1">{chats.length}</span></button>
                    <button onClick={() => setActiveTab('unread')} className={`${activeTab==='unread'?'text-black font-medium border-b-2 border-black':'text-gray-500'} pb-1`}>Непрочитанные <span className="text-orange-500 ml-1">{chats.filter(c=>c.unread>0).length}</span></button>
                    <button onClick={() => setActiveTab('important')} className={`${activeTab==='important'?'text-black font-medium border-b-2 border-black':'text-gray-500'} pb-1`}>Важные <span className="text-orange-500 ml-1">2</span></button>
                </div>

                    <CardContent className="p-0 pt-2 overflow-y-auto flex-1 m-top-1">
                        {filteredChats.map(chat => (
                            <div
                                key={chat.id}
                                onClick={() => setSelectedChat(chat)}
                                className={`px-4 py-3 rounded-sm cursor-pointer hover:bg-gray-50 border-b border-gray-100 transition-colors ${
                                    selectedChat?.id === chat.id ? 'bg-[#0000000A]' : ''
                                }`}
                            >
                                <div className="flex items-start gap-3">
                                    <div className="relative">
                                        <Avatar className="h-9 w-9 bg-gray-300 flex items-center justify-center text-xs font-semibold">
                                            {chat.clientAvatar}
                                        </Avatar>
                                        <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                                            chat.online ? 'bg-green-500' : 'bg-gray-400'
                                        }`} />
                                        <div className={`absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center ${getMessengerColor(chat.messenger)}`}>
                                            {getMessengerIcon()}
                                        </div>
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between mb-1">
                                            <h3 className="font-medium text-[13px] truncate">{chat.clientName}</h3>
                                            <span className="text-[11px] text-gray-500">{chat.timestamp}</span>
                                        </div>
                                        <p className="text-[12px] text-gray-600 truncate">{selectedChat?.id===chat.id? 'Печатает…' : chat.lastMessage}</p>
                                    </div>

                                    {chat.unread > 0 && (
                                        <Badge className="bg-blue-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-[10px] p-0">
                                            {chat.unread}
                                        </Badge>
                                    )}
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </div>

                {/* Окно чата */}
                <Card className="col-span-9 border bg-[#FAFAFA] border-gray-200 flex flex-col rounded-xl overflow-hidden">
                    {selectedChat ? (
                        <>
                            {/* Хедер чата */}
                            <CardHeader className=" py-3">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="relative">
                                            <Avatar className="h-8 w-8 bg-gray-300 flex items-center justify-center text-xs font-semibold">
                                                {selectedChat.clientAvatar}
                                            </Avatar>
                                            <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                                                selectedChat.online ? 'bg-green-500' : 'bg-gray-400'
                                            }`} />
                                        </div>
                                        <div>
                                            <h2 className="font-medium text-sm">{selectedChat.clientName}</h2>
                                            <p className="text-[11px] text-gray-500">
                                                {selectedChat.online ? 'В сети' : 'Не в сети'}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        
                                        <Button variant="ghost" size="sm" onClick={() => openClientCard(selectedChat.id)}>
                                            <User className="h-5 w-5" />
                                        </Button>
                                        <Button variant="ghost" size="sm">
                                            <Phone className="h-5 w-5" />
                                        </Button>
                                       
                                        <Button variant="ghost" size="sm">
                                            <Search className="h-5 w-5" />
                                        </Button>
                                        <Button variant="ghost" size="sm">
                                            <MoreVertical className="h-5 w-5" />
                                        </Button>
                                    </div>
                                </div>
                                <div className="text-[12px] text-gray-500 mt-1 ml-11">{selectedChat.clientName} — Печатает…</div>
                            </CardHeader>

                            {/* Сообщения */}
                            <CardContent className="flex-1 bg-[#FAFAFA] overflow-y-auto p-6 space-y-3">
                                {selectedChat.messages.map(message => (
                                    <div
                                        key={message.id}
                                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div className={`max-w-[70%] ${message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-900'} rounded-2xl px-4 py-3`}>
                                            <p className="text-[13px] leading-relaxed">{message.text}</p>
                                            <div className="flex items-center gap-1 justify-end mt-1">
                                                <span className={`text-[11px] ${message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>{message.timestamp}</span>
                                                {message.sender === 'user' && getMessageStatus(message.status)}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>

                            {/* Ввод сообщения */}
                            <div className=" p-4">
                                <div className="flex items-center gap-3 rounded-xl border border-gray-200 px-3 py-2 bg-white">
                                    <Textarea
                                        placeholder="Сообщение"
                                        value={messageInput}
                                        onChange={(e) => setMessageInput(e.target.value)}
                                        onKeyPress={(e) => {
                                            if (e.key === 'Enter' && !e.shiftKey) {
                                                e.preventDefault()
                                                handleSendMessage()
                                            }
                                        }}
                                        rows={1}
                                        className="flex-1 resize-none border-none focus-visible:ring-0 p-0"
                                    />
                                    <Button 
                                        onClick={handleSendMessage}
                                        size="icon"
                                        className="bg-blue-500 hover:bg-blue-600 rounded-full h-9 w-9"
                                        aria-label="Отправить"
                                    >
                                        <Send className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="flex-1 flex items-center justify-center text-gray-400">
                            <div className="text-center">
                                <MessageCircle className="h-16 w-16 mx-auto mb-4" />
                                <p>Выберите чат для начала общения</p>
                            </div>
                        </div>
                    )}
                </Card>
            </div>

            {showClientCard && selectedClientCard && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <Card className="w-full max-w-2xl border-2 border-gray-300 max-h-[90vh] overflow-y-auto">
                        <CardHeader className="border-b border-gray-200 bg-gray-50">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-2xl">Карточка клиента</CardTitle>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setShowClientCard(false)}
                                >
                                    <X className="h-5 w-5" />
                                </Button>
                            </div>
                        </CardHeader>

                        <CardContent className="p-6 space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                    <User className="h-5 w-5" />
                                    Основная информация
                                </h3>
                                <div className="space-y-3">
                                    <div className="flex items-start gap-3">
                                        <Avatar className="h-16 w-16 bg-gray-300 flex items-center justify-center text-xl font-bold">
                                            {selectedClientCard.name.split(' ').map(n => n[0]).join('')}
                                        </Avatar>
                                        <div>
                                            <h4 className="font-semibold text-xl">{selectedClientCard.name}</h4>
                                            <p className="text-sm text-gray-600">{selectedClientCard.position}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold mb-4">Контакты</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <Mail className="h-5 w-5 text-gray-400" />
                                        <div>
                                            <p className="text-xs text-gray-500">Email</p>
                                            <p className="font-medium">{selectedClientCard.email}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Phone className="h-5 w-5 text-gray-400" />
                                        <div>
                                            <p className="text-xs text-gray-500">Телефон</p>
                                            <p className="font-medium">{selectedClientCard.phone}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <MapPin className="h-5 w-5 text-gray-400" />
                                        <div>
                                            <p className="text-xs text-gray-500">Адрес</p>
                                            <p className="font-medium">{selectedClientCard.address}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold mb-4">Компания</h3>
                                <div className="flex items-center gap-3">
                                    <Briefcase className="h-5 w-5 text-gray-400" />
                                    <div>
                                        <p className="text-xs text-gray-500">Организация</p>
                                        <p className="font-medium">{selectedClientCard.company}</p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold mb-4">Заметки</h3>
                                <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
                                    {selectedClientCard.notes}
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold mb-4">Теги</h3>
                                <div className="flex flex-wrap gap-2">
                                    {selectedClientCard.tags.map((tag, index) => (
                                        <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-700">
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center gap-3 text-sm text-gray-600">
                                    <Clock className="h-4 w-4" />
                                    <span>Последний контакт: {new Date(selectedClientCard.lastContact).toLocaleDateString('ru-RU')}</span>
                                </div>
                            </div>

                            <div className="flex gap-2 pt-4 border-t border-gray-200">
                                <Button className="flex-1 bg-blue-500 hover:bg-blue-600">
                                    Редактировать
                                </Button>
                                <Button variant="outline" className="flex-1">
                                    История взаимодействий
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    )
}

export default ChatsPage
