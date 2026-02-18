"use client";

import Image from "next/image";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";

export default function TopNav() {
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background flex items-center justify-between px-4 py-4">
      <Image
        src="/portally.svg"
        alt="Portally"
        width={24}
        height={24}
        priority
      />
      <Button onClick={handleLogout} variant="outline" size="sm">
        <LogOut className="size-4" />
        Déconnexion
      </Button>
    </header>
  );
}
