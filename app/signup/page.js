'use client'

import { useState } from 'react'

export default function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

async function handleSubmit(e) {
  e.preventDefault()

  const res = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password })
  })

  const data = await res.json()

  if (!res.ok) {
    console.error(data.error)
    return
  }

  console.log('Account created!', data)
  // redirect to login after signup
  window.location.href = '/login'
}

  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Create an Account</h1>
      <div className="flex flex-col gap-4 w-80">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border rounded-lg px-4 py-2"
        />
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
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="border rounded-lg px-4 py-2"
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white rounded-lg px-4 py-2"
        >
          Sign Up
        </button>
        <a href="/login" className="text-center text-blue-600">Already have an account? Login</a>
      </div>
    </main>
  )
}