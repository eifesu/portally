import { createClient } from "@/lib/supabase/server";
import { DEMO_MODE, DEMO_USER_ID } from "@/lib/demo";
import PaymentsView from "./_components/PaymentsView";

export default async function PaymentsPage() {
  let userId = DEMO_USER_ID;

  if (!DEMO_MODE) {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    userId = user!.id;
  }

  return <PaymentsView userId={userId} />;
}
