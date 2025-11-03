import { useMemo, useState } from 'react'
import { MapPin, Download, Phone, Mail, MessageSquare, ArrowUp, Facebook, Instagram, Youtube } from 'lucide-react'

const CITY_MAP = {
  Jakarta: 'https://www.google.com/maps?q=OPPO%20Service%20Center%20Jakarta&output=embed',
  Surabaya: 'https://www.google.com/maps?q=OPPO%20Service%20Center%20Surabaya&output=embed',
  Bandung: 'https://www.google.com/maps?q=OPPO%20Service%20Center%20Bandung&output=embed',
  Medan: 'https://www.google.com/maps?q=OPPO%20Service%20Center%20Medan&output=embed',
}

const DOWNLOADS = [
  { name: 'Firmware A57 (Indonesia)', size: '2.1 GB', type: 'Firmware' },
  { name: 'Panduan Pengguna Reno Series (PDF)', size: '4.2 MB', type: 'Panduan' },
  { name: 'OPPO PC Suite', size: '120 MB', type: 'Aplikasi' },
]

export default function SupportPanel({ lang }) {
  const [city, setCity] = useState('Jakarta')
  const [showTop, setShowTop] = useState(false)

  useState(() => {
    const onScroll = () => setShowTop(window.scrollY > 400)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const mapSrc = useMemo(() => CITY_MAP[city] || CITY_MAP['Jakarta'], [city])

  return (
    <section className="bg-white">
      <div id="service-center" className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">{lang === 'id' ? 'Lokasi Service Center' : 'Service Center Locations'}</h2>
        <div className="grid lg:grid-cols-3 gap-6 items-start">
          <div className="lg:col-span-2 rounded-xl overflow-hidden border border-gray-200">
            <iframe title="OPPO Service Center Map" src={mapSrc} className="w-full h-[320px]" loading="lazy" allowFullScreen></iframe>
          </div>
          <div className="space-y-3">
            <label className="block text-sm text-gray-700">{lang === 'id' ? 'Cari berdasarkan kota' : 'Search by city'}</label>
            <select value={city} onChange={(e) => setCity(e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2">
              {Object.keys(CITY_MAP).map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <div className="text-sm text-gray-600 flex items-center gap-2"><MapPin className="h-4 w-4 text-[#00A682]" /> {lang === 'id' ? 'Temukan pusat layanan terdekat.' : 'Find the nearest service center.'}</div>
          </div>
        </div>
      </div>

      <div id="downloads" className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">{lang === 'id' ? 'Pusat Unduhan' : 'Download Center'}</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {DOWNLOADS.map((d, idx) => (
            <div key={idx} className="border border-gray-200 rounded-xl p-4 flex flex-col gap-2">
              <div className="text-gray-900 font-medium">{d.name}</div>
              <div className="text-xs text-gray-500">{d.type} • {d.size}</div>
              <a href="#" className="mt-auto inline-flex items-center gap-2 text-white bg-[#00A682] hover:bg-[#00906F] px-4 py-2 rounded-lg">
                <Download className="h-4 w-4" /> {lang === 'id' ? 'Download Sekarang' : 'Download Now'}
              </a>
            </div>
          ))}
        </div>
      </div>

      <div id="contact" className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">{lang === 'id' ? 'Kontak & Dukungan Online' : 'Contact & Online Support'}</h2>
        <div className="grid lg:grid-cols-2 gap-6">
          <form className="border border-gray-200 rounded-xl p-6 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-700">{lang === 'id' ? 'Nama' : 'Name'}</label>
                <input type="text" className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2" placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-sm text-gray-700">Email</label>
                <input type="email" className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2" placeholder="you@example.com" />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-700">{lang === 'id' ? 'Nomor HP' : 'Phone Number'}</label>
                <input type="tel" className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2" placeholder="08xxxxxxxxxx" />
              </div>
              <div>
                <label className="block text-sm text-gray-700">{lang === 'id' ? 'Subjek' : 'Subject'}</label>
                <input type="text" className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2" placeholder="Bantuan perangkat" />
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-700">{lang === 'id' ? 'Pesan' : 'Message'}</label>
              <textarea className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 h-28" placeholder={lang === 'id' ? 'Tulis pesan Anda…' : 'Write your message…'}></textarea>
            </div>
            <div className="flex items-center gap-3">
              <button type="submit" className="bg-[#00A682] hover:bg-[#00906F] text-white px-5 py-2.5 rounded-lg">{lang === 'id' ? 'Kirim' : 'Send'}</button>
              <a href="https://wa.me/6281234567890" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-2 border border-[#00A682] text-[#00A682] rounded-lg hover:bg-[#00A682]/10">
                <MessageSquare className="h-4 w-4" /> WhatsApp
              </a>
            </div>
            <div className="text-sm text-gray-500 flex items-center gap-2">
              <Phone className="h-4 w-4 text-[#00A682]" /> {lang === 'id' ? 'Jam operasional: Senin–Jumat 09.00–17.00' : 'Business hours: Mon–Fri 9am–5pm'}
            </div>
          </form>

          <div className="border border-gray-200 rounded-xl p-6 space-y-4 bg-gray-50">
            <div>
              <h3 className="font-semibold text-gray-900">{lang === 'id' ? 'Bantuan Cepat' : 'Quick Help'}</h3>
              <ul className="mt-2 space-y-2 text-sm text-gray-700 list-disc list-inside">
                <li>{lang === 'id' ? 'Lacak status perbaikan perangkat' : 'Track device repair status'}</li>
                <li>{lang === 'id' ? 'Reservasi layanan service center' : 'Book service center appointment'}</li>
                <li>{lang === 'id' ? 'Pembaruan perangkat lunak terbaru' : 'Latest software updates'}</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{lang === 'id' ? 'Email Dukungan' : 'Support Email'}</h3>
              <a href="mailto:support@example.com" className="inline-flex items-center gap-2 text-[#00A682] hover:underline"><Mail className="h-4 w-4" /> support@example.com</a>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-[#1A1A1A] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid md:grid-cols-4 gap-8">
          <div>
            <div className="text-lg font-semibold">OPPO</div>
            <p className="text-sm text-gray-300 mt-2">{lang === 'id' ? 'Pusat bantuan resmi untuk layanan pelanggan OPPO.' : 'Official help center for OPPO customer service.'}</p>
          </div>
          <div>
            <div className="font-semibold mb-3">{lang === 'id' ? 'Tentang OPPO' : 'About OPPO'}</div>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a className="hover:text-white" href="#">{lang === 'id' ? 'Profil Perusahaan' : 'Company Profile'}</a></li>
              <li><a className="hover:text-white" href="#">{lang === 'id' ? 'Karier' : 'Careers'}</a></li>
              <li><a className="hover:text-white" href="#">{lang === 'id' ? 'Berita' : 'News'}</a></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold mb-3">{lang === 'id' ? 'Kebijakan' : 'Policies'}</div>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a className="hover:text-white" href="#">{lang === 'id' ? 'Kebijakan Privasi' : 'Privacy Policy'}</a></li>
              <li><a className="hover:text-white" href="#">{lang === 'id' ? 'Syarat & Ketentuan' : 'Terms & Conditions'}</a></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold mb-3">{lang === 'id' ? 'Hubungi Kami' : 'Contact Us'}</div>
            <div className="flex items-center gap-3 text-gray-300">
              <a href="#" aria-label="Facebook" className="hover:text-white">F</a>
              <a href="#" aria-label="Instagram" className="hover:text-white">I</a>
              <a href="#" aria-label="YouTube" className="hover:text-white">Y</a>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 text-xs text-gray-400">© {new Date().getFullYear()} OPPO Support — All rights reserved.</div>
        </div>
      </footer>

      {showTop && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="fixed bottom-6 right-6 p-3 rounded-full bg-[#00A682] text-white shadow-lg hover:bg-[#00906F]">
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </section>
  )
}
