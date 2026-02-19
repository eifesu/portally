"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Page from "@/shared/components/Page/Page";
import Typography from "@/shared/components/Typography";
import { useTranslations } from "@/lib/i18n/context";
import { savePin, hasPinSetup } from "@/lib/pin";
import { DEMO_MODE } from "@/lib/demo";

export default function SetupSecurity() {
  const router = useRouter();
  const t = useTranslations();

  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check if user already has PIN set up, redirect to home
    if (hasPinSetup()) {
      router.replace("/home");
    }
  }, [router]);

  if (!mounted) {
    return null;
  }

  async function handleCreatePin() {
    if (pin.length !== 4) {
      toast.error(t("pinTooShort"));
      return;
    }

    if (pin !== confirmPin) {
      toast.error(t("pinMismatch"));
      return;
    }

    setLoading(true);

    if (DEMO_MODE) {
      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    await savePin(pin);
    setLoading(false);

    toast.success(t("pinSuccess"));
    router.replace("/home");
  }

  return (
    <Page className="items-center justify-center text-center gap-2 px-4">
      <div className="w-16 h-16 rounded-md bg-primary/10 flex items-center justify-center mb-2">
        <Lock className="w-8 h-8 text-primary" />
      </div>

      <Typography variant="h3">{t("setupSecurity")}</Typography>

      <div className="mt-4 flex w-full max-w-sm flex-col items-center gap-3">
        <Typography variant="h4">{t("pinTitle")}</Typography>
        <Typography variant="body1" muted className="mb-2">
          {t("pinDescription")}
        </Typography>

        <div className="flex flex-col gap-2 w-full">
          <label className="text-xs text-muted-foreground text-left">
            {t("pinPlaceholder")}
          </label>
          <InputOTP
            maxLength={4}
            value={pin}
            onChange={setPin}
            pattern="[0-9]*"
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
            </InputOTPGroup>
          </InputOTP>
        </div>

        <div className="flex flex-col gap-2 w-full">
          <label className="text-xs text-muted-foreground text-left">
            {t("confirmPinPlaceholder")}
          </label>
          <InputOTP
            maxLength={4}
            value={confirmPin}
            onChange={setConfirmPin}
            pattern="[0-9]*"
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
            </InputOTPGroup>
          </InputOTP>
        </div>

        <Button
          onClick={handleCreatePin}
          disabled={loading || pin.length < 4 || confirmPin.length < 4}
          className="w-full"
        >
          {loading ? <Loader2 className="animate-spin" /> : t("createPin")}
        </Button>
      </div>
    </Page>
  );
}
