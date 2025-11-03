import { useEffect, useMemo, useRef, useState } from 'react'
import { ChevronDown, Search } from 'lucide-react'

const QUICK_LINKS = [
  { label: 'Service Center', href: '#service-center' },
  { label: 'Periksa Garansi', href: '#help' },
  { label: 'Panduan Pengguna', href: '#articles' },
  { label: 'Perangkat Lunak', href: '#downloads' },
]

const ARTICLES = [
  { id: 1, title: 'Cara cek garansi perangkat OPPO', category: 'Garansi' },
  { id: 2, title: 'Memperbarui ColorOS ke versi terbaru', category: 'Perangkat Lunak' },
  { id: 3, title: 'Perbaikan umum kamera tidak fokus', category: 'Perangkat' },
  { id: 4, title: 'Mengamankan akun OPPO Anda', category: 'Aplikasi' },
  { id: 5, title: 'Mengatasi baterai boros setelah update', category: 'Perangkat' },
  { id: 6, title: 'Cara mengatur ulang pabrik dengan aman', category: 'Perangkat' },
]

export default function Hero({ lang, onPickSuggestion }) {
  const [query, setQuery] = useState('')
  const [focused, setFocused] = useState(false)
  const inputRef = useRef(null)

  const suggestions = useMemo(() => {
    if (!query) return []
    const q = query.toLowerCase()
    return ARTICLES.filter((a) => a.title.toLowerCase().includes(q)).slice(0, 6)
  }, [query])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === '/' && document.activeElement !== inputRef.current) {
        e.preventDefault()
        inputRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <section className="bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-gray-900">
            {lang === 'id' ? 'Selamat Datang di Layanan Dukungan OPPO' : 'Welcome to OPPO Support'}
          </h1>
          <p className="mt-3 text-gray-600">
            {lang === 'id' ? 'Temukan bantuan, panduan, dan solusi untuk perangkat Anda' : 'Find help, guides, and solutions for your device'}
          </p>
        </div>

        <div className="mt-8 max-w-3xl mx-auto">
          <div className="relative">
            <div className="flex items-center bg-white border border-gray-200 rounded-2xl shadow-sm focus-within:ring-2 ring-[#00A682] transition">
              <div className="pl-4 pr-2 text-gray-500">
                <Search className="h-5 w-5" />
              </div>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setTimeout(() => setFocused(false), 120)}
                placeholder={lang === 'id' ? 'Cari masalah, panduan, atau produk Anda…' : 'Search issues, guides, or your product…'}
                className="flex-1 py-4 pr-4 outline-none rounded-2xl"
                aria-label="Pencarian utama"
              />
            </div>

            {focused && suggestions.length > 0 && (
              <div className="absolute left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-10">
                {suggestions.map((s) => (
                  <button
                    key={s.id}
                    onMouseDown={() => onPickSuggestion?.(s)}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center justify-between"
                  >
                    <span className="text-gray-800">{s.title}</span>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">{s.category}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            {QUICK_LINKS.map((q) => (
              <a
                key={q.label}
                href={q.href}
                className="px-4 py-2 rounded-full border border-gray-200 hover:border-[#00A682] hover:text-[#00A682] transition"
              >
                {q.label}
              </a>
            ))}
          </div>

          <div className="mt-10 flex items-center justify-center text-[#00A682]">
            <ChevronDown className="h-6 w-6 animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  )
}
