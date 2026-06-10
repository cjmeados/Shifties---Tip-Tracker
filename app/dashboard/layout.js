import { cookies } from 'next/headers'
import { verifyToken } from '@/lib/jwt'

export default async function DashboardLayout({ children }) {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')
  const user = token ? await verifyToken(token.value) : null

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Nav */}
      <nav className="h-16 bg-white border-b flex items-center justify-between px-6">
        <span className="font-bold text-lg">Shifties</span>
        <div className="flex items-center gap-4">
          <span className="text-gray-600">{user?.name}</span>
          <a href="/api/auth/logout" className="text-sm text-red-500">Logout</a>
        </div>
      </nav>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-56 bg-white border-r flex flex-col gap-1 p-4">
          <a href="/dashboard" className="px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-700">📅 Calendar</a>
          <a href="/dashboard/history" className="px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-700">🕓 History</a>
          <a href="/dashboard/analytics" className="px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-700">📊 Analytics</a>
          <a href="/dashboard/settings" className="px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-700">⚙️ Settings</a>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  )
}