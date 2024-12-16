import { ShelfShowcase } from "@/components/organisms";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { shelfService } from "@/services/shelf";

export default async function ShelfPage() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect('/login');
  }

  const shelfBooks = await shelfService.getShelfBooks(session.user.id);

  return <ShelfShowcase books={shelfBooks || []} />;
}
