"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Calendar, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "@/lib/i18n/context";

export default function BottomTabs() {
  const pathname = usePathname();
  const t = useTranslations();

  const tabs = [
    { href: "/home", label: t("tabHome"), icon: Home },
    { href: "/payments", label: t("tabPayments"), icon: Wallet },
    { href: "/events", label: t("tabEvents"), icon: Calendar },
  ];

  return (
    <nav className="border-t border-border bg-background safe-bottom">
      <div className="flex">
        {tabs.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex flex-1 flex-col items-center gap-1 py-3 text-xs font-medium transition-colors",
                active ? "text-primary" : "text-muted-foreground"
              )}
            >
              <Icon className={cn("size-5", active ? "stroke-[2.5]" : "stroke-[1.5]")} />
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
