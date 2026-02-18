"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { QRCodeSVG } from "qrcode.react";
import { ScanQrCode, ArrowUpRight, ArrowDownLeft } from "lucide-react";
import Page from "@/shared/components/Page/Page";
import Typography from "@/shared/components/Typography";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTranslations } from "@/lib/i18n/context";
import {
  MOCK_BALANCE,
  MOCK_TRANSACTIONS,
  Transaction,
  resolveName,
} from "../_data/payments";
import SendMoneySheet from "./SendMoneySheet";

const QrScanner = dynamic(() => import("./QrScanner"), { ssr: false });

interface PaymentsViewProps {
  userId: string;
}

export default function PaymentsView({ userId }: PaymentsViewProps) {
  const t = useTranslations();
  const [balance, setBalance] = useState(MOCK_BALANCE);
  const [transactions, setTransactions] = useState<Transaction[]>(MOCK_TRANSACTIONS);
  const [scannerOpen, setScannerOpen] = useState(false);
  const [recipient, setRecipient] = useState<string | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  function handleScan(value: string) {
    setScannerOpen(false);
    setRecipient(resolveName(value));
    setSheetOpen(true);
  }

  function handleConfirm(amount: number) {
    const name = recipient!;
    setBalance((b) => b - amount);
    setTransactions((prev) => [
      { id: `t-${Date.now()}`, type: "sent", name, amount, date: t("now") },
      ...prev,
    ]);
    setSheetOpen(false);
    setRecipient(null);
  }

  return (
    <>
      <Page className="gap-5 pt-6 overflow-y-auto">
        <div className="rounded-md bg-primary text-primary-foreground p-4 flex items-center gap-4">
          <div className="flex-1 flex flex-col gap-0.5">
            <p className="text-xs font-semibold uppercase tracking-widest opacity-70">
              {t("availableBalance")}
            </p>
            <p className="text-3xl font-bold tabular-nums">
              {new Intl.NumberFormat("fr-FR").format(balance)}
            </p>
            <p className="text-sm opacity-70">FCFA</p>
          </div>
          <div className="rounded-md bg-primary-foreground/10 p-2 shrink-0">
            <QRCodeSVG value={userId} size={64} bgColor="transparent" fgColor="currentColor" level="M" />
          </div>
        </div>

        <Button size="lg" className="w-full gap-2" onClick={() => setScannerOpen(true)}>
          <ScanQrCode className="size-5" />
          {t("scanAndPay")}
        </Button>

        <section className="flex flex-col gap-2">
          <Typography variant="body1" muted className="font-semibold uppercase tracking-widest text-xs">
            {t("recentTransactions")}
          </Typography>
          <div className="flex flex-col gap-2">
            {transactions.map((tx) => (
              <div key={tx.id} className="rounded-md border border-border bg-card px-3 py-2.5 flex items-center gap-3">
                <div className={cn("rounded-md p-2 shrink-0", tx.type === "received" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-500")}>
                  {tx.type === "received" ? <ArrowDownLeft className="size-4" /> : <ArrowUpRight className="size-4" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate">{tx.name}</p>
                  <p className="text-xs text-muted-foreground">{tx.date}</p>
                </div>
                <p className={cn("text-sm font-semibold tabular-nums shrink-0", tx.type === "received" ? "text-green-600" : "text-foreground")}>
                  {tx.type === "received" ? "+" : "−"}
                  {new Intl.NumberFormat("fr-FR").format(tx.amount)}
                </p>
              </div>
            ))}
          </div>
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
