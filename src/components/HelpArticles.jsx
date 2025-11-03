import { useMemo, useState } from 'react'
import { Smartphone, Shield, Wrench, BookOpen, Users, Download, ChevronDown } from 'lucide-react'

const CATEGORIES = [
  { key: 'Perangkat & Fitur', icon: Smartphone },
  { key: 'Layanan & Garansi', icon: Shield },
  { key: 'Pembaruan Perangkat Lunak', icon: Download },
  { key: 'Panduan Pengguna', icon: BookOpen },
  { key: 'Perbaikan & Service Center', icon: Wrench },
  { key: 'Komunitas', icon: Users },
]

const ALL_ARTICLES = [
  { id: 1, title: 'Cara cek garansi perangkat OPPO', summary: 'Langkah-langkah memeriksa status garansi perangkat Anda.', category: 'Garansi' },
  { id: 2, title: 'Memperbarui ColorOS ke versi terbaru', summary: 'Panduan update sistem untuk performa terbaik.', category: 'Perangkat Lunak' },
  { id: 3, title: 'Perbaikan umum kamera tidak fokus', summary: 'Solusi cepat untuk masalah fokus kamera.', category: 'Perangkat' },
  { id: 4, title: 'Mengamankan akun OPPO Anda', summary: 'Tips keamanan penting untuk akun Anda.', category: 'Aplikasi' },
  { id: 5, title: 'Mengatasi baterai boros setelah update', summary: 'Optimasi baterai setelah pembaruan.', category: 'Perangkat' },
  { id: 6, title: 'Cara mengatur ulang pabrik dengan aman', summary: 'Backup dan reset yang benar.', category: 'Perangkat' },
]

const FILTERS = ['Semua', 'Perangkat', 'Garansi', 'Aplikasi', 'Perangkat Lunak']

export default function HelpArticles({ lang }) {
  const [activeIdx, setActiveIdx] = useState(null)
  const [filter, setFilter] = useState('Semua')

  const filteredArticles = useMemo(() => {
    if (filter === 'Semua') return ALL_ARTICLES
    return ALL_ARTICLES.filter((a) => a.category === filter)
  }, [filter])

  return (
    <section id="help" className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">{lang === 'id' ? 'Kategori Bantuan' : 'Help Topics'}</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {CATEGORIES.map(({ key, icon: Icon }) => (
            <a key={key} href="#" className="group rounded-xl border border-gray-200 p-4 text-center hover:shadow-md hover:border-[#00A682] transition">
              <Icon className="mx-auto h-6 w-6 text-[#00A682] group-hover:scale-110 transition-transform" />
              <div className="mt-2 text-sm text-gray-800">{key}</div>
            </a>
          ))}
        </div>

        <div id="articles" className="mt-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <h3 className="text-xl font-semibold text-gray-900">{lang === 'id' ? 'Pertanyaan Umum (FAQ)' : 'Frequently Asked Questions'}</h3>
            <div>
              <select value={filter} onChange={(e) => setFilter(e.target.value)} className="border border-gray-200 rounded-lg px-3 py-2 text-sm">
                {FILTERS.map((f) => (
                  <option key={f} value={f}>{f}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4 grid md:grid-cols-2 gap-4">
            {filteredArticles.map((a) => (
              <div key={a.id} className="border border-gray-200 rounded-xl overflow-hidden">
                <div className="p-4">
                  <div className="font-medium text-gray-900">{a.title}</div>
                  <div className="text-sm text-gray-600 mt-1">{a.summary}</div>
                  <div className="mt-3">
                    <a href="#" className="text-[#00A682] text-sm font-medium hover:underline">{lang === 'id' ? 'Lihat Selengkapnya' : 'Read more'}</a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <h4 className="text-lg font-semibold mb-3">{lang === 'id' ? 'FAQ Cepat' : 'Quick FAQ'}</h4>
            <div className="space-y-2">
              {[0,1,2,3].map((i) => (
                <div key={i} className="border border-gray-200 rounded-lg overflow-hidden">
                  <button onClick={() => setActiveIdx(activeIdx === i ? null : i)} className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50">
                    <span className="text-gray-800">{lang === 'id' ? 'Bagaimana cara menghubungi layanan pelanggan?' : 'How to contact customer support?'}</span>
                    <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${activeIdx === i ? 'rotate-180' : ''}`} />
                  </button>
                  <div className={`px-4 overflow-hidden transition-[max-height] duration-300 ${activeIdx === i ? 'max-h-40 py-2' : 'max-h-0'}`}>
                    <p className="text-sm text-gray-600">
                      {lang === 'id' ? 'Anda dapat menghubungi kami melalui formulir kontak, WhatsApp, atau telepon pada jam operasional.' : 'You can reach us via contact form, WhatsApp, or phone during business hours.'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
