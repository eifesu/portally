import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  Clock,
  MapPin,
  FileText,
  FileArchive,
  Image as ImageIcon,
  Download,
} from "lucide-react";
import Page from "@/shared/components/Page/Page";
import Typography from "@/shared/components/Typography";
import { cn } from "@/lib/utils";
import { EVENTS, EVENT_TYPE_CONFIG, Attachment } from "../_data/events";
import EventTypeBadge from "../_components/EventTypeBadge";

interface EventDetailPageProps {
  params: Promise<{ id: string }>;
}

function attachmentIcon(mimeType: Attachment["mimeType"]) {
  if (mimeType === "application/pdf") return FileText;
  if (mimeType === "application/zip") return FileArchive;
  return ImageIcon;
}

function formatSize(kb: number) {
  if (kb >= 1000) return `${(kb / 1000).toFixed(1)} Mo`;
  return `${kb} Ko`;
}

export default async function EventDetailPage({
  params,
}: EventDetailPageProps) {
  const { id } = await params;
  const event = EVENTS.find((e) => e.id === id);
  if (!event) notFound();

  const { border, iconBubble, typeIcon: Icon } = EVENT_TYPE_CONFIG[event.type];

  return (
    <Page className="gap-5 pt-6 overflow-y-auto">
      <Link
        href="/events"
        className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors w-fit"
      >
        <ArrowLeft className="size-4" />
        Événements
      </Link>

      <div className={cn("rounded-md border-2 bg-card p-4 flex flex-col gap-3", border)}>
        <div className="flex items-start justify-between">
          <div className={cn("rounded-md p-2", iconBubble)}>
            <Icon className="size-5" />
          </div>
          <EventTypeBadge type={event.type} />
        </div>
        <Typography variant="h4">{event.title}</Typography>
        <p className="text-sm text-muted-foreground leading-relaxed">{event.description}</p>
        <div className="flex flex-col gap-1.5 text-sm text-muted-foreground">
          <span className="flex items-center gap-2">
            <CalendarDays className="size-4 shrink-0" />
            {event.date}
          </span>
          <span className="flex items-center gap-2">
            <Clock className="size-4 shrink-0" />
            {event.time}
          </span>
          <span className="inline-flex items-center gap-1 rounded-md bg-muted px-2.5 py-1 text-xs font-medium w-fit">
            <MapPin className="size-3 shrink-0" />
            {event.location}
          </span>
        </div>
      </div>

      {event.attachments && event.attachments.length > 0 && (
        <section className="flex flex-col gap-2">
          <Typography
            variant="body1"
            muted
            className="font-semibold uppercase tracking-widest text-xs"
          >
            Pièces jointes
          </Typography>
          <div className="flex flex-col gap-2">
            {event.attachments.map((attachment) => {
              const FileIcon = attachmentIcon(attachment.mimeType);
              return (
                <a
                  key={attachment.url}
                  href={attachment.url}
                  download={attachment.name}
                  className="rounded-md border border-border bg-card px-3 py-2.5 flex items-center gap-3 hover:bg-muted transition-colors"
                >
                  <div className="rounded-md p-2 bg-muted shrink-0">
                    <FileIcon className="size-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{attachment.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatSize(attachment.sizeKb)}
                    </p>
                  </div>
                  <Download className="size-4 text-muted-foreground shrink-0" />
                </a>
              );
            })}
          </div>
        </section>
      )}
    </Page>
  );
}
