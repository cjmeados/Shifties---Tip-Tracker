'use client' // use in browser, not just server

import { useState } from 'react' // pull named function useState from react library
                                 // gives components memory to store and update data 
export default function Signup() { // makes signup function main meat of the file and able to give to other files
  const [name, setName] = useState('') // '' is starting value, name is current typed in input setName function used to update name
  const [email, setEmail] = useState('') // behind the scenes react makes a matching updater function x -> setX
  const [password, setPassword] = useState('') // password is what react currently has and setPassword is update that now
  const [confirmPassword, setConfirmPassword] = useState('') 

async function handleSubmit(e) { // async means await will happen somewhere inside. e is event object (info about what triggered this function)
  e.preventDefault() // when form submitted browser defaults to reload or nav
                     // this prevents and no reload, instead fall down to js below
  const res = await fetch('/api/auth/signup', { // sends request to backend endpoint, sends data to server route and waits for reply, js will continue when server replies
    method: 'POST', // send data to server
    headers: { 'Content-Type': 'application/json' }, // tells server sending json
    body: JSON.stringify({ name, email, password }) // makes the payload a json text
  })

  const data = await res.json() // data is the body of the response in json

  if (!res.ok) { // res.status has status codes and res.ok is boolean and data = json body of res
    console.error(data.error) // console log error
    return // break
  }

  console.log('Account created!', data) // console log success and what backend sends back
  // redirect to login after signup
  window.location.href = '/login' // window is the browser tab environment, location is url controller object, href is full url string and we get/set to the /login
}

  return ( // when this component runs this is what should render
    <main className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Create an Account</h1>
      <div className="flex flex-col gap-4 w-80">
        <input
          type="text"
          placeholder="Name"
          value={name} // connects box to react state. text here is controlled by variable name. whatever name is, that is displayed
          onChange={(e) => setName(e.target.value)} // e is event object. any change and then setName updates value and re-renders. target is html element that triggered event. value is what user has typed so far.
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
          onClick={handleSubmit} // e becomes the click and we do the handle submit poriton
          className="bg-blue-600 text-white rounded-lg px-4 py-2"
        >
          Sign Up
        </button>
        <a href="/login" className="text-center text-blue-600">Already have an account? Login</a>
      </div>
    </main>
  )
}