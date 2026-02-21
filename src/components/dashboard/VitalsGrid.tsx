import type { Vital } from '@/data/mockData'
import VitalCard from './VitalCard'

interface VitalsGridProps {
  vitals: Vital[]
}

export default function VitalsGrid({ vitals }: VitalsGridProps) {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {vitals.map((vital, i) => (
        <VitalCard key={vital.id} vital={vital} index={i} />
      ))}
    </div>
  )
}
