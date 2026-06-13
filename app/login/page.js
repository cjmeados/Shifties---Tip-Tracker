'use client' // establishes that the user's browser is needed for this to operate

import { useState } from 'react' // allows the useState hook from react library to be used in this file

export default function Login() { // export allows other files to use this, default means this is the main meat of the file, and the function login is the componoent for the log in UI
  const [email, setEmail] = useState('') // email is the React state of what email holds, setEmail is a function to update email, and useState initializes a blank value
  const [password, setPassword] = useState('') // react stores a '' as a password and setPassword is called with whatever is typed later

    async function handleSubmit(e) { // async says pause here and wait for a reply before continuing. user calls event, this waits and then executes
        e.preventDefault() // prevents browser from refreshing/navigating 

        const res = await fetch('/api/auth/login', { // fetch is a network function, and we await the api/auth/login endpoint, what we knock on is below
            method: 'POST',  // sends the server data
            headers: { 'Content-Type': 'application/json' }, // the data I am sending is json
            body: JSON.stringify({ email, password }) // send text over the network and email: email are the same, its JS shorthand
        })

        const data = await res.json() // we have received the package and we upnack it. await says wait till its open

        if (!res.ok) { // if 400 or 500 then
            console.error(data.error) // console log also found in dev tools
            return // break .... guard clause
        }

        console.log('Logged in!', data)  // console logs in dev tools logged in and whatever data sent back
        window.location.href = '/dashboard' // window is browser context, location is where we currently are, and href is the dashboard of login 
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