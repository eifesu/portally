"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "sonner";
import {
  ArrowLeft,
  Star,
  MapPin,
  Check,
  Users,
  X,
  Loader2,
} from "lucide-react";
import Page from "@/shared/components/Page/Page";
import Typography from "@/shared/components/Typography";
import { Button } from "@/components/ui/button";
import { mockResidences, type Room } from "@/shared/mock";
import { useTranslations } from "@/lib/i18n/context";
import { useVerifyAction } from "@/lib/use-verify-action";
import { useUser } from "@/lib/user-context";
import { cn } from "@/lib/utils";

export default function ResidenceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const t = useTranslations();
  const { verifyAction, PinDialog } = useVerifyAction();
  const { setRoomId } = useUser();

  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [confirming, setConfirming] = useState(false);

  const residence = mockResidences.find((r) => r.id === params.residenceId);

  if (!residence) {
    return (
      <Page className="items-center justify-center">
        <Typography variant="h3">Residence not found</Typography>
      </Page>
    );
  }

  async function handleSelectRoom(room: Room) {
    if (!room.available) return;

    setSelectedRoom(room);
    setConfirming(true);

    const verified = await verifyAction();
    setConfirming(false);

    if (!verified) {
      setSelectedRoom(null);
      return;
    }

    // Update user's room selection in context
    setRoomId(room.id);
    toast.success(t("roomSelected"));
    router.push("/home");
  }

  const roomsByType = residence.roomTypes.map((roomType) => ({
    ...roomType,
    availableRooms: residence.rooms.filter(
      (r) => r.type === roomType.type && r.available
    ),
    totalRooms: residence.rooms.filter((r) => r.type === roomType.type).length,
  }));

  return (
    <>
      <PinDialog />
      <Page className="gap-0">
        {/* Header Image */}
        <div className="relative h-64 w-full">
          <Image
            src={residence.image}
            alt={residence.name}
            fill
            className="object-cover"
          />
          <button
            onClick={() => router.push("/housing")}
            className="absolute top-4 left-4 size-10 rounded-md bg-background/90 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors"
          >
            <ArrowLeft className="size-5" />
          </button>
        </div>

        <div className="p-4 flex flex-col gap-6">
          {/* Header */}
          <div>
            <div className="flex items-start justify-between gap-2 mb-2">
              <Typography variant="h3">{residence.name}</Typography>
              <div className="flex items-center gap-1 text-sm">
                <Star className="size-4 fill-yellow-500 text-yellow-500" />
                <span className="font-semibold">{residence.rating}</span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-3">
              <MapPin className="size-3.5" />
              <span>{residence.address}</span>
            </div>

            <div className="text-sm text-muted-foreground">
              {residence.distance}
            </div>
          </div>

          {/* Description */}
          <div>
            <Typography variant="body">{residence.description}</Typography>
          </div>

          {/* Amenities */}
          <div>
            <Typography variant="h4" className="mb-3">
              {t("amenities")}
            </Typography>
            <div className="flex flex-wrap gap-2">
              {residence.amenities.map((amenity) => (
                <div
                  key={amenity}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-muted text-sm"
                >
                  <Check className="size-3.5 text-primary" />
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Room Types */}
          <div>
            <Typography variant="h4" className="mb-4">
              {t("roomTypes")}
            </Typography>

            <div className="flex flex-col gap-6">
              {roomsByType.map((roomType) => (
                <div
                  key={roomType.type}
                  className="rounded-md border border-border overflow-hidden"
                >
                  {/* Room Type Image */}
                  <div className="relative h-40 w-full">
                    <Image
                      src={roomType.image}
                      alt={roomType.label}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Room Type Details */}
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <Typography variant="h4">{roomType.label}</Typography>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Users className="size-3.5" />
                        <span>
                          {roomType.capacity}{" "}
                          {roomType.capacity === 1 ? t("person") : t("people")}
                        </span>
                      </div>
                    </div>

                    {/* Amenities */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {roomType.amenities.map((amenity) => (
                        <span
                          key={amenity}
                          className="text-xs text-muted-foreground"
                        >
                          • {amenity}
                        </span>
                      ))}
                    </div>

                    {/* Available Rooms */}
                    <div className="pt-3 border-t border-border">
                      <div className="text-sm font-medium mb-2">
                        {t("availableRooms")} ({roomType.availableRooms.length}/
                        {roomType.totalRooms})
                      </div>

                      {roomType.availableRooms.length > 0 ? (
                        <div className="grid grid-cols-3 gap-2">
                          {residence.rooms
                            .filter((r) => r.type === roomType.type)
                            .map((room) => (
                              <button
                                key={room.id}
                                onClick={() => handleSelectRoom(room)}
                                disabled={!room.available || confirming}
                                className={cn(
                                  "h-12 rounded-md border text-sm font-medium transition-colors",
                                  room.available
                                    ? "border-border hover:border-primary hover:bg-primary/5 hover:text-primary"
                                    : "border-border bg-muted text-muted-foreground cursor-not-allowed",
                                  selectedRoom?.id === room.id &&
                                    "border-primary bg-primary/10 text-primary"
                                )}
                              >
                                {confirming && selectedRoom?.id === room.id ? (
                                  <Loader2 className="size-4 animate-spin mx-auto" />
                                ) : room.available ? (
                                  room.label
                                ) : (
                                  <X className="size-4 mx-auto" />
                                )}
                              </button>
                            ))}
                        </div>
                      ) : (
                        <div className="text-sm text-muted-foreground py-4 text-center">
                          {t("noResults")}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Page>
    </>
  );
}
