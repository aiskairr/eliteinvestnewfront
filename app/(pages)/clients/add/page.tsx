'use client'

import Link from 'next/link'
import { useEffect, useMemo, useRef, useState } from 'react'
import { UploadCloud, ChevronDown, CircleDollarSign } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const segmentOptions = ['Подрядчик', 'Партнер', 'VIP', 'Дистрибьютор', 'Потенциальный']
const statusOptions = ['Активный', 'Потенциальный', 'Холодный']

interface FieldCardProps {
  label: string
  hint?: string
  children: React.ReactNode
}

function FieldCard({ label, hint, children }: FieldCardProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-xs">
      <div className="text-sm font-medium text-gray-700">{label}</div>
      {hint && <div className="text-xs text-gray-400 mt-1">{hint}</div>}
      <div className="mt-3">{children}</div>
    </div>
  )
}

export default function AddClientPage() {
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
  const [selectedSegments, setSelectedSegments] = useState<string[]>(['Подрядчик'])
  const [selectedStatus, setSelectedStatus] = useState<string>('Активный')

  useEffect(() => {
    return () => {
      if (avatarPreview) {
        URL.revokeObjectURL(avatarPreview)
      }
    }
  }, [avatarPreview])

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return
    const url = URL.createObjectURL(files[0])
    setAvatarPreview((prev) => {
      if (prev) URL.revokeObjectURL(prev)
      return url
    })
  }

  const toggleSegment = (segment: string, checked: boolean | 'indeterminate') => {
    setSelectedSegments((prev) => {
      if (checked) {
        if (prev.includes(segment)) return prev
        return [...prev, segment]
      }
      return prev.filter((item) => item !== segment)
    })
  }

  const formActions = useMemo(
    () => (
      <div className="flex flex-wrap items-center justify-end gap-3 rounded-2xl border border-gray-200 bg-white px-6 py-4 shadow-sm">
        <Button asChild variant="outline" className="px-6">
          <Link href="/clients">Отмена</Link>
        </Button>
        <Button className="px-8">Добавить</Button>
      </div>
    ),
    []
  )

  return (
    <div className="min-h-screen bg-white p-6 md:p-10">
      <div className="mx-auto w-full max-w-6xl space-y-8">
        <div>
          <div className="text-sm text-gray-500">
            <Link href="/clients" className="hover:text-gray-700">
              Клиенты
            </Link>{' '}
            / <span className="text-gray-900">Добавить клиента</span>
          </div>
          <h1 className="mt-2 text-3xl font-semibold text-gray-900">Добавить клиента</h1>
          <p className="mt-2 text-gray-500">
            Заполните основную информацию, чтобы сохранить нового клиента в CRM системе.
          </p>
        </div>

        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm md:p-10">
          <div className="flex flex-col gap-4">
            <div>
              <div className="text-lg font-semibold text-gray-900">Общая информация</div>
              <p className="text-sm text-gray-500">Укажите ключевые данные клиента и контактного лица.</p>
            </div>

            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
              <div className="grid gap-4 md:grid-cols-2">
                <FieldCard label="Название" hint="Введите название компании">
                  <Input placeholder="Введите название" className="h-12 border-gray-200 text-base" />
                </FieldCard>

                <FieldCard label="Общая сумма" hint="Введите общую сумму по сделкам">
                  <div className="flex h-12 items-center gap-3 rounded-xl border border-gray-200 px-4">
                    <CircleDollarSign className="h-5 w-5 text-gray-400" />
                    <Input
                      placeholder="Введите общую сумму"
                      className="h-full border-0 px-0 text-base focus-visible:ring-0"
                    />
                  </div>
                </FieldCard>

                <FieldCard label="Контактное лицо">
                  <Input placeholder="Введите имя" className="h-12 border-gray-200 text-base" />
                </FieldCard>

                <FieldCard label="Телефон">
                  <Input placeholder="+7 000 000 00 00" className="h-12 border-gray-200 text-base" />
                </FieldCard>

                <FieldCard label="Количество сделок">
                  <Input placeholder="Введите количество" className="h-12 border-gray-200 text-base" />
                </FieldCard>

                <FieldCard label="Теги / сегменты" hint="Выберите теги / сегменты">
                  {selectedSegments.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {selectedSegments.map((segment) => (
                        <Badge
                          key={segment}
                          className="bg-orange-50 px-3 py-1 text-orange-600 hover:bg-orange-100"
                        >
                          {segment}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <div className="text-sm text-gray-400">Теги не выбраны</div>
                  )}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="mt-3 h-11 w-full justify-between">
                        Управлять тегами
                        <ChevronDown className="h-4 w-4 text-gray-500" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                      {segmentOptions.map((segment) => (
                        <DropdownMenuCheckboxItem
                          key={segment}
                          checked={selectedSegments.includes(segment)}
                          onCheckedChange={(checked) => toggleSegment(segment, checked)}
                        >
                          {segment}
                        </DropdownMenuCheckboxItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </FieldCard>

                <FieldCard label="Статус">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="h-12 w-full justify-between px-4 text-left font-normal">
                        {selectedStatus || 'Выберите статус'}
                        <ChevronDown className="h-4 w-4 text-gray-500" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-48">
                      <DropdownMenuRadioGroup value={selectedStatus} onValueChange={setSelectedStatus}>
                        {statusOptions.map((status) => (
                          <DropdownMenuRadioItem key={status} value={status}>
                            {status}
                          </DropdownMenuRadioItem>
                        ))}
                      </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </FieldCard>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-gray-50/80 p-5 shadow-inner">
                <div className="flex items-center gap-4">
                  <Avatar className="h-14 w-14 border-2 border-white shadow">
                    {avatarPreview ? (
                      <AvatarImage src={avatarPreview} alt="Аватар клиента" />
                    ) : (
                      <AvatarFallback>НК</AvatarFallback>
                    )}
                  </Avatar>
                  <div>
                    <div className="text-base font-semibold text-gray-900">Аватарка</div>
                    <p className="text-sm text-gray-500">Перетащите или загрузите файлы .jpg .png .svg</p>
                  </div>
                </div>

                <div className="mt-5 rounded-xl border border-dashed border-gray-300 bg-white/80 p-4 text-center">
                  <UploadCloud className="mx-auto h-8 w-8 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-500">Удерживайте и перетащите изображение</p>
                  <Button
                    variant="outline"
                    className="mt-4 w-full justify-center"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Загрузить
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png,image/jpeg,image/svg+xml"
                    className="sr-only"
                    onChange={(event) => handleFiles(event.target.files)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm md:p-10">
          <div>
            <div className="text-lg font-semibold text-gray-900">Заметки</div>
            <p className="text-sm text-gray-500">Сообщите важные детали, которые стоит помнить команде.</p>
          </div>
          <Textarea className="mt-4 min-h-[160px] border-gray-200 text-base" placeholder="Добавьте заметку" />
        </div>

        {formActions}
      </div>
    </div>
  )
}
