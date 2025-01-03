'use client';

import { Settings } from "@/components/pages";
import { useAuth } from "@/hooks/useAuth";
import { Loading } from "@/components/atoms/Loading";

export default function SettingsPage() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    return <div>Please log in to view settings</div>;
  }

  return <Settings />;
}
