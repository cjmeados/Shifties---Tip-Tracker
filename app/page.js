export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-4">Welcome</h1>
      <p className="text-lg mb-8">Please sign in or create an account.</p>
      <div className="flex gap-4">
        <a href="/login" className="px-6 py-2 bg-blue-600 text-white rounded-lg">Login</a>
        <a href="/signup" className="px-6 py-2 border border-blue-600 text-blue-600 rounded-lg">Sign Up</a>
      </div>
    </main>
  )
}