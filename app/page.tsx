"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Page from "@/shared/components/Page/Page";
import Typography from "@/shared/components/Typography";
import { createClient } from "@/lib/supabase/client";
import { getFlag, getCountryCode } from "@/lib/phone";
import { useLocale, useTranslations } from "@/lib/i18n/context";
import { cn } from "@/lib/utils";
import { DEMO_MODE } from "@/lib/demo";

const supabase = createClient();

export default function Home() {
  const router = useRouter();
  const { locale, setLocale } = useLocale();
  const t = useTranslations();

  const [step, setStep] = useState<"phone" | "otp">("phone");

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) router.replace("/home");
    });
  }, [router]);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const flag = getFlag(phone);
  const countryCode = getCountryCode(phone);
  const prefixRef = useRef<HTMLDivElement>(null);
  const [prefixWidth, setPrefixWidth] = useState(0);

  useEffect(() => {
    if (prefixRef.current) {
      setPrefixWidth(prefixRef.current.offsetWidth);
    } else {
      setPrefixWidth(0);
    }
  }, [flag, countryCode]);

  async function handleSendOtp() {
    const formatted = phone.startsWith("+") ? phone : "+" + phone;
    setLoading(true);

    if (DEMO_MODE) {
      setLoading(false);
      toast.success(t("codeSent"));
      setStep("otp");
      return;
    }

    const { error } = await supabase.auth.signInWithOtp({
      phone: formatted,
      options: { channel: "sms" },
    });
    setLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success(t("codeSent"));
    setStep("otp");
  }

  async function handleVerifyOtp() {
    const formatted = phone.startsWith("+") ? phone : "+" + phone;
    setLoading(true);

    if (DEMO_MODE) {
      setLoading(false);
      toast.success(t("loggedIn"));
      router.replace("/home");
      return;
    }

    const { error } = await supabase.auth.verifyOtp({
      phone: formatted,
      token: otp,
      type: "sms",
    });
    setLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success(t("loggedIn"));
    router.replace("/home");
  }

  return (
    <Page className="items-center justify-center text-center gap-2">
      <button
        type="button"
        className="absolute top-4 right-4 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        onClick={() => setLocale(locale === "en" ? "fr" : "en")}
      >
        {locale === "en" ? "FR" : "EN"}
      </button>

      <Image
        src="/portally.svg"
        alt="Portally"
        className="mb-2"
        width={48}
        height={48}
      />
      <Typography variant="h3">{t("title")}</Typography>
      <Typography variant="body1" muted>
        {t("subtitle")}
      </Typography>

      {step === "phone" ? (
        <div className="mt-4 flex w-full max-w-sm flex-col gap-3">
          <div className="relative w-full">
            {flag && (
              <div
                ref={prefixRef}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5"
              >
                <span className="text-lg leading-none">{flag}</span>
                <span className="text-xs text-muted-foreground">
                  {countryCode}
                </span>
                <span className="ml-0.5 h-4 border-r border-dashed border-border" />
              </div>
            )}
            <Input
              type="tel"
              style={
                prefixWidth
                  ? { paddingLeft: `calc(${prefixWidth}px + 1.25rem)` }
                  : undefined
              }
              className="placeholder:opacity-40"
              placeholder="+225 05 05 20 15 15"
              value={phone}
              onChange={(e) => {
                const digits = e.target.value.replace(/[^0-9]/g, "");
                setPhone(digits);
              }}
            />
          </div>
          <Button
            onClick={handleSendOtp}
            disabled={loading || phone.length < 4}
          >
            {loading ? <Loader2 className="animate-spin" /> : t("sendCode")}
          </Button>
        </div>
      ) : (
        <div className="mt-4 flex w-full max-w-sm flex-col items-center gap-3">
          <InputOTP maxLength={6} value={otp} onChange={setOtp}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          <Button
            onClick={handleVerifyOtp}
            disabled={loading || otp.length < 6}
          >
            {loading ? <Loader2 className="animate-spin" /> : t("verify")}
          </Button>
          <button
            type="button"
            className="text-sm text-muted-foreground underline"
            onClick={() => {
              setStep("phone");
              setOtp("");
            }}
          >
            {t("changeNumber")}
          </button>
        </div>
      )}
    </Page>
  );
}
