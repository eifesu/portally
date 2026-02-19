"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { useTranslations } from "@/lib/i18n/context";
import { verifyPin } from "@/lib/pin";
import { Loader2 } from "lucide-react";

interface PinVerificationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onVerified: () => void;
}

export function PinVerificationDialog({
  open,
  onOpenChange,
  onVerified,
}: PinVerificationDialogProps) {
  const t = useTranslations();
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleVerify() {
    setLoading(true);
    const isValid = await verifyPin(pin);
    setLoading(false);

    if (isValid) {
      setPin("");
      onVerified();
      onOpenChange(false);
    } else {
      toast.error(t("pinIncorrect"));
      setPin("");
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t("enterPin")}</DialogTitle>
          <DialogDescription>{t("pinDescription")}</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center gap-4 py-4">
          <InputOTP
            maxLength={4}
            value={pin}
            onChange={setPin}
            pattern="[0-9]*"
            autoFocus
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
            </InputOTPGroup>
          </InputOTP>

          <Button
            onClick={handleVerify}
            disabled={pin.length !== 4 || loading}
            className="w-full"
          >
            {loading ? <Loader2 className="animate-spin" /> : t("verify")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
