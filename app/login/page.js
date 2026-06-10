'use client'

import { useState } from 'react'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

    async function handleSubmit(e) {
        e.preventDefault()

        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })

        const data = await res.json()

        if (!res.ok) {
            console.error(data.error)
            return
        }

        console.log('Logged in!', data)
        window.location.href = '/dashboard'
    }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Login</h1>
      <div className="flex flex-col gap-4 w-80">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border rounded-lg px-4 py-2"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border rounded-lg px-4 py-2"
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white rounded-lg px-4 py-2"
        >
          Login
        </button>
        <a href="/signup" className="text-center text-blue-600">Don't have an account? Sign up</a>
      </div>
    </main>
  )
}