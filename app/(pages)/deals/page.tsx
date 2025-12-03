"use client"

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { DealCard } from '@/components/deals/DealCard'
import { mockDeals } from '@/data/mockDeals'
import { DealStatus, Deal } from '@/types/deal'
import { Button } from '@/components/ui/button'
import { Plus, Filter, ChevronDown } from 'lucide-react'
import { CreateDealStageDialog } from '@/components/deals/CreateDealStageDialog'

const statusMeta: Record<
    DealStatus,
    {
        title: string
        headerBg: string
        columnBg: string
        accent: string
    }
> = {
    new: {
        title: 'Новые',
        headerBg: '#4F7BFF',
        columnBg: 'bg-[#EEF2FF]',
        accent: 'text-[#4F7BFF]',
    },
    in_progress: {
        title: 'В работе',
        headerBg: '#FFC447',
        columnBg: 'bg-[#FFF7DC]',
        accent: 'text-[#F2B035]',
    },
    negotiation: {
        title: 'Согласование',
        headerBg: '#5FD49B',
        columnBg: 'bg-[#E6F9F1]',
        accent: 'text-[#34A06C]',
    },
    closed: {
        title: 'Закрыта',
        headerBg: '#B48CFF',
        columnBg: 'bg-[#F3EDFF]',
        accent: 'text-[#8A5CE5]',
    },
}

export default function DealsPage() {
    const [selectedMonth] = useState('Ноябрь, 2025')
    const [deals, setDeals] = useState<Deal[]>(mockDeals)
    const [draggedDeal, setDraggedDeal] = useState<{ deal: Deal; fromStatus: DealStatus } | null>(null)
    const [isStageDialogOpen, setIsStageDialogOpen] = useState(false)
    const router = useRouter()

    const baseDealIds = useMemo(() => new Set(mockDeals.map(deal => deal.id)), [])

    const readCustomDeals = () => {
        if (typeof window === 'undefined') return []
        try {
            const raw = window.localStorage.getItem('customDeals')
            return raw ? (JSON.parse(raw) as Deal[]) : []
        } catch (error) {
            console.error('Failed to parse custom deals', error)
            return []
        }
    }

    const persistCustomDeals = (updatedDeals: Deal[]) => {
        if (typeof window === 'undefined') return
        const customDeals = updatedDeals.filter(deal => !baseDealIds.has(deal.id))
        window.localStorage.setItem('customDeals', JSON.stringify(customDeals))
    }

    useEffect(() => {
        const storedDeals = readCustomDeals()
        if (storedDeals.length) {
            setDeals([...mockDeals, ...storedDeals])
        }
    }, [])

    // Подсчет сделок по статусам
    const dealCounts = useMemo(() => {
        return {
            new: deals.filter(d => d.status === 'new').length,
            in_progress: deals.filter(d => d.status === 'in_progress').length,
            negotiation: deals.filter(d => d.status === 'negotiation').length,
            closed: deals.filter(d => d.status === 'closed').length,
        }
    }, [deals])

    // Группировка сделок по колонкам для Kanban view
    const columns = useMemo(() => [
        {
            id: 'new',
            count: dealCounts.new,
            deals: deals.filter(d => d.status === 'new')
        },
        {
            id: 'in_progress',
            count: dealCounts.in_progress,
            deals: deals.filter(d => d.status === 'in_progress')
        },
        {
            id: 'negotiation',
            count: dealCounts.negotiation,
            deals: deals.filter(d => d.status === 'negotiation')
        },
        {
            id: 'closed',
            count: dealCounts.closed,
            deals: deals.filter(d => d.status === 'closed')
        },
    ], [deals, dealCounts])

    const handleCreateDeal = () => {
        setIsStageDialogOpen(true)
    }

    const handleStageSelect = (status: DealStatus) => {
        setIsStageDialogOpen(false)
        router.push(`/deals/create?status=${status}`)
    }

    const handleDragStart = (deal: Deal, status: DealStatus) => {
        setDraggedDeal({ deal, fromStatus: status })
    }

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
    }

    const handleDrop = (toStatus: DealStatus) => {
        if (!draggedDeal) return

        setDeals(prevDeals => {
            const updatedDeals = prevDeals.map(deal =>
                deal.id === draggedDeal.deal.id
                    ? { ...deal, status: toStatus }
                    : deal
            )
            persistCustomDeals(updatedDeals)
            return updatedDeals
        })

        setDraggedDeal(null)
    }

    return (
        <div className="min-h-screen bg-[#f6f7fb]">
            <div className="mx-auto max-w-[1440px] px-6 py-8">
                {/* Header */}
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <p className="text-sm text-gray-500">Сделки</p>
                        <h1 className="text-3xl font-semibold text-gray-900">Сделки</h1>
                    </div>

                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 shadow-sm">
                            <span>{selectedMonth}</span>
                            <ChevronDown className="h-4 w-4" />
                        </button>

                        <Button variant="outline" className="rounded-2xl border-gray-200">
                            <Filter className="mr-2 h-4 w-4" />
                            Фильтры
                        </Button>

                        <Button
                            onClick={handleCreateDeal}
                            className="rounded-2xl bg-orange-500 px-5 py-2 text-white shadow-sm hover:bg-orange-600"
                        >
                            <Plus className="mr-2 h-4 w-4" />
                            Новая сделка
                        </Button>
                    </div>
                </div>

                {/* Kanban Board */}
                <div className="mt-8 flex gap-6 overflow-x-auto pb-6">
                    {columns.map((column) => {
                        const meta = statusMeta[column.id as DealStatus]
                        return (
                            <div
                                key={column.id}
                                className="flex w-80 flex-shrink-0 flex-col gap-4"
                                onDragOver={handleDragOver}
                                onDrop={() => handleDrop(column.id as DealStatus)}
                            >
                                <div
                                    className="rounded-3xl px-4 py-3 text-white shadow-sm"
                                    style={{ backgroundColor: meta.headerBg }}
                                >
                                    <div className="flex items-center justify-between">
                                        <button className="flex items-center gap-2 text-sm font-semibold">
                                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/25 text-lg">
                                                +
                                            </span>
                                            {meta.title}
                                        </button>
                                        <span className="rounded-full bg-white/25 px-3 py-0.5 text-sm font-semibold">
                                            {column.count}
                                        </span>
                                    </div>
                                </div>

                                <div className={`space-y-4 rounded-3xl ${meta.columnBg} p-3`}>
                                    {column.deals.map((deal) => (
                                        <div
                                            key={deal.id}
                                            draggable
                                            onDragStart={() => handleDragStart(deal, column.id as DealStatus)}
                                            className="cursor-grab active:cursor-grabbing"
                                        >
                                            <DealCard deal={deal} />
                                        </div>
                                    ))}
                                    {column.deals.length === 0 && (
                                        <div className="rounded-2xl border-2 border-dashed border-white/60 bg-white/60 p-4 text-center text-sm text-gray-500">
                                            Нет сделок в этом статусе
                                        </div>
                                    )}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            <CreateDealStageDialog
                open={isStageDialogOpen}
                onClose={() => setIsStageDialogOpen(false)}
                onSelect={handleStageSelect}
            />
        </div>
    )
}
