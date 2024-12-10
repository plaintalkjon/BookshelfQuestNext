'use client';

import { Settings } from "@/components/pages";
import { useRouter } from "next/navigation";
import { Loading } from "@/components/atoms/Loading";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function SettingsPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!isMounted) return;

        if (!session) {
          router.replace('/login');
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Session check failed:', error);
        if (isMounted) router.replace('/login');
      }
    };

    checkSession();

    return () => {
      isMounted = false;
    };
  }, [router]);

  if (isLoading) {
    return <Loading />;
  }

  return <Settings />;
}
