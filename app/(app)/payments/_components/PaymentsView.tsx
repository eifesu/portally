"use client";

import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { ScanQrCode, ArrowUpRight, ArrowDownLeft, Search } from "lucide-react";
import Page from "@/shared/components/Page/Page";
import Typography from "@/shared/components/Typography";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useTranslations } from "@/lib/i18n/context";
import { useUser } from "@/lib/user-context";
import { resolveName } from "../_data/payments";
import SendMoneySheet from "./SendMoneySheet";
import SpendingChart from "./SpendingChart";

const QrScanner = dynamic(() => import("./QrScanner"), { ssr: false });

interface PaymentsViewProps {
  userId: string;
}

export default function PaymentsView({ userId }: PaymentsViewProps) {
  const t = useTranslations();
  const { balance, transactions, updateBalance, addTransaction } = useUser();
  const [scannerOpen, setScannerOpen] = useState(false);
  const [recipient, setRecipient] = useState<string | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  function handleScan(value: string) {
    setScannerOpen(false);
    setRecipient(resolveName(value));
    setSheetOpen(true);
  }

  function handleConfirm(amount: number) {
    const name = recipient!;
    updateBalance(-amount);
    addTransaction({
      type: "sent",
      name,
      amount,
      date: t("now"),
    });
    setSheetOpen(false);
    setRecipient(null);
  }

  // Filter transactions based on search query
  const filteredTransactions = useMemo(() => {
    if (!searchQuery.trim()) return transactions;

    const query = searchQuery.toLowerCase();
    return transactions.filter(
      (tx) =>
        tx.name.toLowerCase().includes(query) ||
        tx.amount.toString().includes(query) ||
        tx.date.toLowerCase().includes(query)
    );
  }, [transactions, searchQuery]);

  return (
    <>
      <Page className="gap-4 pt-4 overflow-y-auto">
        {/* Balance Card */}
        <div className="rounded-md bg-primary text-primary-foreground p-5">
          <p className="text-xs font-semibold uppercase tracking-widest opacity-70">
            {t("availableBalance")}
          </p>
          <p className="text-4xl font-bold tabular-nums mt-1">
            {new Intl.NumberFormat("fr-FR").format(balance)}
          </p>
          <p className="text-sm opacity-70 mt-0.5">FCFA</p>
        </div>

        {/* Scan & Pay Button */}
        <Button
          size="lg"
          className="w-full gap-2"
          onClick={() => setScannerOpen(true)}
        >
          <ScanQrCode className="size-5" />
          {t("scanAndPay")}
        </Button>

        {/* Spending Chart */}
        <SpendingChart transactions={transactions} />

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder={t("searchTransactions")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Transactions List */}
        <section className="flex flex-col gap-3">
          <Typography
            variant="body1"
            muted
            className="font-semibold uppercase tracking-widest text-xs"
          >
            {t("recentTransactions")}
          </Typography>

          {filteredTransactions.length > 0 ? (
            <div className="flex flex-col gap-2">
              {filteredTransactions.map((tx) => (
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
                    {new Intl.NumberFormat("fr-FR").format(tx.amount)}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-md border border-dashed border-border bg-muted/50 p-8 text-center">
              <p className="text-sm text-muted-foreground">
                {t("noTransactionsFound")}
              </p>
            </div>
          )}
        </section>
      </Page>

      {scannerOpen && (
        <QrScanner onScan={handleScan} onClose={() => setScannerOpen(false)} />
      )}

      <SendMoneySheet
        open={sheetOpen}
        recipientName={recipient ?? ""}
        balance={balance}
        onConfirm={handleConfirm}
        onClose={() => setSheetOpen(false)}
      />
    </>
  );
}
