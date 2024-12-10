import { supabase } from "@/lib/supabase";
import type { UserProfile } from "@/types/profile";

export const profileService = {
  // Public profile data
  async getProfileByUsername(username: string): Promise<UserProfile | null> {
    const { data, error } = await supabase
      .from("user_profiles")
      .select("username, display_name, created_at")  // Public fields only
      .eq("username", username)
      .single();

    if (error) {
      console.error("Error fetching profile:", error);
      return null;
    }
    return data;
  },

};
