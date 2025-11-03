import { useEffect, useState } from 'react'
import { Search, User, Globe } from 'lucide-react'

const NAV_ITEMS = [
  'Produk',
  'Servis',
  'Garansi',
  'Kontak',
  'Pusat Unduhan',
  'Komunitas',
]

export default function Header({ lang, onToggleLang, onGlobalSearch }) {
  const [scrolled, setScrolled] = useState(false)
  const [query, setQuery] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    onGlobalSearch?.(query)
  }, [query, onGlobalSearch])

  return (
    <header className={`sticky top-0 z-50 transition-all ${scrolled ? 'bg-white/95 shadow-md backdrop-blur' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <a href="#" className="flex items-center gap-3" aria-label="OPPO Support Home">
            <img src="/logo_support.png" alt="OPPO" className="h-6 w-auto" />
            <span className="sr-only">OPPO Support</span>
          </a>

          <nav className="hidden lg:flex items-center gap-6 text-sm text-gray-700">
            {NAV_ITEMS.map((item) => (
              <a key={item} href="#" className="hover:text-[#00A682] transition-colors">
                {item}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center bg-gray-100 rounded-full px-3 py-1.5 focus-within:ring-2 ring-[#00A682] transition">
              <Search className="h-4 w-4 text-gray-500" />
              <input
                aria-label="Cari di situs"
                type="text"
                placeholder={lang === 'id' ? 'Cari global' : 'Global search'}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="bg-transparent outline-none text-sm px-2 w-48"
              />
            </div>

            <button
              aria-label="Account"
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <User className="h-5 w-5 text-gray-700" />
            </button>

            <button
              aria-label="Toggle language"
              onClick={onToggleLang}
              className="flex items-center gap-1 px-2 py-1 rounded-full hover:bg-gray-100"
            >
              <Globe className="h-5 w-5 text-gray-700" />
              <span className="text-sm text-gray-700 uppercase">{lang}</span>
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        <div className="lg:hidden pb-3">
          <div className="flex items-center gap-2">
            <div className="flex-1 flex items-center bg-gray-100 rounded-full px-3 py-1.5 focus-within:ring-2 ring-[#00A682] transition">
              <Search className="h-4 w-4 text-gray-500" />
              <input
                aria-label="Cari di situs"
                type="text"
                placeholder={lang === 'id' ? 'Cari global' : 'Global search'}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="bg-transparent outline-none text-sm px-2 w-full"
              />
            </div>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2 text-sm">
            {NAV_ITEMS.map((item) => (
              <a key={item} href="#" className="py-2 text-center rounded-md bg-gray-50 hover:bg-gray-100 text-gray-700">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}
