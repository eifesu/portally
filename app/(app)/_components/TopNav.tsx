"use client";

import Image from "next/image";
import Link from "next/link";
import { LogOut, Globe } from "lucide-react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { useLocale, useTranslations } from "@/lib/i18n/context";

export default function TopNav() {
  const router = useRouter();
  const { locale, setLocale } = useLocale();
  const t = useTranslations();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background flex items-center justify-between px-4 py-4">
      <Link href="/home" className="flex items-center">
        <Image
          src="/portally.svg"
          alt="Portally"
          width={24}
          height={24}
          priority
        />
      </Link>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setLocale(locale === "en" ? "fr" : "en")}
        >
          <Globe className="size-4" />
          {locale === "en" ? "French" : "English"}
        </Button>
        <Button onClick={handleLogout} variant="secondary" size="sm">
          <LogOut className="size-4" />
          {t("logout")}
        </Button>
      </div>
    </header>
  );
}
