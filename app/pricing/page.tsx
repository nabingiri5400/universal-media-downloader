'use client'
import Link from 'next/link'
import { useState } from 'react'

export default function Pricing() {
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly')

  const plans = [
    {
      name: 'Free',
      price: { monthly: 0, yearly: 0 },
      description: 'Perfect for casual use',
      color: 'border-gray-200 dark:border-gray-800',
      badge: null,
      buttonText: 'Get Started Free',
      buttonStyle: 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white',
      features: [
        '5 downloads per day',
        'Up to 1080p quality',
        'Single URL only',
        'Thumbnail download',
        'Ads shown',
        'Basic support',
      ],
      notIncluded: [
        'Batch downloads',
        'Playlist download',
        '4K quality',
        'No ads',
        'Download history',
        'Media enhancement',
      ],
    },
    {
      name: 'Pro',
      price: { monthly: 7, yearly: 49 },
      description: 'For power users',
      color: 'border-blue-500',
      badge: 'Most Popular',
      buttonText: 'Start Pro — 7 Day Free Trial',
      buttonStyle: 'bg-blue-600 hover:bg-blue-500 text-white',
      features: [
        'Unlimited downloads',
        'Up to 4K quality',
        'Batch download (50 URLs)',
        'Playlist download',
        'No ads',
        'Download history (90 days)',
        'Media enhancement',
        'Auto-captions',
        'Thumbnail download',
        'Priority support',
        'Smart filename',
        'Subtitle download',
      ],
      notIncluded: [],
    },
    {
      name: 'Lifetime',
      price: { monthly: 79, yearly: 79 },
      description: 'Pay once, own forever',
      color: 'border-purple-500',
      badge: 'Best Value',
      buttonText: 'Get Lifetime Access',
      buttonStyle: 'bg-purple-600 hover:bg-purple-500 text-white',
      features: [
        'Everything in Pro forever',
        'No monthly fee ever',
        'All future features included',
        'Priority support forever',
        'Early access to new features',
        'Unlimited downloads',
        'Up to 4K quality',
        'No ads forever',
        'Cloud sync (coming soon)',
        'Browser extension (coming soon)',
      ],
      notIncluded: [],
    },
    {
      name: 'Team',
      price: { monthly: 20, yearly: 150 },
      description: '5 seats included',
      color: 'border-green-500',
      badge: 'For Teams',
      buttonText: 'Start Team Plan',
      buttonStyle: 'bg-green-600 hover:bg-green-500 text-white',
      features: [
        '5 seats included',
        'Shared download library',
        'Admin dashboard',
        'Priority download queue',
        'Invoices for billing',
        'Everything in Pro',
        'Dedicated support',
        'Usage analytics',
        'Custom download folder',
        'API access',
      ],
      notIncluded: [],
    },
  ]

  const faqs = [
    {
      q: 'Can I cancel anytime?',
      a: 'Yes. Cancel your subscription anytime from your account settings. No questions asked.',
    },
    {
      q: 'What happens after the free trial?',
      a: 'After 7 days your Pro trial ends and you are moved to the Free plan unless you add a payment method.',
    },
    {
      q: 'Is the Lifetime deal really forever?',
      a: 'Yes. Pay once and get access to everything in Pro forever including all future features.',
    },
    {
      q: 'What payment methods do you accept?',
      a: 'We accept all major credit cards, debit cards, and PayPal via Stripe.',
    },
    {
      q: 'Is downloading videos legal?',
      a: 'UniDownloader is for personal use only. Always check the platform terms of service before downloading.',
    },
    {
      q: 'Do Pro users see any ads?',
      a: 'No. Pro, Lifetime and Team users get a completely ad-free experience.',
    },
  ]

  return (
    <main className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white">

      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">⬇️</span>
          <span className="text-xl font-bold text-gray-900 dark:text-white">UniDownloader</span>
        </Link>
        <div className="flex gap-3">
          <Link href="/login" className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm transition">
            Login
          </Link>
          <Link href="/signup" className="bg-blue-600 hover:bg-blue-500 text-white text-sm px-4 py-2 rounded-lg transition">
            Sign Up Free
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="text-center px-4 pt-16 pb-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-3">
          Simple, Transparent Pricing
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-lg max-w-xl mx-auto mb-8">
          Start free. Upgrade when you need more. No hidden fees.
        </p>

        {/* Billing Toggle */}
        <div className="inline-flex items-center bg-gray-100 dark:bg-gray-800 rounded-xl p-1 gap-1">
          <button
            onClick={() => setBilling('monthly')}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition ${
              billing === 'monthly'
                ? 'bg-white dark:bg-gray-700 shadow text-gray-900 dark:text-white'
                : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBilling('yearly')}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2 ${
              billing === 'yearly'
                ? 'bg-white dark:bg-gray-700 shadow text-gray-900 dark:text-white'
                : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Yearly
            <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
              Save 40%
            </span>
          </button>
        </div>
      </section>

      {/* Plans Grid */}
      <section className="px-4 pb-16 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative bg-white dark:bg-gray-900 border-2 ${plan.color} rounded-2xl p-6 flex flex-col`}
            >
              {/* Badge */}
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full text-white ${
                    plan.badge === 'Most Popular' ? 'bg-blue-600' :
                    plan.badge === 'Best Value' ? 'bg-purple-600' :
                    'bg-green-600'
                  }`}>
                    {plan.badge}
                  </span>
                </div>
              )}

              {/* Plan Header */}
              <div className="mb-4">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">{plan.name}</h2>
                <p className="text-gray-500 text-xs mt-0.5">{plan.description}</p>
              </div>

              {/* Price */}
              <div className="mb-6">
                {plan.name === 'Lifetime' ? (
                  <div>
                    <span className="text-4xl font-bold text-gray-900 dark:text-white">$79</span>
                    <span className="text-gray-500 text-sm ml-1">one time</span>
                  </div>
                ) : (
                  <div>
                    <span className="text-4xl font-bold text-gray-900 dark:text-white">
                      ${billing === 'monthly' ? plan.price.monthly : Math.round(plan.price.yearly / 12)}
                    </span>
                    <span className="text-gray-500 text-sm ml-1">/month</span>
                    {billing === 'yearly' && plan.price.yearly > 0 && (
                      <p className="text-green-500 text-xs mt-1">
                        Billed ${plan.price.yearly}/year
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Button */}
              <button className={`w-full py-2.5 rounded-xl font-semibold text-sm transition mb-6 ${plan.buttonStyle}`}>
                {plan.buttonText}
              </button>

              {/* Features */}
              <div className="flex flex-col gap-2 flex-1">
                {plan.features.map((f) => (
                  <div key={f} className="flex items-start gap-2 text-xs text-gray-700 dark:text-gray-300">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>{f}</span>
                  </div>
                ))}
                {plan.notIncluded.map((f) => (
                  <div key={f} className="flex items-start gap-2 text-xs text-gray-400 dark:text-gray-600">
                    <span className="mt-0.5">✕</span>
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Google Ads Banner — Free users only */}
      <section className="px-4 pb-10 max-w-4xl mx-auto">
        <div className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 text-center">
          <p className="text-gray-400 text-xs mb-2">Advertisement — Upgrade to Pro to remove ads</p>
          <div className="bg-gray-200 dark:bg-gray-800 rounded-xl h-20 flex items-center justify-center text-gray-400 text-sm">
            📢 Google AdSense Banner Will Appear Here
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 pb-20 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          Frequently Asked Questions
        </h2>
        <div className="flex flex-col gap-4">
          {faqs.map((faq) => (
            <div
              key={faq.q}
              className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5"
            >
              <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">{faq.q}</h3>
              <p className="text-gray-500 text-sm">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 px-6 py-6 text-center text-gray-400 dark:text-gray-600 text-sm">
        <p>
          © 2025 UniDownloader • For personal use only •{' '}
          <Link href="/trust" className="hover:text-gray-600 dark:hover:text-gray-400 transition">Privacy</Link> •{' '}
          <Link href="/trust" className="hover:text-gray-600 dark:hover:text-gray-400 transition">DMCA</Link> •{' '}
          <Link href="/trust" className="hover:text-gray-600 dark:hover:text-gray-400 transition">Trust & Safety</Link>
        </p>
      </footer>

    </main>
  )
}