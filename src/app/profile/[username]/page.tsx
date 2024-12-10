import { Profile } from "@/components/pages/Profile/Profile";
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import type { ProfilePageProps } from '@/types/profile';

export default async function ProfilePage({ params }: ProfilePageProps) {
  const supabase = createServerComponentClient({ cookies });
  const resolvedParams = await params;
  
  const { data: profile, error } = await supabase
    .from("user_profiles")
    .select("username, display_name, created_at")
    .eq("username", resolvedParams.username)
    .single();

  if (error || !profile) {
    notFound();
  }

  return <Profile profile={profile} />;
}