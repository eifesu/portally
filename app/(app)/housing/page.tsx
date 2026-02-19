"use client";

import Link from "next/link";
import Image from "next/image";
import { Star, MapPin } from "lucide-react";
import Page from "@/shared/components/Page/Page";
import Typography from "@/shared/components/Typography";
import { mockResidences } from "@/shared/mock";
import { useTranslations } from "@/lib/i18n/context";

export default function HousingPage() {
  const t = useTranslations();

  return (
    <Page className="gap-4">
      <div className="px-4 pt-4">
        <Typography variant="h3">{t("availableResidences")}</Typography>
        <Typography variant="body1" muted className="mt-1">
          {t("subtitle")}
        </Typography>
      </div>

      <div className="flex flex-col gap-4 px-4 pb-4">
        {mockResidences.map((residence) => {
          const availableCount = residence.rooms.filter(
            (r) => r.available
          ).length;

          return (
            <Link
              key={residence.id}
              href={`/housing/${residence.id}`}
              className="block rounded-md border border-border overflow-hidden bg-card hover:border-primary transition-colors"
            >
              <div className="relative h-48 w-full">
                <Image
                  src={residence.image}
                  alt={residence.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <Typography variant="h4">{residence.name}</Typography>
                  <div className="flex items-center gap-1 text-sm">
                    <Star className="size-4 fill-yellow-500 text-yellow-500" />
                    <span className="font-medium">{residence.rating}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-2">
                  <MapPin className="size-3.5" />
                  <span>{residence.distance}</span>
                </div>

                <Typography variant="body1" muted className="mb-3 line-clamp-2">
                  {residence.description}
                </Typography>

                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <span className="text-sm text-muted-foreground">
                    {availableCount} {availableCount !== 1 ? t("rooms") : t("roomLabel")}{" "}
                    {t("available").toLowerCase()}
                  </span>
                  <span className="text-sm font-medium text-primary">
                    {t("viewDetails")} →
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </Page>
  );
}
