import { Sidebar } from '@/components/Sidebar'
import { TopBar } from '@/components/TopBar'

export default function PagesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 bg-[#F4F6F7] flex flex-col overflow-hidden">
        <main className="flex-1 rounded-[20px] overflow-auto m-3">
        <TopBar />

          {children}
        </main>
      </div>
    </div>
  )
}
