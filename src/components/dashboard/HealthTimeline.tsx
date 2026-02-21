import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Clock } from 'lucide-react'
import type { TimelineEvent as TEvent } from '@/data/mockData'
import TimelineEventItem from './TimelineEvent'

interface HealthTimelineProps {
  events: TEvent[]
}

export default function HealthTimeline({ events }: HealthTimelineProps) {
  return (
    <Card className="border-border/60 shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-primary" />
          <CardTitle className="text-base font-semibold">Health Timeline</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="mt-2">
          {events.map((event, i) => (
            <TimelineEventItem
              key={event.id}
              event={event}
              index={i}
              isLast={i === events.length - 1}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
