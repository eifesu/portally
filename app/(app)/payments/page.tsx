import { createClient } from "@/lib/supabase/server";
import PaymentsView from "./_components/PaymentsView";

export default async function PaymentsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return <PaymentsView userId={user!.id} />;
}
