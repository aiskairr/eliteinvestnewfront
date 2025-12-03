export type DealStatus = 'new' | 'in_progress' | 'negotiation' | 'closed'

export type DealResult = 'won' | 'lost' | null

export interface Deal {
  id: string
  title: string
  company: string
  manager: {
    name: string
    avatar: string
  }
  status: DealStatus
  startDate: string
  endDate: string
  amount: number
  progress: number
  result: DealResult
}

export interface DealFilter {
  status: DealStatus | 'all'
}
