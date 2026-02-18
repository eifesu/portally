import Link from "next/link";
import { ArrowUpRight, ArrowDownLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import Page from "@/shared/components/Page/Page";
import Typography from "@/shared/components/Typography";
import { cn } from "@/lib/utils";
import IdCard from "./_components/IdCard";
import NextEventCard from "../events/_components/NextEventCard";
import { EVENTS } from "../events/_data/events";
import { MOCK_TRANSACTIONS, formatAmount } from "../payments/_data/payments";

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
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const nextEvent = EVENTS[0];
  const recentTx = MOCK_TRANSACTIONS.slice(0, 3);

  return (
    <Page className="gap-4 pt-6">
      <IdCard userId={user!.id} />

      <section className="flex flex-col gap-2">
        <SectionLabel>Prochain événement</SectionLabel>
        <Link href={`/events/${nextEvent.id}`}>
          <NextEventCard event={nextEvent} compact />
        </Link>
      </section>

      <section className="flex flex-col gap-2">
        <SectionLabel>Dernières transactions</SectionLabel>
        <div className="flex flex-col gap-2">
          {recentTx.map((tx) => (
            <div
              key={tx.id}
              className="rounded-md border border-border bg-card px-3 py-2.5 flex items-center gap-3"
            >
              <div
                className={cn(
                  "rounded-md p-2 shrink-0",
                  tx.type === "received"
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-500"
                )}
              >
                {tx.type === "received" ? (
                  <ArrowDownLeft className="size-4" />
                ) : (
                  <ArrowUpRight className="size-4" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate">{tx.name}</p>
                <p className="text-xs text-muted-foreground">{tx.date}</p>
              </div>
              <p
                className={cn(
                  "text-sm font-semibold tabular-nums shrink-0",
                  tx.type === "received" ? "text-green-600" : "text-foreground"
                )}
              >
                {tx.type === "received" ? "+" : "−"}
                {formatAmount(tx.amount)}
              </p>
            </div>
          ))}
        </div>
      </section>
    </Page>
  );
}
