'use client'
import Link from 'next/link'
import { useState } from 'react'

export default function Settings() {
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('dark')
  const [downloadFolder, setDownloadFolder] = useState('C:\\Users\\LENOVO\\Downloads')
  const [notifications, setNotifications] = useState(true)
  const [emailAlerts, setEmailAlerts] = useState(false)
  const [saveHistory, setSaveHistory] = useState(true)
  const [autoQuality, setAutoQuality] = useState('1080p')
  const [speedLimit, setSpeedLimit] = useState('unlimited')
  const [saved, setSaved] = useState(false)

  const applyTheme = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    const isDark =
      newTheme === 'dark' ||
      (newTheme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)
    document.documentElement.classList.toggle('dark', isDark)
  }

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const Toggle = ({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) => (
    <button
      onClick={() => onChange(!value)}
      className={`relative w-11 h-6 rounded-full transition-colors ${value ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-700'}`}
    >
      <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${value ? 'translate-x-5' : 'translate-x-0'}`} />
    </button>
  )

  return (
    <main className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white">

      <nav className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">⬇️</span>
          <span className="text-xl font-bold text-gray-900 dark:text-white">UniDownloader</span>
        </Link>
        <div className="flex gap-3">
          <Link href="/login" className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm transition">Login</Link>
          <Link href="/signup" className="bg-blue-600 hover:bg-blue-500 text-white text-sm px-4 py-2 rounded-lg transition">Sign Up Free</Link>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">Settings</h1>
        <p className="text-gray-500 text-sm mb-8">Manage your preferences and account options</p>

        {saved && (
          <div className="mb-6 bg-green-950 border border-green-800 text-green-400 text-sm px-4 py-3 rounded-xl">
            ✅ Settings saved successfully!
          </div>
        )}

        {/* Appearance */}
        <div className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 mb-4">
          <h2 className="font-bold text-gray-900 dark:text-white mb-4">🎨 Appearance</h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">Theme</p>
              <p className="text-xs text-gray-500">Choose your preferred color mode</p>
            </div>
            <div className="flex items-center bg-gray-200 dark:bg-gray-800 rounded-lg p-1 gap-1">
              <button
                onClick={() => applyTheme('light')}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition ${theme === 'light' ? 'bg-white dark:bg-gray-600 shadow text-gray-900 dark:text-white' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'}`}
              >
                ☀️ Light
              </button>
              <button
                onClick={() => applyTheme('system')}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition ${theme === 'system' ? 'bg-white dark:bg-gray-600 shadow text-gray-900 dark:text-white' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'}`}
              >
                💻 System
              </button>
              <button
                onClick={() => applyTheme('dark')}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition ${theme === 'dark' ? 'bg-white dark:bg-gray-600 shadow text-gray-900 dark:text-white' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'}`}
              >
                🌙 Dark
              </button>
            </div>
          </div>
        </div>

        {/* Downloads */}
        <div className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 mb-4">
          <h2 className="font-bold text-gray-900 dark:text-white mb-4">⬇️ Downloads</h2>

          <div className="flex flex-col gap-5">
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">Download Folder</p>
              <p className="text-xs text-gray-500 mb-2">Where files are saved on your computer</p>
              <input
                type="text"
                value={downloadFolder}
                onChange={(e) => setDownloadFolder(e.target.value)}
                className="w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-2.5 rounded-xl outline-none border border-gray-300 dark:border-gray-700 focus:border-blue-500 transition text-sm"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">Default Quality</p>
                <p className="text-xs text-gray-500">Auto-select this quality when analyzing</p>
              </div>
              <select
                value={autoQuality}
                onChange={(e) => setAutoQuality(e.target.value)}
                className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 text-sm outline-none focus:border-blue-500 transition"
              >
                <option>Audio Only</option>
                <option>360p</option>
                <option>720p</option>
                <option>1080p</option>
                <option>4K</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">Download Speed Limit</p>
                <p className="text-xs text-gray-500">Limit bandwidth usage</p>
              </div>
              <select
                value={speedLimit}
                onChange={(e) => setSpeedLimit(e.target.value)}
                className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 text-sm outline-none focus:border-blue-500 transition"
              >
                <option value="unlimited">Unlimited</option>
                <option value="1mb">1 MB/s</option>
                <option value="2mb">2 MB/s</option>
                <option value="5mb">5 MB/s</option>
                <option value="10mb">10 MB/s</option>
              </select>
            </div>
          </div>
        </div>

        {/* Privacy */}
        <div className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 mb-4">
          <h2 className="font-bold text-gray-900 dark:text-white mb-4">🔒 Privacy</h2>
          <div className="flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">Save Download History</p>
                <p className="text-xs text-gray-500">Keep a record of your past downloads</p>
              </div>
              <Toggle value={saveHistory} onChange={setSaveHistory} />
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 mb-4">
          <h2 className="font-bold text-gray-900 dark:text-white mb-4">🔔 Notifications</h2>
          <div className="flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">Browser Notifications</p>
                <p className="text-xs text-gray-500">Get notified when a download finishes</p>
              </div>
              <Toggle value={notifications} onChange={setNotifications} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">Email Alerts</p>
                <p className="text-xs text-gray-500">Receive email when download completes</p>
              </div>
              <Toggle value={emailAlerts} onChange={setEmailAlerts} />
            </div>
          </div>
        </div>

        {/* Account */}
        <div className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 mb-4">
          <h2 className="font-bold text-gray-900 dark:text-white mb-4">👤 Account</h2>
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">Current Plan</p>
                <p className="text-xs text-gray-500">You are on the Free plan</p>
              </div>
              <Link href="/pricing" className="bg-blue-600 hover:bg-blue-500 text-white text-xs px-4 py-2 rounded-lg transition font-medium">
                Upgrade to Pro
              </Link>
            </div>
            <div className="h-px bg-gray-200 dark:bg-gray-800" />
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">Export My Data</p>
                <p className="text-xs text-gray-500">Download all your data as a ZIP file</p>
              </div>
              <button className="bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-900 dark:text-white text-xs px-4 py-2 rounded-lg transition font-medium">
                Export
              </button>
            </div>
            <div className="h-px bg-gray-200 dark:bg-gray-800" />
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">Change Password</p>
                <p className="text-xs text-gray-500">Update your account password</p>
              </div>
              <button className="bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-900 dark:text-white text-xs px-4 py-2 rounded-lg transition font-medium">
                Change
              </button>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-red-950 border border-red-900 rounded-2xl p-6 mb-8">
          <h2 className="font-bold text-red-400 mb-4">⚠️ Danger Zone</h2>
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white">Clear Download History</p>
                <p className="text-xs text-red-400">Permanently delete all download history</p>
              </div>
              <button className="bg-red-800 hover:bg-red-700 text-white text-xs px-4 py-2 rounded-lg transition font-medium">
                Clear
              </button>
            </div>
            <div className="h-px bg-red-900" />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white">Delete Account</p>
                <p className="text-xs text-red-400">Permanently delete your account and all data</p>
              </div>
              <button className="bg-red-600 hover:bg-red-500 text-white text-xs px-4 py-2 rounded-lg transition font-medium">
                Delete
              </button>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-xl font-semibold transition text-sm"
        >
          Save Settings
        </button>
      </div>

      <footer className="border-t border-gray-200 dark:border-gray-800 px-6 py-6 text-center text-gray-400 dark:text-gray-600 text-sm">
        <p>
          © 2025 UniDownloader • For personal use only •{' '}
          <Link href="/trust" className="hover:text-gray-600 dark:hover:text-gray-400 transition">Privacy</Link> •{' '}
          <Link href="/trust" className="hover:text-gray-600 dark:hover:text-gray-400 transition">DMCA</Link> •{' '}
          <Link href="/pricing" className="hover:text-gray-600 dark:hover:text-gray-400 transition">Pricing</Link>
        </p>
      </footer>

    </main>
  )
}