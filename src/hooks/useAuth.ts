"use client";

import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { toast } from "react-hot-toast";
import type { AppRoute } from "@/types/routes";
// Logging in, signing up, and logging out

interface LoginCredentials {
  email: string;
  password: string;
}

interface SignupCredentials {
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
  display_name: string;
}

export const useAuth = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const handleNavigation = (path: AppRoute) => {
    router.push(path);
  };

  const login = useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      const { data, error } = await supabase.auth.signInWithPassword(
        credentials
      );
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      handleNavigation("/");
    },
  });

  const signup = useMutation({
    mutationFn: async (credentials: SignupCredentials) => {
      // 1. Check if username exists
      const { data: existingUsername } = await supabase
        .from("user_profiles")
        .select("username")
        .ilike("username", credentials.username)
        .single();

      if (existingUsername) {
        throw new Error("Username already taken");
      }

      // 2. Check if email exists
      const { data: existingEmail } = await supabase
        .from("user_profiles")
        .select("email")
        .ilike("email", credentials.email)
        .single();

      if (existingEmail) {
        throw new Error("Email already registered");
      }

      // 3. Create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: credentials.email,
        password: credentials.password,
      });

      if (authError) throw authError;
      if (!authData.user) throw new Error("Signup failed");

      // 4. Create profile
      const { error: profileError } = await supabase
        .from("user_profiles")
        .insert({
          user_id: authData.user.id,
          username: credentials.username,
          display_name: credentials.display_name,
        });

      if (profileError) throw profileError;

      return authData;
    },
    onSuccess: () => {
      toast.success(
        "Account created! Please check your email to verify your account."
      );
      handleNavigation("/login");
    },
  });

  const forgotPassword = useMutation({
    mutationFn: async (email: string) => {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Check your email for reset instructions");
      handleNavigation("/login");
    },
  });
  const resetPassword = useMutation({
    mutationFn: async ({
      password,
      confirmPassword,
    }: {
      password: string;
      confirmPassword: string;
    }) => {
      if (password !== confirmPassword) {
        throw new Error("Passwords do not match");
      }
      const { error } = await supabase.auth.updateUser({
        password: password,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Password updated successfully");
      handleNavigation("/login");
    },
  });
  const logout = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    },
    onSuccess: () => {
      handleNavigation("/");
      queryClient.setQueryData(["user"], null);
      toast.success("Logged out successfully");
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  return {
    login,
    signup,
    forgotPassword,
    resetPassword,
    logout,
  };
};
