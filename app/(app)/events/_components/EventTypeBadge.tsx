import { cn } from "@/lib/utils";
import { EVENT_TYPE_CONFIG, EventType } from "../_data/events";

interface EventTypeBadgeProps {
  type: EventType;
  className?: string;
}

export default function EventTypeBadge({
  type,
  className,
}: EventTypeBadgeProps) {
  const { label, badge, typeIcon: TypeIcon } = EVENT_TYPE_CONFIG[type];

  return (
    <span
      className={cn(
        "flex items-center gap-1 rounded-md px-2.5 py-1 text-[10px] font-semibold",
        badge,
        className,
      )}
    >
      <TypeIcon className="size-3" />
      {label}
    </span>
  );
}
