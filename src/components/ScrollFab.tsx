import { useEffect, useState } from 'react'
import { ArrowDown, ArrowUp } from 'lucide-react'

export default function ScrollFab() {
  const [atTop, setAtTop] = useState(true)

  useEffect(() => {
    const onScroll = () => setAtTop(window.scrollY < 200)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const toggle = () => {
    window.scrollTo({
      top: atTop ? document.documentElement.scrollHeight : 0,
      behavior: 'smooth',
    })
  }

  return (
    <button
      onClick={toggle}
      aria-label={atTop ? 'Aller en bas de page' : 'Retour en haut de page'}
      title={atTop ? 'Aller en bas' : 'Retour en haut'}
      className="fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-teal-700 text-white shadow-lg shadow-teal-900/20 transition hover:-translate-y-0.5 hover:bg-teal-600"
    >
      {atTop ? <ArrowDown className="h-5 w-5" /> : <ArrowUp className="h-5 w-5" />}
    </button>
  )
}
