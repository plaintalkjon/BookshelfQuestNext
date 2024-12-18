"use client";

import { useState } from "react";
import { Button, Text } from "@/components/atoms";
import { Form } from "@/components/molecules";
import { useLogin } from "@/hooks/useLogin";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import "./Login.css";

export const Login = () => {
  const [mode, setMode] = useState<"login" | "signup" | "forgot">("login");
  const { login, signup, forgotPassword } = useLogin();
  const router = useRouter();

  const getFields = () => {
    switch (mode) {
      case "login":
        return [
          { name: "email", label: "Email", type: "email", required: true },
          {
            name: "password",
            label: "Password",
            type: "password",
            required: true,
          },
        ];
      case "signup":
        return [
          { name: "email", label: "Email", type: "email", required: true },
          {
            name: "username",
            label: "Username",
            type: "text",
            required: true,
            pattern: "^[a-zA-Z0-9]{3,20}$",
            title:
              "Username must be 3-20 characters and can only contain letters and numbers",
          },
          {
            name: "display_name",
            label: "Display Name",
            type: "text",
            required: true,
          },
          {
            name: "password",
            label: "Password",
            type: "password",
            required: true,
          },
          {
            name: "confirmPassword",
            label: "Confirm Password",
            type: "password",
            required: true,
          },
        ];
      case "forgot":
        return [
          { name: "email", label: "Email", type: "email", required: true },
        ];
      default:
        return [];
    }
  };

  const handleSubmit = async (data: Record<string, string>) => {
    if (mode === "forgot") {
      forgotPassword.mutate(data.email);
    } else if (mode === "signup") {
      try {
        // Create user account
        await signup.mutateAsync({
          email: data.email,
          password: data.password,
          confirmPassword: data.confirmPassword,
          username: data.username,
          display_name: data.display_name,
        });
        router.push("/");
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error('An unexpected error occurred');
        }
      }
    } else {
      login.mutate({
        email: data.email,
        password: data.password,
      });
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <Text variant="h1" className="login-title">
          {mode === "forgot"
            ? "Reset Password"
            : mode === "login"
            ? "Welcome Back"
            : "Create Account"}
        </Text>

        <Form
          fields={getFields()}
          onSubmit={handleSubmit}
          submitText={
            mode === "forgot"
              ? "Send Reset Link"
              : mode === "login"
              ? "Sign In"
              : "Sign Up"
          }
          loading={
            login.isPending || signup.isPending || forgotPassword.isPending
          }
          error={
            login.error?.message ||
            signup.error?.message ||
            forgotPassword.error?.message
          }
          className="login-form"
        />

        <div className="login-footer">
          {mode === "login" && (
            <>
              <Button variant="tertiary" onClick={() => setMode("forgot")}>
                Forgot Password?
              </Button>
              <Text variant="body">Don&apos;t have an account?</Text>
              <Button variant="tertiary" onClick={() => setMode("signup")}>
                Sign Up
              </Button>
            </>
          )}
          {(mode === "forgot" || mode === "signup") && (
            <Button variant="tertiary" onClick={() => setMode("login")}>
              Back to Login
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
