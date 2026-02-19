"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";
import { BedDouble, ChevronRight, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mockResidences } from "@/shared/mock";
import { formatAmount } from "@/app/(app)/payments/_data/payments";
import { useTranslations } from "@/lib/i18n/context";
import { useUser } from "@/lib/user-context";

interface IdCardProps {
  userId: string;
}

export default function IdCard({ userId }: IdCardProps) {
  const t = useTranslations();
  const { user, balance } = useUser();
  const { firstName, lastName, roomId } = user;
  const initials = `${firstName[0]}${lastName[0]}`;
  const shortId = userId.replace(/-/g, "").slice(0, 16).toUpperCase();
  const formattedId = shortId.match(/.{1,4}/g)?.join(" ") ?? shortId;

  const [expanded, setExpanded] = useState(false);

  // Find the residence and room details
  const housingInfo = useMemo(() => {
    if (!roomId) return null;

    for (const residence of mockResidences) {
      const room = residence.rooms.find((r) => r.id === roomId);
      if (room) {
        return { residence, room };
      }
    }
    return null;
  }, [roomId]);

  return (
    <>
      <Card className="py-0 gap-0 select-none">
        <CardContent className="p-3">
          <div className="flex items-center gap-3">
            <div className="size-9 shrink-0 rounded-md border border-border bg-muted flex items-center justify-center text-xs font-semibold tracking-wide">
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold leading-tight truncate">
                {firstName} {lastName}
              </p>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                {t("memberRole")}
              </p>
            </div>
            <Button
              variant="outline"
              size="icon-sm"
              className="shrink-0 size-auto p-1 rounded-md"
              onClick={() => setExpanded(true)}
            >
              <QRCodeSVG
                value={userId}
                size={200}
                bgColor="transparent"
                fgColor="currentColor"
                level="M"
              />
            </Button>
          </div>

          <div className="h-px w-full bg-border my-3" />

          <div className="flex items-baseline justify-between mb-1">
            <p className="text-[9px] font-semibold tracking-[0.2em] uppercase text-muted-foreground">
              {t("memberId")}
            </p>
            <p className="font-mono text-xs font-medium tracking-widest">
              {formattedId}
            </p>
          </div>

          <div className="flex items-baseline justify-between">
            <p className="text-[9px] font-semibold tracking-[0.2em] uppercase text-muted-foreground">
              {t("balance")}
            </p>
            <p className="font-mono text-xs font-medium tracking-widest">
              {formatAmount(balance)}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Housing Section */}
      {housingInfo ? (
        <Link
          href="/housing"
          className="block rounded-md border border-border bg-card p-3 hover:border-primary hover:bg-primary/5 transition-colors"
        >
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-start gap-2.5 flex-1 min-w-0">
              <div className="size-9 shrink-0 rounded-md bg-primary/10 flex items-center justify-center">
                <BedDouble className="size-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold leading-tight truncate">
                  {housingInfo.residence.name}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {t("roomLabel")} {housingInfo.room.label}
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <MapPin className="size-3 text-muted-foreground" />
                  <span className="text-[11px] text-muted-foreground">
                    {housingInfo.residence.distance}
                  </span>
                </div>
              </div>
            </div>
            <ChevronRight className="size-4 text-muted-foreground shrink-0 mt-2.5" />
          </div>
        </Link>
      ) : (
        <Link
          href="/housing"
          className="block rounded-md border-2 border-dashed border-border bg-muted/50 p-4 hover:border-primary hover:bg-primary/5 transition-colors"
        >
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="size-10 rounded-md bg-primary/10 flex items-center justify-center">
              <BedDouble className="size-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold">{t("selectHousing")}</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {t("availableResidences")}
              </p>
            </div>
          </div>
        </Link>
      )}

      {expanded && (
        <button
          type="button"
          onClick={() => setExpanded(false)}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-6 bg-background/95 backdrop-blur-sm"
        >
          <Card className="py-0">
            <CardContent className="p-5">
              <QRCodeSVG
                value={userId}
                size={220}
                bgColor="transparent"
                fgColor="currentColor"
                level="M"
              />
            </CardContent>
          </Card>
          <div className="text-center">
            <p className="text-sm font-semibold">
              {firstName} {lastName}
            </p>
            <p className="font-mono text-xs text-muted-foreground mt-1 tracking-widest">
              {formattedId}
            </p>
          </div>
          <p className="text-xs text-muted-foreground">{t("tapToClose")}</p>
        </button>
      )}
    </>
  );
}
