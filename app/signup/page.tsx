'use client'
import Link from 'next/link'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function SignUp() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [agreed, setAgreed] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const handleSignUp = async () => {
    setError('')
    if (!name || !email || !password || !confirm) {
      setError('Please fill in all fields.')
      return
    }
    if (password !== confirm) {
      setError('Passwords do not match.')
      return
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }
    if (!agreed) {
      setError('Please agree to the terms of service.')
      return
    }
    if (!supabase) {
      setError('Auth not configured. Check your .env.local file.')
      return
    }
    setLoading(true)
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } }
    })
    if (error) {
      setError(error.message)
    } else {
      setSuccess(true)
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

  if (success) {
    return (
      <main className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-md bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-8 text-center">
          <div className="text-5xl mb-4">📧</div>
          <h1 className="text-2xl font-bold mb-2">Check your email!</h1>
          <p className="text-gray-500 text-sm mb-6">
            We sent a confirmation link to <span className="text-blue-400">{email}</span>.
            Click it to activate your account.
          </p>
          <Link href="/login" className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold text-sm transition inline-block">
            Go to Login
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white flex flex-col items-center justify-center px-4 py-10">
      <Link href="/" className="flex items-center gap-2 mb-8">
        <span className="text-3xl">⬇️</span>
        <span className="text-2xl font-bold">UniDownloader</span>
      </Link>

      <div className="w-full max-w-md bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-8">
        <h1 className="text-2xl font-bold mb-1">Create account</h1>
        <p className="text-gray-500 text-sm mb-6">Start downloading for free</p>

        {error && (
          <div className="bg-red-950 border border-red-800 text-red-400 text-sm px-4 py-3 rounded-xl mb-4">
            ⚠️ {error}
          </div>
        )}

        <div className="flex flex-col gap-4">
          <div>
            <label className="text-gray-500 text-sm mb-1 block">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="John Doe"
              className="w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-3 rounded-xl outline-none border border-gray-300 dark:border-gray-700 focus:border-blue-500 transition text-sm"
            />
          </div>

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
              placeholder="Min 8 characters"
              className="w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-3 rounded-xl outline-none border border-gray-300 dark:border-gray-700 focus:border-blue-500 transition text-sm"
            />
          </div>

          <div>
            <label className="text-gray-500 text-sm mb-1 block">Confirm Password</label>
            <input
              type="password"
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
              placeholder="••••••••"
              onKeyDown={e => e.key === 'Enter' && handleSignUp()}
              className="w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-3 rounded-xl outline-none border border-gray-300 dark:border-gray-700 focus:border-blue-500 transition text-sm"
            />
          </div>

          <div className="bg-blue-950 border border-blue-800 rounded-xl p-3 text-xs text-blue-300">
            ✅ Free plan: 5 downloads/day • Up to 1080p • No credit card needed
          </div>

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={agreed}
              onChange={e => setAgreed(e.target.checked)}
              className="mt-0.5 accent-blue-500"
            />
            <span className="text-gray-500 text-xs">
              I agree to the{' '}
              <Link href="/trust" className="text-blue-400 hover:underline">Terms of Service</Link>
              {' '}and{' '}
              <Link href="/trust" className="text-blue-400 hover:underline">Privacy Policy</Link>.
              Downloads are for personal use only.
            </span>
          </label>

          <button
            onClick={handleSignUp}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white py-3 rounded-xl font-semibold transition text-sm"
          >
            {loading ? 'Creating account...' : 'Create Free Account'}
          </button>
        </div>

        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-gray-200 dark:bg-gray-800" />
          <span className="text-gray-400 text-xs">or sign up with</span>
          <div className="flex-1 h-px bg-gray-200 dark:bg-gray-800" />
        </div>

        <button
          onClick={handleGoogle}
          className="w-full flex items-center justify-center gap-2 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white py-3 rounded-xl text-sm transition font-medium"
        >
          🌐 Continue with Google
        </button>

        <p className="text-center text-gray-500 text-sm mt-6">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-400 hover:text-blue-300 transition">Login</Link>
        </p>
      </div>

      <p className="text-gray-400 dark:text-gray-700 text-xs mt-6">
        🔒 Secure • No spam • Cancel anytime
      </p>
    </main>
  )
}