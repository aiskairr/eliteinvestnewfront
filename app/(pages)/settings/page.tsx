"use client"

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Checkbox } from '@/components/ui/checkbox'
import { Check, Lock, UploadCloud } from 'lucide-react'

const tabs = ['Профиль','Компания','Пользователи и права','Кастомизация','Интеграции','Безопасность'] as const
type Tab = typeof tabs[number]

export default function SettingsPage() {
  const [active, setActive] = useState<Tab>('Профиль')

  return (
    <div className="p-6">
      <div className="text-sm text-gray-500 mb-3">Настройки</div>
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">Настройки</h2>

      <div className="flex items-center gap-6 text-sm mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className={`${active === tab ? 'text-black border-b-2 border-black' : 'text-gray-500 hover:text-black'} pb-1`}
          >
            {tab}
          </button>
        ))}
      </div>

      {active === 'Профиль' && <ProfileTab />}
      {active === 'Компания' && <CompanyTab />}
      {active === 'Пользователи и права' && <UsersTab />}
      {active === 'Кастомизация' && <CustomizationTab />}
      {active === 'Интеграции' && <IntegrationsTab />}
      {active === 'Безопасность' && <SecurityTab />}
    </div>
  )
}

function ProfileTab() {
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-0">
          <div className="h-48 w-full bg-[url('/window.svg')] bg-cover bg-center rounded-t-xl" />
          <div className="px-6 py-4 flex items-center gap-4">
            <Avatar className="w-16 h-16" />
            <div>
              <div className="font-semibold text-lg">Асанов Алмаз</div>
              <div className="text-sm text-gray-500">Главный менеджер • Бишкек • asanovA@gmail.com</div>
            </div>
            <Badge className="ml-auto bg-green-100 text-green-700">Активный</Badge>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <ProfileField label="Имя" value="Алмаз" />
          <ProfileField label="Фамилия" value="Асанов" />
          <ProfileField label="Телефон" value="+996 799 799 799" />
          <ProfileField label="Должность" value="Главный менеджер" />
          <ProfileField label="Email" value="asanovA@gmail.com" className="md:col-span-2" />
          <ProfileField label="Локация" value="Бишкек" className="md:col-span-2" />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Lock className="w-4 h-4" /> Двухфакторная аутентификация — подключите для дополнительной защиты
          </div>
          <div className="space-y-3">
            {['Email-уведомления','Push-уведомления','SMS-оповещения','Уведомления о задачах','Уведомления о новых сообщениях'].map((label) => (
              <div key={label} className="flex items-center justify-between text-sm">
                <span>{label}</span>
                <div className="flex items-center gap-4 text-gray-600">
                  <label className="flex items-center gap-2"><Checkbox defaultChecked /> Email</label>
                  <label className="flex items-center gap-2"><Checkbox /> Phone</label>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function ProfileField({ label, value, className }: { label: string; value: string; className?: string }) {
  return (
    <div className={className}>
      <div className="text-xs text-gray-500 mb-1">{label}</div>
      <Input value={value} readOnly className="bg-gray-50" />
    </div>
  )
}

function CompanyTab() {
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6 flex items-center gap-3">
          <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center">
            <UploadCloud className="w-6 h-6 text-gray-500" />
          </div>
          <div>
            <div className="font-medium">CRM Stroi</div>
            <div className="text-xs text-gray-500">Нажмите чтобы загрузить логотип (png, jpg, jpeg)</div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6 space-y-4">
          <Input placeholder="Название" defaultValue="CRM Stroi" />
          <Input placeholder="Адрес" defaultValue="ул. Токтогула, д. 12, г. Бишкек" />
          <Input placeholder="Email" defaultValue="infoCRM@gmail.com" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input placeholder="Контакты" defaultValue="+996 700 700 700" />
            <Input placeholder="Доп. контакты" defaultValue="+996 500 500 500" />
          </div>
          <Input placeholder="Ответственный" defaultValue="Марина Асанова" />
          <Input placeholder="Часовой пояс" defaultValue="GMT+6 - Азия, Бишкек" />
          <Input placeholder="Валюта" defaultValue="Кыргызский сом (KGS)" />
        </CardContent>
      </Card>
    </div>
  )
}

function UsersTab() {
  const rows = [
    { name: 'ByeWind', date: 'Jun 24, 2025', amount: '$942.00', status: 'In Progress', color: 'text-purple-600' },
    { name: 'Natali Craig', date: 'Mar 10, 2025', amount: '$881.00', status: 'Complete', color: 'text-green-600' },
    { name: 'Drew Cano', date: 'Nov 10, 2025', amount: '$409.00', status: 'Pending', color: 'text-blue-600' },
    { name: 'Orlando Diggs', date: 'Dec 20, 2025', amount: '$953.00', status: 'Approved', color: 'text-amber-600' },
    { name: 'Andi Lane', date: 'Jul 25, 2025', amount: '$907.00', status: 'Rejected', color: 'text-gray-500' },
  ]

  return (
    <Card>
      <CardContent className="p-0">
        <div className="flex items-center justify-between px-6 py-4 text-sm text-gray-600 border-b">
          <span>Список пользователей</span>
          <button className="text-orange-600">Пригласить</button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Менеджер</TableHead>
              <TableHead>Дата</TableHead>
              <TableHead>Сумма</TableHead>
              <TableHead>Статус</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell>
                  <div className="flex items-center gap-3 text-sm">
                    <Avatar className="w-7 h-7" />
                    {row.name}
                  </div>
                </TableCell>
                <TableCell className="text-sm text-gray-500">{row.date}</TableCell>
                <TableCell className="text-sm text-gray-900">{row.amount}</TableCell>
                <TableCell className={`text-sm ${row.color}`}>{row.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

function CustomizationTab() {
  const colors = ['#FF6B4A','#FFC21A','#6DB1FF','#9CCBFF','#F6BE79','#69D487']

  return (
    <div className="space-y-6">
      <div>
        <div className="text-sm font-medium mb-2">Тема</div>
        <div className="flex items-center gap-6">
          {['Системный','Светлый','Темный'].map((label) => (
            <Card key={label} className="w-28 h-16 flex items-end justify-center text-xs text-gray-600 cursor-pointer hover:bg-gray-50">{label}</Card>
          ))}
        </div>
      </div>

      <div>
        <div className="text-sm font-medium mb-2">Размер текста</div>
        <div className="flex items-center gap-4 text-sm text-gray-600">
          {[0,1,2,3].map((i) => (
            <label key={i} className="flex items-center gap-2">
              <input type="radio" name="fontSize" defaultChecked={i===1} />
              Aa
            </label>
          ))}
        </div>
      </div>

      <div>
        <div className="text-sm font-medium mb-2">Цвета</div>
        <div className="flex items-center gap-3">
          {colors.map((color, idx) => (
            <div key={color} className="w-8 h-8 rounded-md flex items-center justify-center" style={{ backgroundColor: color }}>
              {idx === 0 && <Check className="w-4 h-4 text-white" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function IntegrationsTab() {
  const items = [
    { name: 'Telegram', description: 'Дашборды и уведомления' },
    { name: 'Twitter', description: 'Новости и аналитика' },
    { name: 'Figma', description: 'Дизайн-система' },
    { name: 'Instagram', description: 'Фото и медиа' },
  ]

  return (
    <Card>
      <CardContent className="p-0 divide-y divide-gray-100">
        {items.map((item, idx) => (
          <div key={item.name} className="flex items-center justify-between px-6 py-4">
            <div>
              <div className="font-medium">{item.name}</div>
              <div className="text-sm text-gray-500">{item.description}</div>
            </div>
            <label className="flex items-center gap-3 text-sm text-gray-500">
              <span className="text-lg">•••</span>
              <input type="checkbox" defaultChecked={idx < 3} className="accent-black" />
            </label>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

function SecurityTab() {
  const signins = [
    ['USA(5)','Chrome - Windows','236.125.56.78','2 minutes ago','In Progress','text-purple-600'],
    ['United Kingdom(10)','Safari - Mac OS','236.125.56.69','10 minutes ago','Complete','text-green-600'],
    ['Norway(-)','Firefox - Windows','236.125.56.10','20 minutes ago','Pending','text-blue-600'],
    ['Japan(112)','iOS - iPhone Pro','236.125.56.54','30 minutes ago','Approved','text-amber-600'],
    ['Italy(5)','Samsung Note5 - Android','236.100.56.50','40 minutes ago','Rejected','text-gray-500'],
  ] as const

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="font-medium">Двухфакторная аутентификация</div>
            <Badge className="bg-gray-100 text-gray-600">Отключено</Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Input placeholder="Телефон" />
            <Button className="bg-orange-500 hover:bg-orange-600">Отправить код</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <div className="flex items-center justify-between px-6 py-4 text-sm text-gray-600 border-b">
            <span>История входов</span>
            <span>1 Hour</span>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Локация</TableHead>
                <TableHead>Устройство</TableHead>
                <TableHead>IP адрес</TableHead>
                <TableHead>Время</TableHead>
                <TableHead>Статус</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {signins.map(([loc, device, ip, time, status, color]) => (
                <TableRow key={loc}>
                  <TableCell className="text-sm text-gray-700">{loc}</TableCell>
                  <TableCell className="text-sm text-gray-700">{device}</TableCell>
                  <TableCell className="text-sm text-gray-700">{ip}</TableCell>
                  <TableCell className="text-sm text-gray-700">{time}</TableCell>
                  <TableCell className={`text-sm ${color}`}>{status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="font-medium mb-3">Резервное копирование</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <BackupTile title="Последняя копия" value="29.10.2025" />
            <BackupTile title="Размер" value="324 МБ" />
            <BackupTile title="Статус" value="Успешно" success />
          </div>
          <div className="flex items-center gap-2">
            <Button className="bg-orange-500 hover:bg-orange-600">Создать копию</Button>
            <Button variant="outline">Восстановить</Button>
            <Button variant="outline">Настроить авто-бэкап</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function BackupTile({ title, value, success }: { title: string; value: string; success?: boolean }) {
  return (
    <div className="rounded-xl border border-gray-200 p-4 bg-white">
      <div className="text-xs text-gray-500 mb-1">{title}</div>
      <div className={`font-medium ${success ? 'text-green-600' : 'text-gray-900'}`}>{value}</div>
    </div>
  )
}



