'use client'
import Link from 'next/link'
import { useState } from 'react'

type VideoInfo = {
  title: string
  platform: string
  thumbnail: string
  duration: string
  uploader: string
  qualities?: string[]
}

function isValidUrl(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

const platformColors: Record<string, string> = {
  Youtube: 'bg-red-600',
  YouTube: 'bg-red-600',
  Twitter: 'bg-gray-700',
  Instagram: 'bg-pink-600',
  TikTok: 'bg-gray-900',
  Facebook: 'bg-blue-700',
  Vimeo: 'bg-cyan-600',
  Reddit: 'bg-orange-600',
}

export default function Home() {
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('dark')
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null)
  const [selectedQuality, setSelectedQuality] = useState('1080p')
  const [downloading, setDownloading] = useState(false)
  const [thumbnailDownloading, setThumbnailDownloading] = useState(false)

  const applyTheme = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    const isDark =
      newTheme === 'dark' ||
      (newTheme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)
    document.documentElement.classList.toggle('dark', isDark)
  }

  const handleAnalyze = async () => {
    setError('')
    setVideoInfo(null)
    if (!url.trim()) { setError('Please paste a video URL first.'); return }
    if (!isValidUrl(url)) { setError("That doesn't look like a valid URL."); return }
    setLoading(true)
    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Something went wrong.')
      } else {
        setVideoInfo({
          title: data.title,
          platform: data.platform,
          thumbnail: data.thumbnail,
          duration: data.duration,
          uploader: data.uploader,
          qualities: data.qualities,
        })
        if (data.qualities?.length) setSelectedQuality(data.qualities[0])
      }
    } catch {
      setError('Network error. Make sure the server is running.')
    }
    setLoading(false)
  }

  const handleDownload = async () => {
    if (!videoInfo) return
    setDownloading(true)
    setError('')
    try {
      const res = await fetch('/api/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, quality: selectedQuality }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Download failed.')
      } else {
        alert(`✅ ${data.message}`)
      }
    } catch {
      setError('Download failed. Try again.')
    }
    setDownloading(false)
  }

  const handleThumbnailDownload = async () => {
    if (!videoInfo) return
    setThumbnailDownloading(true)
    setError('')
    try {
      const res = await fetch('/api/thumbnail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          thumbnailUrl: videoInfo.thumbnail,
          title: videoInfo.title,
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Thumbnail download failed.')
      } else {
        alert(data.message)
      }
    } catch {
      setError('Thumbnail download failed. Try again.')
    }
    setThumbnailDownloading(false)
  }

  const platforms = [
    { name: 'YouTube', color: 'bg-red-600' },
    { name: 'Twitter/X', color: 'bg-gray-700' },
    { name: 'Instagram', color: 'bg-pink-600' },
    { name: 'TikTok', color: 'bg-gray-800 border border-gray-600' },
    { name: 'Facebook', color: 'bg-blue-700' },
    { name: 'Vimeo', color: 'bg-cyan-600' },
    { name: 'Reddit', color: 'bg-orange-600' },
    { name: '1000+ more', color: 'bg-purple-700' },
  ]

  const features = [
    { icon: '⚡', title: 'Lightning Fast', desc: 'Download in seconds with our optimized engine' },
    { icon: '🎯', title: 'Highest Quality', desc: 'Up to 4K, HDR, and lossless audio' },
    { icon: '🔒', title: 'Secure & Private', desc: 'Every file scanned, no logs kept' },
    { icon: '✂️', title: 'Media Enhancement', desc: 'Trim, compress, convert before downloading' },
    { icon: '📋', title: 'Batch Downloads', desc: 'Paste multiple links or entire playlists' },
    { icon: '♿', title: 'Accessible', desc: 'Auto-captions, high contrast, screen reader support' },
  ]

  return (
    <main className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white">

      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
        <div className="flex items-center gap-2">
          <span className="text-2xl">⬇️</span>
          <span className="text-xl font-bold text-gray-900 dark:text-white">UniDownloader</span>
        </div>
       <div className="hidden md:flex gap-6 text-gray-500 dark:text-gray-400 text-sm">
          <a href="#features" className="hover:text-gray-900 dark:hover:text-white transition">Features</a>
          <Link href="/pricing" className="hover:text-gray-900 dark:hover:text-white transition">Pricing</Link>
          <Link href="/trust" className="hover:text-gray-900 dark:hover:text-white transition">Trust & Safety</Link>
          <Link href="/settings" className="hover:text-gray-900 dark:hover:text-white transition">Settings</Link>
        </div>
        <div className="flex items-center gap-3">

          {/* Theme Toggle */}
          <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-1 text-xs gap-1">
            <button
              onClick={() => applyTheme('light')}
              className={`px-2 py-1 rounded-md transition ${
                theme === 'light'
                  ? 'bg-white shadow text-gray-900'
                  : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
              }`}
            >☀️</button>
            <button
              onClick={() => applyTheme('system')}
              className={`px-2 py-1 rounded-md transition ${
                theme === 'system'
                  ? 'bg-white dark:bg-gray-600 shadow text-gray-900 dark:text-white'
                  : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
              }`}
            >💻</button>
            <button
              onClick={() => applyTheme('dark')}
              className={`px-2 py-1 rounded-md transition ${
                theme === 'dark'
                  ? 'dark:bg-gray-600 shadow dark:text-white'
                  : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
              }`}
            >🌙</button>
          </div>

          <Link href="/login" className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm transition">
            Login
          </Link>
          <Link href="/signup" className="bg-blue-600 hover:bg-blue-500 text-white text-sm px-4 py-2 rounded-lg transition">
            Sign Up Free
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex flex-col items-center justify-center px-4 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 bg-blue-950 border border-blue-800 text-blue-400 text-sm px-4 py-1.5 rounded-full mb-6">
          <span>✨</span>
          <span>Supports 1000+ platforms</span>
        </div>

        <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">
          Download Any Video
          <br />
          <span className="text-blue-400">In Any Quality</span>
        </h1>

        <p className="text-gray-500 dark:text-gray-400 text-lg mb-10 max-w-xl">
          Paste a URL from YouTube, Instagram, TikTok, Twitter and 1000+ more.
          Get the highest quality download instantly.
        </p>

        {/* URL Input Box */}
        <div className="w-full max-w-2xl bg-gray-100 dark:bg-gray-900 rounded-2xl p-3 shadow-2xl border border-gray-200 dark:border-gray-800">
          <div className="flex gap-3">
            <input
              type="text"
              value={url}
              onChange={(e) => { setUrl(e.target.value); setError('') }}
              onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
              placeholder="Paste video URL here... (e.g. https://youtube.com/watch?v=...)"
              className="flex-1 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-3.5 rounded-xl outline-none border border-gray-300 dark:border-gray-700 focus:border-blue-500 transition text-sm"
            />
            <button
              onClick={handleAnalyze}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white px-8 py-3.5 rounded-xl font-semibold transition text-sm whitespace-nowrap"
            >
              {loading ? 'Analyzing...' : 'Analyze URL'}
            </button>
          </div>
          <p className="text-gray-400 dark:text-gray-600 text-xs mt-2 px-1">
            Supports MP4, MP3, WAV, WebM and more • Free: 5 downloads/day
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mt-4 bg-red-950 border border-red-800 text-red-400 text-sm px-4 py-3 rounded-xl max-w-2xl w-full text-left">
            ⚠️ {error}
          </div>
        )}

        {/* Loading Spinner */}
        {loading && (
          <div className="mt-6 flex items-center gap-3 text-gray-400 text-sm">
            <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            Detecting platform and fetching video info...
          </div>
        )}

        {/* Video Info Card */}
        {videoInfo && (
          <div className="mt-6 w-full max-w-2xl bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 text-left">
            <div className="flex gap-4">
              <img
                src={videoInfo.thumbnail}
                alt="thumbnail"
                className="w-40 h-24 object-cover rounded-xl flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <span className={`text-xs text-white px-2 py-0.5 rounded-full ${platformColors[videoInfo.platform] || 'bg-gray-600'}`}>
                  {videoInfo.platform}
                </span>
                <h3 className="text-gray-900 dark:text-white font-semibold mt-2 text-sm leading-snug">
                  {videoInfo.title}
                </h3>
                <p className="text-gray-500 text-xs mt-1">
                  {videoInfo.uploader} • {videoInfo.duration}
                </p>
              </div>
            </div>

            {/* Quality Selector */}
            <div className="mt-4">
              <p className="text-gray-500 dark:text-gray-400 text-xs mb-2">Select Quality:</p>
              <div className="flex flex-wrap gap-2">
                {(videoInfo.qualities || ['1080p', '720p', '360p', 'Audio Only']).map((q) => (
                  <button
                    key={q}
                    onClick={() => setSelectedQuality(q)}
                    className={`text-xs px-4 py-2 rounded-lg border transition font-medium ${
                      selectedQuality === q
                        ? 'bg-blue-600 border-blue-500 text-white'
                        : 'bg-gray-200 dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-blue-700'
                    }`}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Download Button */}
            <button
              onClick={handleDownload}
              disabled={downloading}
              className="mt-4 w-full bg-green-600 hover:bg-green-500 disabled:opacity-50 text-white py-3 rounded-xl font-semibold transition text-sm"
            >
              {downloading ? '⏳ Downloading... please wait' : `⬇️ Download ${selectedQuality}`}
            </button>

            {/* Thumbnail Download Button */}
            <button
              onClick={handleThumbnailDownload}
              disabled={thumbnailDownloading}
              className="mt-2 w-full bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 disabled:opacity-50 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white py-3 rounded-xl font-semibold transition text-sm"
            >
              {thumbnailDownloading ? '⏳ Saving thumbnail...' : '🖼️ Download Thumbnail'}
            </button>

            {/* Trust Badges */}
            <div className="mt-3 flex flex-wrap gap-4 text-xs text-gray-400 dark:text-gray-600">
              <span>✅ URL verified safe</span>
              <span>🔍 Will be virus scanned</span>
              <span>🔒 No logs kept</span>
            </div>
          </div>
        )}

        {/* Platform Badges */}
        {!videoInfo && (
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {platforms.map((p) => (
              <span key={p.name} className={`${p.color} text-white text-xs px-3 py-1.5 rounded-full font-medium`}>
                {p.name}
              </span>
            ))}
          </div>
        )}
      </section>

      {/* Features Grid */}
      <section id="features" className="px-6 pb-20 max-w-5xl mx-auto">
        <h2 className="text-center text-2xl font-bold mb-10 text-gray-800 dark:text-gray-200">
          Everything you need, nothing you don't
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 hover:border-blue-400 dark:hover:border-blue-800 transition"
            >
              <div className="text-3xl mb-3">{f.icon}</div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{f.title}</h3>
              <p className="text-gray-500 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 px-6 py-6 text-center text-gray-400 dark:text-gray-600 text-sm">
        <p>
          © 2025 UniDownloader • For personal use only •{' '}
          <a href="#" className="hover:text-gray-600 dark:hover:text-gray-400 transition">Privacy</a> •{' '}
          <Link href="/trust" className="hover:text-gray-600 dark:hover:text-gray-400 transition">DMCA</Link> •{' '}
          <Link href="/trust" className="hover:text-gray-600 dark:hover:text-gray-400 transition">Trust & Safety</Link>
        </p>
      </footer>

    </main>
  )
}