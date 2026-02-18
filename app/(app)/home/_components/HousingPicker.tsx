"use client";

import { useState } from "react";
import { toast } from "sonner";
import { ArrowLeft, Search } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { mockResidences, type Residence } from "@/shared/mock";
import { cn } from "@/lib/utils";
import { useTranslations } from "@/lib/i18n/context";
import { confirmWithBiometrics } from "@/lib/webauthn";

interface HousingPickerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (roomId: string) => void;
}

export default function HousingPicker({
  open,
  onOpenChange,
  onSelect,
}: HousingPickerProps) {
  const t = useTranslations();
  const [step, setStep] = useState<"residence" | "room">("residence");
  const [query, setQuery] = useState("");
  const [selectedResidence, setSelectedResidence] = useState<Residence | null>(null);

  function handleOpenChange(next: boolean) {
    onOpenChange(next);
    if (!next) {
      setStep("residence");
      setQuery("");
      setSelectedResidence(null);
    }
  }

  function pickResidence(residence: Residence) {
    setSelectedResidence(residence);
    setQuery("");
    setStep("room");
  }

  async function pickRoom(roomId: string) {
    const ok = await confirmWithBiometrics();
    if (!ok) { toast.error(t("biometricError")); return; }
    onSelect(roomId);
    handleOpenChange(false);
  }

  const filteredResidences = mockResidences.filter((r) =>
    r.name.toLowerCase().includes(query.toLowerCase())
  );

  const filteredRooms =
    selectedResidence?.rooms.filter((r) =>
      r.label.toLowerCase().includes(query.toLowerCase())
    ) ?? [];

  return (
    <Drawer open={open} onOpenChange={handleOpenChange}>
      <DrawerContent>
        <DrawerHeader className="text-left pb-0">
          <div className="flex items-center gap-2">
            {step === "room" && (
              <button
                type="button"
                onClick={() => { setStep("residence"); setQuery(""); }}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="size-4" />
              </button>
            )}
            <div>
              <DrawerTitle className="text-sm">
                {step === "residence" ? t("selectResidence") : selectedResidence?.name}
              </DrawerTitle>
              {step === "room" && (
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  {t("selectRoom")}
                </p>
              )}
            </div>
          </div>
        </DrawerHeader>

        <div className="p-4 flex flex-col gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
            <Input
              className="pl-8 h-9 text-sm"
              placeholder={step === "residence" ? t("searchResidence") : t("searchRoom")}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <ul className="flex flex-col divide-y divide-border">
            {step === "residence"
              ? filteredResidences.map((residence) => (
                  <li key={residence.id}>
                    <button
                      type="button"
                      onClick={() => pickResidence(residence)}
                      className="w-full flex items-center justify-between py-3 text-sm text-left hover:text-primary transition-colors"
                    >
                      <span>{residence.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {residence.rooms.length} {t("rooms")}
                      </span>
                    </button>
                  </li>
                ))
              : filteredRooms.map((room) => (
                  <li key={room.id}>
                    <button
                      type="button"
                      onClick={() => pickRoom(room.id)}
                      className={cn(
                        "w-full flex items-center justify-between py-3 text-sm text-left transition-colors",
                        "hover:text-primary"
                      )}
                    >
                      <span>{t("roomLabel")} {room.label}</span>
                      <span className="font-mono text-xs text-muted-foreground">{room.id}</span>
                    </button>
                  </li>
                ))}

            {(step === "residence" ? filteredResidences : filteredRooms).length === 0 && (
              <li className="py-6 text-center text-sm text-muted-foreground">
                {t("noResults")}
              </li>
            )}
          </ul>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
