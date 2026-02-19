"use client";

import { ArrowUpRight, ArrowDownLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatAmount } from "@/app/(app)/payments/_data/payments";
import { useUser } from "@/lib/user-context";

export default function TransactionsList() {
  const { transactions } = useUser();
  const recentTx = transactions.slice(0, 3);

  return (
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
                ? "bg-green-100 text-green-600 dark:bg-green-950 dark:text-green-400"
                : "bg-red-100 text-red-500 dark:bg-red-950 dark:text-red-400"
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
              tx.type === "received"
                ? "text-green-600 dark:text-green-400"
                : "text-foreground"
            )}
          >
            {tx.type === "received" ? "+" : "−"}
            {formatAmount(tx.amount)}
          </p>
        </div>
      ))}
    </div>
  );
}
