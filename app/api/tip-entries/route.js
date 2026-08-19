import { supabaseAdmin as supabase } from '@/lib/supabase-admin'
import { verifyToken } from '@/lib/jwt'
import { cookies } from 'next/headers'

export async function GET(request) {
  // 1. Get start/end date range from the query string
  const { searchParams } = new URL(request.url)
  const start = searchParams.get('start')
  const end = searchParams.get('end')

  if (!start || !end) {
    return Response.json({ error: 'Missing start or end date' }, { status: 400 })
  }

  // 2. Get the token from the cookie
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value

  if (!token) {
    return Response.json({ error: 'Not authenticated' }, { status: 401 })
  }

  // 3. Verify the token
  const payload = await verifyToken(token)

  if (!payload) {
    return Response.json({ error: 'Invalid or expired token' }, { status: 401 })
  }

  // 4. Query tip_entries for this user, in the date range
  const { data, error } = await supabase
    .from('tip_entries')
    .select('entry_date, hours_worked, total_tips')
    .eq('user_id', payload.id)
    .gte('entry_date', start)
    .lte('entry_date', end)

  if (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }

  return Response.json({ data })
}