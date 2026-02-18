"use client";

import { useState } from "react";
import { Drawer, DrawerContent, DrawerTitle } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { useTranslations } from "@/lib/i18n/context";
import { formatAmount } from "../_data/payments";

interface SendMoneySheetProps {
  open: boolean;
  recipientName: string;
  balance: number;
  onConfirm: (amount: number) => void;
  onClose: () => void;
}

export default function SendMoneySheet({
  open,
  recipientName,
  balance,
  onConfirm,
  onClose,
}: SendMoneySheetProps) {
  const t = useTranslations();
  const [raw, setRaw] = useState("");

  const amount = parseInt(raw.replace(/\D/g, ""), 10) || 0;
  const insufficient = amount > balance;
  const invalid = amount <= 0;

  function handleConfirm() {
    if (invalid || insufficient) return;
    onConfirm(amount);
    setRaw("");
  }

  function handleClose() {
    setRaw("");
    onClose();
  }

  const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "000", "0", "⌫"];

  function pressKey(key: string) {
    if (key === "⌫") {
      setRaw((p) => p.slice(0, -1));
    } else {
      setRaw((p) => (p + key).replace(/^0+/, "") || "");
    }
  }

  return (
    <Drawer open={open} onOpenChange={(v) => !v && handleClose()}>
      <DrawerContent className="px-4 pb-8 gap-5">
        <DrawerTitle className="text-center">
          {t("sendTo")}{" "}
          <span className="text-primary">{recipientName}</span>
        </DrawerTitle>

        <div className="text-center">
          <p className={`text-4xl font-bold tabular-nums transition-colors ${insufficient ? "text-destructive" : ""}`}>
            {amount > 0 ? new Intl.NumberFormat("fr-FR").format(amount) : "0"}
          </p>
          <p className="text-sm text-muted-foreground mt-1">FCFA</p>
          {insufficient && (
            <p className="text-xs text-destructive mt-1">{t("insufficientBalance")}</p>
          )}
        </div>

        <div className="grid grid-cols-3 gap-2">
          {keys.map((k) => (
            <button
              key={k}
              onClick={() => pressKey(k)}
              className="h-12 rounded-md bg-muted text-sm font-semibold active:bg-muted/60 transition-colors"
            >
              {k}
            </button>
          ))}
        </div>

        <div className="text-center text-xs text-muted-foreground">
          {t("availableBalance")} : {formatAmount(balance)}
        </div>

        <Button className="w-full" disabled={invalid || insufficient} onClick={handleConfirm}>
          {t("confirmSend")}
        </Button>
      </DrawerContent>
    </Drawer>
  );
}
