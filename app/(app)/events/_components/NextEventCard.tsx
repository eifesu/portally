import { cn } from "@/lib/utils";
import { CalendarDays, Clock, MapPin } from "lucide-react";
import { EVENT_TYPE_CONFIG, ScheduleEvent } from "../_data/events";
import EventTypeBadge from "./EventTypeBadge";

interface NextEventCardProps {
  event: ScheduleEvent;
  compact?: boolean;
}

export default function NextEventCard({ event, compact }: NextEventCardProps) {
  const { border, iconBubble, typeIcon: Icon } = EVENT_TYPE_CONFIG[event.type];

  if (compact) {
    return (
      <div className={cn("rounded-md border-2 bg-card px-3 py-2.5 flex items-center gap-3", border)}>
        <div className={cn("rounded-md p-2 shrink-0", iconBubble)}>
          <Icon className="size-4" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold truncate">{event.title}</p>
          <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 mt-0.5">
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <CalendarDays className="size-3" />
              {event.date}
            </span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="size-3" />
              {event.time}
            </span>
            <span className="flex items-center gap-1 rounded-md bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
              <MapPin className="size-2.5" />
              {event.location}
            </span>
          </div>
        </div>
        <EventTypeBadge type={event.type} className="shrink-0" />
      </div>
    );
  }

  return (
    <div className={cn("rounded-md border-2 bg-card p-4 flex flex-col gap-3", border)}>
      <div className="flex items-start justify-between">
        <div className={cn("rounded-md p-2", iconBubble)}>
          <Icon className="size-5" />
        </div>
        <EventTypeBadge type={event.type} />
      </div>
      <p className="text-base font-bold leading-snug">{event.title}</p>
      <div className="flex flex-wrap gap-x-2 gap-y-1.5 text-sm text-muted-foreground">
        <span className="flex items-center gap-1">
          <CalendarDays className="size-3.5" />
          {event.date}
        </span>
        <span className="flex items-center gap-1">
          <Clock className="size-3.5" />
          {event.time}
        </span>
        <span className="flex items-center gap-1 rounded-md bg-muted px-2 py-0.5 text-xs font-medium">
          <MapPin className="size-3" />
          {event.location}
        </span>
      </div>
    </div>
  );
}
