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
    Video, 
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
            clientName: 'Алексей Иванов',
            clientAvatar: 'AI',
            lastMessage: 'Спасибо за информацию!',
            timestamp: '10:30',
            unread: 2,
            messenger: 'whatsapp',
            online: true,
            messages: [
                { id: '1', text: 'Здравствуйте! Интересует ваш продукт', sender: 'client', timestamp: '10:15', status: 'read' },
                { id: '2', text: 'Добрый день! Конечно, расскажу подробнее', sender: 'user', timestamp: '10:16', status: 'read' },
                { id: '3', text: 'Какова стоимость?', sender: 'client', timestamp: '10:28', status: 'read' },
                { id: '4', text: 'Цена начинается от 5000 руб', sender: 'user', timestamp: '10:29', status: 'delivered' },
                { id: '5', text: 'Спасибо за информацию!', sender: 'client', timestamp: '10:30', status: 'sent' }
            ]
        },
        {
            id: '2',
            clientName: 'Мария Петрова',
            clientAvatar: 'МП',
            lastMessage: 'Когда можем встретиться?',
            timestamp: '09:45',
            unread: 0,
            messenger: 'telegram',
            online: false,
            messages: [
                { id: '1', text: 'Добрый день!', sender: 'client', timestamp: '09:40', status: 'read' },
                { id: '2', text: 'Здравствуйте!', sender: 'user', timestamp: '09:41', status: 'read' },
                { id: '3', text: 'Когда можем встретиться?', sender: 'client', timestamp: '09:45', status: 'read' }
            ]
        },
        {
            id: '3',
            clientName: 'Дмитрий Соколов',
            clientAvatar: 'ДС',
            lastMessage: 'Отправил документы',
            timestamp: 'Вчера',
            unread: 1,
            messenger: 'viber',
            online: false,
            messages: [
                { id: '1', text: 'Отправил документы', sender: 'client', timestamp: 'Вчера 18:20', status: 'sent' }
            ]
        },
        {
            id: '4',
            clientName: 'Анна Смирнова',
            clientAvatar: 'АС',
            lastMessage: 'Все понятно, спасибо!',
            timestamp: '2 дня назад',
            unread: 0,
            messenger: 'instagram',
            online: true,
            messages: [
                { id: '1', text: 'Все понятно, спасибо!', sender: 'client', timestamp: '2 дня назад', status: 'read' }
            ]
        }
    ])

    const [clientCards] = useState<ClientCard[]>([
        {
            id: '1',
            name: 'Алексей Иванов',
            email: 'alexey.ivanov@email.com',
            phone: '+7 (999) 123-45-67',
            address: 'Москва, ул. Ленина, 10',
            company: 'ООО "Техно"',
            position: 'Директор',
            notes: 'Постоянный клиент, заинтересован в новых продуктах',
            lastContact: '2024-10-02',
            tags: ['VIP', 'Постоянный клиент']
        },
        {
            id: '2',
            name: 'Мария Петрова',
            email: 'maria.petrova@email.com',
            phone: '+7 (999) 234-56-78',
            address: 'Санкт-Петербург, Невский пр., 20',
            company: 'ИП Петрова',
            position: 'ИП',
            notes: 'Новый клиент, рассматривает сотрудничество',
            lastContact: '2024-10-02',
            tags: ['Новый клиент', 'Потенциал']
        },
        {
            id: '3',
            name: 'Дмитрий Соколов',
            email: 'dmitry.sokolov@email.com',
            phone: '+7 (999) 345-67-89',
            address: 'Екатеринбург, ул. Мира, 5',
            company: 'АО "Строй+"',
            position: 'Закупщик',
            notes: 'Работает с нами 2 года',
            lastContact: '2024-10-01',
            tags: ['Постоянный клиент']
        },
        {
            id: '4',
            name: 'Анна Смирнова',
            email: 'anna.smirnova@email.com',
            phone: '+7 (999) 456-78-90',
            address: 'Казань, ул. Баумана, 15',
            company: 'ООО "Дизайн Студия"',
            position: 'Владелец',
            notes: 'Требует особого внимания к деталям',
            lastContact: '2024-09-30',
            tags: ['VIP', 'Дизайн']
        }
    ])

    const [selectedChat, setSelectedChat] = useState<Chat | null>(chats[0])
    const [searchQuery, setSearchQuery] = useState<string>('')
    const [messageInput, setMessageInput] = useState<string>('')
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

    const getMessengerIcon = (messenger: Chat['messenger']): any => {
        return <MessageCircle className="h-4 w-4 text-white" />
    }

    const getMessageStatus = (status: Message['status']): any => {
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

    const filteredChats = chats.filter(chat => 
        chat.clientName.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div className="min-h-screen bg-gray-50 p-4">
            <div className="max-w-7xl mx-auto">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-black">Чаты</h1>
                    <p className="text-gray-600 mt-2">Общение с клиентами через мессенджеры</p>
                </div>

                <div className="grid grid-cols-12 gap-4 h-[calc(100vh-180px)]">
                    {/* Список чатов */}
                    <Card className="col-span-4 border-2 border-gray-200 flex flex-col">
                        <CardHeader className="border-b border-gray-200">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input
                                    placeholder="Поиск по чатам..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                        </CardHeader>

                        <CardContent className="p-0 overflow-y-auto flex-1">
                            {filteredChats.map(chat => (
                                <div
                                    key={chat.id}
                                    onClick={() => setSelectedChat(chat)}
                                    className={`p-4 cursor-pointer hover:bg-gray-50 border-b border-gray-100 transition-colors ${
                                        selectedChat?.id === chat.id ? 'bg-blue-50' : ''
                                    }`}
                                >
                                    <div className="flex items-start gap-3">
                                        <div className="relative">
                                            <Avatar className="h-12 w-12 bg-gray-300 flex items-center justify-center text-sm font-semibold">
                                                {chat.clientAvatar}
                                            </Avatar>
                                            <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                                                chat.online ? 'bg-green-500' : 'bg-gray-400'
                                            }`} />
                                            <div className={`absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center ${getMessengerColor(chat.messenger)}`}>
                                                {getMessengerIcon(chat.messenger)}
                                            </div>
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between mb-1">
                                                <h3 className="font-semibold text-sm truncate">{chat.clientName}</h3>
                                                <span className="text-xs text-gray-500">{chat.timestamp}</span>
                                            </div>
                                            <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                                        </div>

                                        {chat.unread > 0 && (
                                            <Badge className="bg-blue-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs p-0">
                                                {chat.unread}
                                            </Badge>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    {/* Окно чата */}
                    <Card className="col-span-8 border-2 border-gray-200 flex flex-col">
                        {selectedChat ? (
                            <>
                                {/* Хедер чата */}
                                <CardHeader className="border-b border-gray-200">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="relative">
                                                <Avatar className="h-10 w-10 bg-gray-300 flex items-center justify-center text-sm font-semibold">
                                                    {selectedChat.clientAvatar}
                                                </Avatar>
                                                <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                                                    selectedChat.online ? 'bg-green-500' : 'bg-gray-400'
                                                }`} />
                                            </div>
                                            <div>
                                                <h2 className="font-semibold">{selectedChat.clientName}</h2>
                                                <p className="text-xs text-gray-500">
                                                    {selectedChat.online ? 'В сети' : 'Не в сети'}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => openClientCard(selectedChat.id)}
                                                className="border-2 border-blue-500 text-blue-600 hover:bg-blue-50"
                                            >
                                                <User className="h-4 w-4 mr-2" />
                                                Карточка клиента
                                            </Button>
                                            <Button variant="ghost" size="sm">
                                                <Phone className="h-5 w-5" />
                                            </Button>
                                            <Button variant="ghost" size="sm">
                                                <Video className="h-5 w-5" />
                                            </Button>
                                            <Button variant="ghost" size="sm">
                                                <MoreVertical className="h-5 w-5" />
                                            </Button>
                                        </div>
                                    </div>
                                </CardHeader>

                                {/* Сообщения */}
                                <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                                    {selectedChat.messages.map(message => (
                                        <div
                                            key={message.id}
                                            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                        >
                                            <div className={`max-w-[70%] ${
                                                message.sender === 'user' 
                                                    ? 'bg-blue-500 text-white' 
                                                    : 'bg-gray-200 text-black'
                                            } rounded-lg p-3`}>
                                                <p className="text-sm">{message.text}</p>
                                                <div className="flex items-center gap-1 justify-end mt-1">
                                                    <span className={`text-xs ${
                                                        message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                                                    }`}>
                                                        {message.timestamp}
                                                    </span>
                                                    {message.sender === 'user' && getMessageStatus(message.status)}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </CardContent>

                                {/* Ввод сообщения */}
                                <div className="border-t border-gray-200 p-4">
                                    <div className="flex gap-2">
                                        <Textarea
                                            placeholder="Введите сообщение..."
                                            value={messageInput}
                                            onChange={(e) => setMessageInput(e.target.value)}
                                            onKeyPress={(e) => {
                                                if (e.key === 'Enter' && !e.shiftKey) {
                                                    e.preventDefault()
                                                    handleSendMessage()
                                                }
                                            }}
                                            rows={1}
                                            className="flex-1 resize-none"
                                        />
                                        <Button 
                                            onClick={handleSendMessage}
                                            className="bg-blue-500 hover:bg-blue-600"
                                        >
                                            <Send className="h-5 w-5" />
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
            </div>

            {/* Модальное окно карточки клиента */}
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
                            {/* Основная информация */}
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

                            {/* Контактная информация */}
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

                            {/* Компания */}
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

                            {/* Заметки */}
                            <div>
                                <h3 className="text-lg font-semibold mb-4">Заметки</h3>
                                <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
                                    {selectedClientCard.notes}
                                </p>
                            </div>

                            {/* Теги */}
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

                            {/* Последний контакт */}
                            <div>
                                <div className="flex items-center gap-3 text-sm text-gray-600">
                                    <Clock className="h-4 w-4" />
                                    <span>Последний контакт: {new Date(selectedClientCard.lastContact).toLocaleDateString('ru-RU')}</span>
                                </div>
                            </div>

                            {/* Действия */}
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