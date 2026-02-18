import { cn } from "@/lib/utils";
import { MapPin } from "lucide-react";
import { EVENT_TYPE_CONFIG, ScheduleEvent } from "../_data/events";
import EventTypeBadge from "./EventTypeBadge";

interface EventRowProps {
  event: ScheduleEvent;
}

export default function EventRow({ event }: EventRowProps) {
  const { iconBubble, typeIcon: Icon } = EVENT_TYPE_CONFIG[event.type];

  return (
    <div className="rounded-md border border-border bg-card px-3 py-2.5 flex items-center gap-3">
      <div className={cn("rounded-md p-2 shrink-0", iconBubble)}>
        <Icon className="size-4" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold truncate">{event.title}</p>
        <p className="text-xs text-muted-foreground">
          {event.date} · {event.time}
        </p>
        <span className="inline-flex items-center gap-1 rounded-md bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground mt-1">
          <MapPin className="size-2.5 shrink-0" />
          {event.location}
        </span>
      </div>
      <EventTypeBadge type={event.type} className="shrink-0" />
    </div>
  );
}
