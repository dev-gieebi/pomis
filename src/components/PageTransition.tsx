import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Cog } from 'lucide-react'
import logo from '../assets/logo.png'

export default function PageTransition() {
  const { pathname } = useLocation()
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    setVisible(true)
    const t = setTimeout(() => setVisible(false), 950)
    return () => clearTimeout(t)
  }, [pathname])

  if (!visible) return null

  return (
    <div
      key={pathname}
      className="page-transition fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6"
      aria-hidden
    >
      <div className="relative flex items-center justify-center">
        <span className="absolute h-32 w-32 animate-ping rounded-full border border-white/30" />
        <Cog className="animate-gear-spin h-20 w-20 text-white/95" strokeWidth={1.25} />
        <span className="absolute -right-8 -top-7">
          <Cog className="animate-gear-spin-rev h-9 w-9 text-amber-300" strokeWidth={1.5} />
        </span>
      </div>
      <img src={logo} alt="PROMI&S" className="h-14 w-auto object-contain drop-shadow-lg" />
    </div>
  )
}
