'use client'
import Link from 'next/link'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async () => {
    setError('')
    if (!email || !password) {
      setError('Please fill in all fields.')
      return
    }
    if (!supabase) {
      setError('Auth not configured. Check your .env.local file.')
      return
    }
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError(error.message)
    } else {
      router.push('/')
    }
    setLoading(false)
  }

  const handleGoogle = async () => {
    if (!supabase) return
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/` }
    })
  }

  return (
    <main className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white flex flex-col items-center justify-center px-4">
      <Link href="/" className="flex items-center gap-2 mb-8">
        <span className="text-3xl">⬇️</span>
        <span className="text-2xl font-bold">UniDownloader</span>
      </Link>

      <div className="w-full max-w-md bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-8">
        <h1 className="text-2xl font-bold mb-1">Welcome back</h1>
        <p className="text-gray-500 text-sm mb-6">Login to your account</p>

        {error && (
          <div className="bg-red-950 border border-red-800 text-red-400 text-sm px-4 py-3 rounded-xl mb-4">
            ⚠️ {error}
          </div>
        )}

        <div className="flex flex-col gap-4">
          <div>
            <label className="text-gray-500 text-sm mb-1 block">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-3 rounded-xl outline-none border border-gray-300 dark:border-gray-700 focus:border-blue-500 transition text-sm"
            />
          </div>

          <div>
            <label className="text-gray-500 text-sm mb-1 block">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
              className="w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-3 rounded-xl outline-none border border-gray-300 dark:border-gray-700 focus:border-blue-500 transition text-sm"
            />
          </div>

          <div className="flex justify-end">
            <a href="#" className="text-blue-400 text-xs hover:text-blue-300 transition">Forgot password?</a>
          </div>

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white py-3 rounded-xl font-semibold transition text-sm"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </div>

        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-gray-200 dark:bg-gray-800" />
          <span className="text-gray-400 text-xs">or continue with</span>
          <div className="flex-1 h-px bg-gray-200 dark:bg-gray-800" />
        </div>

        <button
          onClick={handleGoogle}
          className="w-full flex items-center justify-center gap-2 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white py-3 rounded-xl text-sm transition font-medium"
        >
          🌐 Continue with Google
        </button>

        <p className="text-center text-gray-500 text-sm mt-6">
          Don't have an account?{' '}
          <Link href="/signup" className="text-blue-400 hover:text-blue-300 transition">Sign up free</Link>
        </p>
      </div>

      <p className="text-gray-400 dark:text-gray-700 text-xs mt-6">
        🔒 Secure login • No spam • Cancel anytime
      </p>
    </main>
  )
}