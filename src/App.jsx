import { useCallback, useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import HelpArticles from './components/HelpArticles'
import SupportPanel from './components/SupportPanel'

function App() {
  const [lang, setLang] = useState('id')

  const handleToggleLang = useCallback(() => {
    setLang((prev) => (prev === 'id' ? 'en' : 'id'))
  }, [])

  const handleGlobalSearch = useCallback((q) => {
    // This could hook into a global search state if needed
    void q
  }, [])

  const handlePickSuggestion = useCallback((s) => {
    alert(`${lang === 'id' ? 'Anda memilih:' : 'You selected:'} ${s.title}`)
  }, [lang])

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header lang={lang} onToggleLang={handleToggleLang} onGlobalSearch={handleGlobalSearch} />
      <main>
        <Hero lang={lang} onPickSuggestion={handlePickSuggestion} />
        <HelpArticles lang={lang} />
        <SupportPanel lang={lang} />
      </main>
    </div>
  )
}

export default App
