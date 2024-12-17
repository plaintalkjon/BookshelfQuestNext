/* import { ShelfShowcase } from "@/components/organisms";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { shelfService } from "@/services/shelf";
import type { Book } from "@/types/book"; */

export default async function ShelfPage() {
  /* const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect('/login');
  }

  const shelfBooks = await shelfService.getShelfBooks(session.user.id);
  console.log('Shelf books:', shelfBooks); // Debug what we're getting
*/
  return <p>Coming Soon</p>;
}
