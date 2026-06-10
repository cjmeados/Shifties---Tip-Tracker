import { cookies } from 'next/headers'
import { verifyToken } from '@/lib/jwt'

export default async function Dashboard() {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')
  const user = token ? await verifyToken(token.value) : null

  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold">Welcome, {user?.name ?? 'Guest'}</h1>
    </main>
  )
}