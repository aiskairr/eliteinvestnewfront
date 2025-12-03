"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Eye, EyeOff, Loader2 } from 'lucide-react'

const LoginPage = () => {
    const router = useRouter()
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [rememberMe, setRememberMe] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const [loginPlaceholder, setLoginPlaceholder] = useState('Введите логин')
    const [passwordPlaceholder, setPasswordPlaceholder] = useState('Введите пароль')
    const [showForgotPassword, setShowForgotPassword] = useState(false)
    const [phoneNumber, setPhoneNumber] = useState('+996 ')
    const [isAnimating, setIsAnimating] = useState(false)

    // Проверка заполненности полей
    const isFormValid = login.trim() !== '' && password.trim() !== ''

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError('')
        const validLogin = 'aminhan'
        const validPassword = '123456'

        setTimeout(() => {
            if (login.trim() === validLogin && password === validPassword) {
                router.push('/main')
            } else {
                setLoginPlaceholder(login)
                setPasswordPlaceholder(password)
                setLogin('')
                setPassword('')
                setError('Неверный логин или пароль')
            }
            setIsLoading(false)
        }, 800)
    }

    // Очистка ошибки и placeholder при изменении полей
    const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLogin(e.target.value)
        if (error) {
            setError('')
            // Возвращаем обычный placeholder при новом вводе
            setLoginPlaceholder('Введите логин')
            setPasswordPlaceholder('Введите пароль')
        }
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
        if (error) {
            setError('')
            // Возвращаем обычный placeholder при новом вводе
            setLoginPlaceholder('Введите логин')
            setPasswordPlaceholder('Введите пароль')
        }
    }

    // Форматирование номера телефона +996 000-000-000
    const formatPhoneNumber = (value: string) => {
        const digits = value.replace(/\D/g, '')
        if (digits.length === 0) return '+996 '
        if (digits.length <= 3) return `+${digits}`
        if (digits.length <= 6) return `+${digits.slice(0, 3)} ${digits.slice(3)}`
        if (digits.length <= 9) return `+${digits.slice(0, 3)} ${digits.slice(3, 6)}-${digits.slice(6)}`
        return `+${digits.slice(0, 3)} ${digits.slice(3, 6)}-${digits.slice(6, 9)}-${digits.slice(9, 12)}`
    }

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formatted = formatPhoneNumber(e.target.value)
        setPhoneNumber(formatted)
    }

    const handleForgotPasswordSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log('Phone number:', phoneNumber)
        // Здесь будет логика отправки запроса
        alert('Запрос отправлен! Администратор свяжется с вами.')
        setShowForgotPassword(false)
        setPhoneNumber('+996 ')
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4 overflow-hidden">
            <div className="w-[376px] relative" style={{ perspective: '1000px' }}>
                {!showForgotPassword ? (
                    /* Форма входа */
                    <div 
                        key="login-form"
                        className="bg-white rounded-2xl shadow-xl p-8 min-h-[414px]"
                        style={{
                            animation: 'slideInRight 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                            transformOrigin: 'center'
                        }}
                    >
                        <h1 className="text-2xl font-bold text-gray-900 mb-6">
                            Войти в систему
                        </h1>

                        <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Поле логина */}
                        <div className="space-y-2">
                            <Label htmlFor="login" className="text-sm font-medium text-gray-700">
                                Логин
                            </Label>
                            <Input
                                id="login"
                                type="text"
                                placeholder={loginPlaceholder}
                                value={login}
                                onChange={handleLoginChange}
                                className={`h-14 focus:ring-2 ${
                                    error 
                                        ? 'border-2 border-red-500 focus:border-red-500 focus:ring-red-200' 
                                        : 'border-gray-300 focus:border-purple-500 focus:ring-purple-500'
                                }`}
                                required
                            />
                        </div>

                        {/* Поле пароля */}
                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                                Пароль
                            </Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder={passwordPlaceholder}
                                    value={password}
                                    onChange={handlePasswordChange}
                                    className={`h-14 pr-10 focus:ring-2 ${
                                        error 
                                            ? 'border-2 border-red-500 focus:border-red-500 focus:ring-red-200' 
                                            : 'border-gray-300 focus:border-purple-500 focus:ring-purple-500'
                                    }`}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? (
                                        <EyeOff className="w-5 h-5" />
                                    ) : (
                                        <Eye className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Сообщение об ошибке */}
                        {error && (
                            <div className="text-red-500 text-sm font-medium -mt-2">
                                {error}
                            </div>
                        )}

                        {/* Запомнить меня */}
                        <div className="flex items-center space-x-2 pt-1">
                            <Checkbox 
                                id="remember" 
                                checked={rememberMe}
                                onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                                className="border-gray-400"
                            />
                            <Label 
                                htmlFor="remember" 
                                className="text-sm font-normal text-gray-700 cursor-pointer"
                            >
                                Запомнить меня
                            </Label>
                        </div>

                        {/* Кнопка входа */}
                        <Button 
                            type="submit"
                            disabled={!isFormValid || isLoading}
                            className={`w-full h-14 font-normal text-base rounded-xl transition-colors duration-200 ${
                                isFormValid 
                                    ? 'bg-[#F47243] hover:bg-[#E5643A] text-white' 
                                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            }`}
                        >
                            {isLoading && (
                                <Loader2 className="w-7 h-7 mr-1 animate-spin" />
                            )}
                            Войти
                        </Button>

                            {/* Забыли пароль */}
                            <div className="text-center pt-2">
                                <Button 
                                    type="button"
                                    variant="link" 
                                    className="text-sm text-blue-600 hover:text-blue-700 hover:underline p-0"
                                    onClick={() => setShowForgotPassword(true)}
                                >
                                    Забыли пароль?
                                </Button>
                            </div>
                        </form>
                    </div>
                ) : (
                    /* Форма восстановления пароля */
                    <div 
                        key="forgot-password-form"
                        className="bg-white rounded-2xl shadow-xl p-8 min-h-[384px]"
                        style={{
                            animation: 'slideInLeft 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                            transformOrigin: 'center'
                        }}
                    >
                        <h1 className="text-2xl font-bold text-gray-900 mb-6">
                            Забыли пароль?
                        </h1>

                        <p className="text-sm text-gray-700 leading-relaxed mb-6">
                            Введите номер телефона, если вы забыли свои данные и администратор свяжется с Вами.
                        </p>

                        <form onSubmit={handleForgotPasswordSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                                    Номер телефона
                                </Label>
                                <Input
                                    id="phone"
                                    type="tel"
                                    placeholder="+996 000-000-000"
                                    value={phoneNumber}
                                    onChange={handlePhoneChange}
                                    className="h-14 text-base border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                                    required
                                />
                            </div>

                            <Button 
                                type="submit"
                                className="w-full h-14 bg-[#F47243] hover:bg-[#E5643A] text-white font-normal text-base rounded-xl"
                            >
                                Отправить запрос
                            </Button>

                            <div className="text-center">
                                <Button 
                                    type="button"
                                    variant="link" 
                                    className="text-sm text-blue-600 hover:text-blue-700 hover:underline p-0"
                                    onClick={() => {
                                        setShowForgotPassword(false)
                                        setPhoneNumber('+996 ')
                                    }}
                                >
                                    Назад
                                </Button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    )
}

export default LoginPage
