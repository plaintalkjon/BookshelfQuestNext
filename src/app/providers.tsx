"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Global query configuration
      staleTime: 1000 * 60 * 5, // Consider data stale after 5 minutes
    },
  },
});

// Initialize auth and shelf data
const supabase = createClientComponentClient();

// First, prefetch auth state
queryClient.prefetchQuery({
  queryKey: ["user"],
  queryFn: async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return user;
  },
});

// Then prefetch shelf data using cached user data
queryClient.prefetchQuery({
  queryKey: ["shelf"],
  queryFn: async () => {
    const user = queryClient.getQueryData(["user"]);
    if (!user) return null;

    const { data } = await supabase.from("user_shelf").select("*");
    return data;
  },
});

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
