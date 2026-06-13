import { cookies } from 'next/headers' // cookies is a function from next.js to read incoming cookies. next/headers is a module for accessing request headers on the server. cookies also only work server side
import { verifyToken } from '@/lib/jwt' // go to root folder and from there lib folder and jwt file grab the verify token functon to verify JSON web tokens

export default async function Dashboard() { // this is the main thing the file exports and can use await inside it. Dashboard is the component
  const cookieStore = await cookies() // cookies() reads the cookies and we store it and await the promise (maybe incorrect?)
  const token = cookieStore.get('token')
  const user = token ? await verifyToken(token.value) : null

  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold">Welcome, {user?.name ?? 'Guest'}</h1>
    </main>
  )
}