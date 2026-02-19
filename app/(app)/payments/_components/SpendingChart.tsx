"use client";

import { useMemo } from "react";
import { Transaction } from "../_data/payments";
import { useTranslations } from "@/lib/i18n/context";
import Typography from "@/shared/components/Typography";

interface SpendingChartProps {
  transactions: Transaction[];
}

export default function SpendingChart({ transactions }: SpendingChartProps) {
  const t = useTranslations();

  // Calculate daily spending for the last 7 days
  const dailyData = useMemo(() => {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const data: { day: string; amount: number }[] = [];

    // Group transactions by day (simplified for demo)
    const dayGroups: Record<string, number> = {};

    transactions.forEach((tx) => {
      if (tx.type === "sent") {
        const day = tx.date.substring(0, 3) || "Today";
        dayGroups[day] = (dayGroups[day] || 0) + tx.amount;
      }
    });

    // Create data for last 7 days (simplified demo)
    const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const amounts = [
      3000, // Mon
      4500, // Tue
      2800, // Wed
      6500, // Thu (20 fév)
      9500, // Fri (21 fév - Cocktails + Lunch)
      0, // Sat
      5500, // Sun (Today - Lunch + Drinks)
    ];

    return labels.map((label, i) => ({
      day: label,
      amount: amounts[i],
    }));
  }, [transactions]);

  const maxAmount = Math.max(...dailyData.map((d) => d.amount));
  const totalSpent = dailyData.reduce((sum, d) => sum + d.amount, 0);

  return (
    <div className="rounded-md border border-border bg-card p-4">
      <div className="flex items-baseline justify-between mb-4">
        <Typography variant="h4">{t("spendingOverview")}</Typography>
        <span className="text-xs text-muted-foreground">{t("last7Days")}</span>
      </div>

      {/* Chart */}
      <div className="flex items-end justify-between gap-1 h-32 mb-3">
        {dailyData.map((data, i) => {
          const height = maxAmount > 0 ? (data.amount / maxAmount) * 100 : 0;
          return (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full flex flex-col justify-end h-full">
                <div
                  className="w-full rounded-t-sm bg-primary/20 hover:bg-primary/30 transition-colors"
                  style={{ height: `${height}%` }}
                />
              </div>
              <span className="text-[10px] text-muted-foreground font-medium">
                {data.day}
              </span>
            </div>
          );
        })}
      </div>

      {/* Total */}
      <div className="pt-3 border-t border-border flex items-baseline justify-between">
        <span className="text-xs text-muted-foreground">
          {t("totalSpent")}
        </span>
        <span className="text-sm font-semibold tabular-nums">
          {new Intl.NumberFormat("fr-FR").format(totalSpent)} FCFA
        </span>
      </div>
    </div>
  );
}
