import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database.types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    storageKey: 'sb-auth-token',
    storage: {
      getItem: (key) => {
        const value = document.cookie.match(new RegExp(`${key}=([^;]+)`))?.[1] ?? null;
        return value;
      },
      setItem: (key, value) => {
        document.cookie = `${key}=${value}; path=/; max-age=86400; secure; samesite=lax`;
      },
      removeItem: (key) => {
        document.cookie = `${key}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
      },
    },
  },
})