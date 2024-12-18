"use client";

import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import type { AppRoute } from "@/types/routes";

export function useAuth() {
  const supabase = createClientComponentClient();
  const router = useRouter();

  const { data: session, isLoading } = useQuery({
    queryKey: ['session'],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      return session;
    },
    staleTime: 1000 * 60 * 5, // Consider data fresh for 5 minutes
  });

  const handleNavigation = (path: AppRoute) => {
    router.push(path);
  };

  return {
    user: session?.user,
    isAuthenticated: !!session,
    isLoading,
    handleNavigation
  };
}
