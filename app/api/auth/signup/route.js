import { supabaseAdmin as supabase } from '@/lib/supabase-admin'
import bcrypt from 'bcrypt'

export async function POST(request) {
  const { name, email, password } = await request.json()

  // Hash the password before saving
  const hashedPassword = await bcrypt.hash(password, 10)

  // Insert user into database
  const { data, error } = await supabase
    .from('users')
    .insert([{ name, email, password: hashedPassword }])

  if (error) {
    return Response.json({ error: error.message }, { status: 400 })
  }

  return Response.json({ message: 'User created successfully' }, { status: 201 })
}