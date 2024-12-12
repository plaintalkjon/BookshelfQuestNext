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
        try {
          // Check if we are in the browser environment before using `document`
          if (typeof document !== 'undefined') {
            return document.cookie.match(new RegExp(`${key}=([^;]+)`))?.[1] ?? null;
          }
          return null;  // If not in the browser, return null
        } catch {
          return null;
        }
      },
      setItem: (key, value) => {
        try {
          document.cookie = `${key}=${value}; path=/; max-age=31536000`;
        } catch {}
      },
      removeItem: (key) => {
        try {
          document.cookie = `${key}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
        } catch {}
      },
    },
  },
})