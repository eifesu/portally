"use client";

import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { BedDouble } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mockUser } from "@/shared/mock";
import {
  MOCK_BALANCE,
  formatAmount,
} from "@/app/(app)/payments/_data/payments";
import HousingPicker from "./HousingPicker";

interface IdCardProps {
  userId: string;
}

export default function IdCard({ userId }: IdCardProps) {
  const { firstName, lastName } = mockUser;
  const initials = `${firstName[0]}${lastName[0]}`;
  const shortId = userId.replace(/-/g, "").slice(0, 16).toUpperCase();
  const formattedId = shortId.match(/.{1,4}/g)?.join(" ") ?? shortId;

  const [expanded, setExpanded] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [roomId, setRoomId] = useState<string | null>(mockUser.roomId);

  return (
    <>
      <Card className="py-0 gap-0 select-none">
        <CardContent className="p-3">
          {/* Avatar + name + QR */}
          <div className="flex items-center gap-3">
            <div className="size-9 shrink-0 rounded-md border border-border bg-muted flex items-center justify-center text-xs font-semibold tracking-wide">
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold leading-tight truncate">
                {firstName} {lastName}
              </p>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                Rotaract Member
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

          {/* ID row */}
          <div className="flex items-baseline justify-between mb-1">
            <p className="text-[9px] font-semibold tracking-[0.2em] uppercase text-muted-foreground">
              Member ID
            </p>
            <p className="font-mono text-xs font-medium tracking-widest">
              {formattedId}
            </p>
          </div>

          {/* Balance row */}
          <div className="flex items-baseline justify-between">
            <p className="text-[9px] font-semibold tracking-[0.2em] uppercase text-muted-foreground">
              Solde
            </p>
            <p className="font-mono text-xs font-medium tracking-widest">
              {formatAmount(MOCK_BALANCE)}
            </p>
          </div>

          {/* Housing row */}
          {roomId ? (
            <>
              <div className="h-px w-full bg-border my-3" />
              <button
                type="button"
                className="w-full flex items-baseline justify-between"
                onClick={() => setPickerOpen(true)}
              >
                <p className="text-[9px] font-semibold tracking-[0.2em] uppercase text-muted-foreground">
                  Room
                </p>
                <p className="font-mono text-xs font-medium tracking-widest">
                  {roomId}
                </p>
              </button>
            </>
          ) : (
            <Button
              variant="default"
              className="mt-3 w-full border-dashed justify-between"
              onClick={() => setPickerOpen(true)}
            >
              Select your housing
              <BedDouble />
            </Button>
          )}
        </CardContent>
      </Card>

      <HousingPicker
        open={pickerOpen}
        onOpenChange={setPickerOpen}
        onSelect={setRoomId}
      />

      {/* Fullscreen QR overlay */}
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
          <p className="text-xs text-muted-foreground">Tap to close</p>
        </button>
      )}
    </>
  );
}
