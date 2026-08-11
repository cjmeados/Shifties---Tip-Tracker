import { supabaseAdmin as supabase } from '@/lib/supabase-admin'
import bcrypt from 'bcrypt'
import { signToken } from '@/lib/jwt'
import { cookies } from 'next/headers'

export async function POST(request) {
  const { email, password } = await request.json()

  const { data: user, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single()

  if (error || !user) {
    return Response.json({ error: 'Invalid email or password' }, { status: 401 })
  }

  const passwordMatch = await bcrypt.compare(password, user.password)

  if (!passwordMatch) {
    return Response.json({ error: 'Invalid email or password' }, { status: 401 })
  }

  const token = await signToken({ id: user.id, name: user.name, email: user.email })

  const cookieStore = await cookies()
  cookieStore.set('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  })

  return Response.json({ message: 'Login successful' }, { status: 200 })
}
