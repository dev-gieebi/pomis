import { Award, QrCode } from 'lucide-react'
import { certificates, sessions, traineeName, trainingLabel } from '../data/mock'
import { fmtDate } from '../lib/format'
import { Card, DataTable, PageHeader } from '../components/ui'

export default function Attestations() {
  return (
    <div>
      <PageHeader
        title="Registre des attestations"
        subtitle="Attestations numérotées avec QR code de vérification publique"
      />

      <DataTable
        rows={certificates}
        columns={[
          {
            header: 'N°',
            cell: (c) => (
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 text-amber-500" />
                <span className="font-mono font-medium text-slate-800">{c.numero}</span>
              </div>
            ),
          },
          { header: 'Stagiaire', cell: (c) => traineeName(c.traineeId) },
          {
            header: 'Session',
            cell: (c) => {
              const s = sessions.find((x) => x.id === c.sessionId)
              return (
                <div className="max-w-64">
                  <p className="truncate text-sm text-slate-700">{s ? trainingLabel(s.trainingId) : '—'}</p>
                  <p className="text-xs text-slate-400">{s?.numero}</p>
                </div>
              )
            },
          },
          { header: 'Délivrée le', cell: (c) => <span className="text-slate-500">{fmtDate(c.dateDelivrance)}</span> },
          {
            header: 'Vérification',
            cell: (c) => (
              <span className="inline-flex items-center gap-1.5 rounded-md bg-slate-100 px-2 py-1 font-mono text-xs text-slate-600">
                <QrCode className="h-3.5 w-3.5" />
                {c.verificationCode}
              </span>
            ),
          },
        ]}
      />

      <Card className="mt-5 flex items-start gap-3 border-amber-200 bg-amber-50 p-4">
        <QrCode className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
        <p className="text-sm text-amber-800">
          Chaque attestation porte un QR code renvoyant vers une page publique de vérification
          d'authenticité. Présence minimale requise : <strong>80 %</strong> des demi-journées,
          paramétrable dans les réglages.
        </p>
      </Card>
    </div>
  )
}
