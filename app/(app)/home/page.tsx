import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getTranslations } from "@/lib/i18n/server";
import Page from "@/shared/components/Page/Page";
import Typography from "@/shared/components/Typography";
import IdCard from "./_components/IdCard";
import TransactionsList from "./_components/TransactionsList";
import NextEventCard from "../events/_components/NextEventCard";
import { EVENTS } from "../events/_data/events";
import { DEMO_MODE, DEMO_USER_ID } from "@/lib/demo";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <Typography
      variant="body1"
      muted
      className="font-semibold uppercase tracking-widest text-[10px]"
    >
      {children}
    </Typography>
  );
}

export default async function HomePage() {
  const t = await getTranslations();
  let userId = DEMO_USER_ID;

  if (!DEMO_MODE) {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    userId = user!.id;
  }

  const nextEvent = EVENTS[0];

  return (
    <Page className="gap-4 pt-6">
      <IdCard userId={userId} />

      <section className="flex flex-col gap-2">
        <SectionLabel>{t("nextEvent")}</SectionLabel>
        <Link href={`/events/${nextEvent.id}`}>
          <NextEventCard event={nextEvent} compact />
        </Link>
      </section>

      <section className="flex flex-col gap-2">
        <SectionLabel>{t("latestTransactions")}</SectionLabel>
        <TransactionsList />
      </section>
    </Page>
  );
}
