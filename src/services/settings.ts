import { supabase } from "@/lib/supabase";
import type { UserProfile } from "@/types/profile";

export const settingsService = {
  // Verify current password
  async verifyPassword(password: string) {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user?.email) throw new Error("User not found");

    const { error } = await supabase.auth.signInWithPassword({
      email: user.email,
      password,
    });
    
    if (error) throw new Error("Current password is incorrect");
    return true;
  },

  // Update auth email
  async updateAuthEmail(newEmail: string) {
    const { error } = await supabase.auth.updateUser({
      email: newEmail
    });

    if (error) throw new Error("Failed to update email");
    return true;
  },

  // Update auth password
  async updateAuthPassword(newPassword: string) {
    const { error } = await supabase.auth.updateUser({
      password: newPassword
    });

    if (error) throw new Error("Failed to update password");
    return true;
  },

  // Update profile fields (username, display_name)
  async updateProfileFields(userId: string, data: Pick<UserProfile, 'username' | 'display_name'>) {
    const { error } = await supabase
      .from("user_profiles")
      .update({
        ...data,
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", userId);

    if (error) throw new Error("Failed to update profile");
    return true;
  }
};