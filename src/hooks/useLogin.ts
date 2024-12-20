import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { toast } from "react-hot-toast";

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

export function useLogin() {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const queryClient = useQueryClient();

  const login = useMutation({
    mutationFn: async ({ email, password }: LoginCredentials) => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['session'] });
      router.push('/');
    },
    onError: (error) => {
      toast.error(error.message);
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
      toast.success("Account created! Please check your email to verify your account.");
      router.push("/login");
    },
  });

  const forgotPassword = useMutation({
    mutationFn: async (email: string) => {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Check your email for reset instructions");
      router.push("/login");
    },
  });

  const resetPassword = useMutation({
    mutationFn: async ({ password, confirmPassword }: { password: string; confirmPassword: string; }) => {
      if (password !== confirmPassword) throw new Error("Passwords do not match");
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Password updated successfully");
      router.push("/login");
    },
  });

  const logout = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['session'] });
      router.push('/login');
      toast.success('Logged out successfully');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return {
    login,
    signup,
    forgotPassword,
    resetPassword,
    logout,
  };
} 