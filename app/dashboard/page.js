import { cookies } from 'next/headers' // cookies is a function from next.js to read incoming cookies. next/headers is a module for accessing request headers on the server. cookies also only work server side
import { verifyToken } from '@/lib/jwt' // go to root folder and from there lib folder and jwt file grab the verify token functon to verify JSON web tokens
import CalendarView from '@/app/components/CalendarView' 

export default async function Dashboard() { // this is the main thing the file exports and can use await inside it. Dashboard is the component
  const cookieStore = await cookies() // cookies() reads the cookies and returns a promise, we wait for that promise before continuing
  const token = cookieStore.get('token') // cookieStore holds all of our cookies and we store the token object into a variable called token
  const user = token ? await verifyToken(token.value) : null // does a cookie named token exist at all, if so await the promies from verify token

  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold">Welcome, {user?.name ?? 'Guest'}</h1> 
      <CalendarView />
    </main> // try to access user.name but if it is null then throw 'Guest'
  )
}