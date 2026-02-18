import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import BottomTabs from "./_components/BottomTabs";
import TopNav from "./_components/TopNav";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/");
  }

  return (
    <div className="h-svh flex flex-col">
      <TopNav />
      <main className="flex-1 overflow-y-auto">{children}</main>
      <BottomTabs />
    </div>
  );
}
