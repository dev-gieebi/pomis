import { Cog, Settings, Wrench } from 'lucide-react'

const pieces = [
  { left: '3%',  size: 42, dur: '17s', delay: '0s',   Icon: Cog },
  { left: '11%', size: 24, dur: '23s', delay: '6s',   Icon: Wrench },
  { left: '19%', size: 32, dur: '14s', delay: '3s',   Icon: Settings },
  { left: '30%', size: 20, dur: '26s', delay: '11s',  Icon: Cog },
  { left: '42%', size: 48, dur: '19s', delay: '8s',   Icon: Cog },
  { left: '55%', size: 26, dur: '15s', delay: '1.5s', Icon: Wrench },
  { left: '66%', size: 36, dur: '21s', delay: '13s',  Icon: Cog },
  { left: '76%', size: 22, dur: '27s', delay: '5s',   Icon: Settings },
  { left: '86%', size: 40, dur: '16s', delay: '9s',   Icon: Cog },
  { left: '94%', size: 28, dur: '24s', delay: '15s',  Icon: Wrench },
]

export default function FallingGears() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-10 overflow-hidden">
      {pieces.map((p, i) => (
        <p.Icon
          key={i}
          size={p.size}
          className="animate-gear-fall absolute -top-16 text-teal-700/10"
          style={{ left: p.left, animationDuration: p.dur, animationDelay: p.delay }}
        />
      ))}
    </div>
  )
}
