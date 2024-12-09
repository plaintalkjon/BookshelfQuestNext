"use client";

import { useRouter } from 'next/navigation';
import { Button, Text } from '@/components';
import { Form } from '@/components/molecules';
import { useAuth } from '@/hooks/useAuth';
import './ResetPassword.css';

export const ResetPassword = () => {
  const router = useRouter();
  const { resetPassword } = useAuth();

  const fields = [
    { name: 'password', label: 'New Password', type: 'password', required: true },
    { name: 'confirmPassword', label: 'Confirm Password', type: 'password', required: true }
  ];

  const handleSubmit = async (data: Record<string, string>) => {
    resetPassword.mutate({
      password: data.password,
      confirmPassword: data.confirmPassword
    });
  };

  return (
    <div className="reset-container">
      <div className="reset-card">
        <Text variant="h1" className="reset-title">
          Reset Password
        </Text>
        
        <Form
          fields={fields}
          onSubmit={handleSubmit}
          submitText="Reset Password"
          loading={resetPassword.isPending}
          error={resetPassword.error?.message}
          className="reset-form"
        />

        <div className="reset-footer">
          <Button
            variant="tertiary"
            onClick={() => router.push('/login')}
          >
            Back to Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword; 