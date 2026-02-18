"use client";

import { cn } from "@/lib/utils";
import { useTranslations } from "@/lib/i18n/context";
import { EVENT_TYPE_CONFIG, EventType } from "../_data/events";

interface EventTypeBadgeProps {
  type: EventType;
  className?: string;
}

export default function EventTypeBadge({ type, className }: EventTypeBadgeProps) {
  const t = useTranslations();
  const { badge, typeIcon: TypeIcon } = EVENT_TYPE_CONFIG[type];
  const label = t(type === "formation" ? "eventFormation" : "eventCamaraderie");

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
