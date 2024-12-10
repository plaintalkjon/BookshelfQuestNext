import { Profile } from "@/components/pages/Profile/Profile";
import { getProfileByUsername } from "@/services/profile";
import { notFound } from 'next/navigation';
import type { ProfilePageProps } from '@/types/profile';

export default async function ProfilePage({ params }: ProfilePageProps) {
  const resolvedParams = await params;
  const profile = await getProfileByUsername(resolvedParams.username);

  if (!profile) {
    notFound();
  }

  return <Profile profile={profile} />;
}