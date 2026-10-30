const fcfa = new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 })

export function fmtFCFA(n: number): string {
  return `${fcfa.format(n)} FCFA`
}

export function fmtNum(n: number): string {
  return fcfa.format(n)
}

export function fmtDate(iso: string): string {
  return new Date(iso).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

export function fmtDateShort(iso: string): string {
  return new Date(iso).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'short',
  })
}

export function fmtDateTime(iso: string): string {
  return new Date(iso).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function initials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

export function daysBetween(a: string, b: string): number {
  return Math.round((new Date(b).getTime() - new Date(a).getTime()) / 86400000)
}

export function agingBucket(dueDate: string, today = '2026-10-30'): string {
  const d = daysBetween(dueDate, today)
  if (d <= 0) return 'Non échue'
  if (d <= 30) return '0-30 j'
  if (d <= 60) return '31-60 j'
  if (d <= 90) return '61-90 j'
  return '+90 j'
}
