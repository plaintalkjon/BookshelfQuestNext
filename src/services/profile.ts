import { supabase } from "@/lib/supabase";
import type { UserProfile } from "@/types/profile";

export async function getProfileByUsername(
  username: string
): Promise<UserProfile | null> {
  try {
    const { data: profile, error } = await supabase
      .from("user_profiles")
      .select("username, display_name, created_at")
      .eq("username", username)
      .single();

    if (error) {
      console.error("Error fetching profile:", error);
      return null;
    }

    return profile;
  } catch (error) {
    console.error("Error in getProfileByUsername:", error);
    return null;
  }
}
