import Link from "next/link";
import Page from "@/shared/components/Page/Page";
import Typography from "@/shared/components/Typography";
import { getTranslations } from "@/lib/i18n/server";
import { EVENTS } from "./_data/events";
import NextEventCard from "./_components/NextEventCard";
import EventRow from "./_components/EventRow";

export default async function EventsPage() {
  const t = await getTranslations();
  const [nextUp, ...upcoming] = EVENTS;

  return (
    <Page className="gap-5 pt-6 overflow-y-auto">
      <Typography variant="h3">{t("events")}</Typography>

      <section className="flex flex-col gap-2">
        <SectionLabel>{t("upNext")}</SectionLabel>
        <Link href={`/events/${nextUp.id}`}>
          <NextEventCard event={nextUp} />
        </Link>
      </section>

      <section className="flex flex-col gap-2">
        <SectionLabel>{t("upcoming")}</SectionLabel>
        <div className="flex flex-col gap-2">
          {upcoming.map((event) => (
            <Link key={event.id} href={`/events/${event.id}`}>
              <EventRow event={event} />
            </Link>
          ))}
        </div>
      </section>
    </Page>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <Typography
      variant="body1"
      muted
      className="font-semibold uppercase tracking-widest text-xs"
    >
      {children}
    </Typography>
  );
}
