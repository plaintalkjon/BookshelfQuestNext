'use client';

import { useState } from 'react';
import { Text, Button, Input } from '@/components/atoms';
import { useUser } from '@/hooks/useUser';
import { supabase } from '@/lib/supabase';
import './Settings.css';

export const Settings = () => {
  const { data: user, isLoading, mutate } = useUser();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [confirmPassword, setConfirmPassword] = useState('');

  const [formData, setFormData] = useState({
    email: user?.email || '',
    display_name: user?.display_name || '',
    username: user?.username || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsSubmitting(true);

    try {
      // Always require password confirmation for any changes
      if (!confirmPassword) {
        throw new Error("Please confirm your password to make changes");
      }

      // Validate passwords if attempting to change
      if (formData.newPassword) {
        if (formData.newPassword !== formData.confirmPassword) {
          throw new Error("New passwords don't match");
        }
      }

      // First verify current password
      const { error: verifyError } = await supabase.auth.signInWithPassword({
        email: user?.email || '',
        password: confirmPassword,
      });

      if (verifyError) {
        throw new Error("Current password is incorrect");
      }

      // If password verification successful, proceed with updates
      if (formData.newPassword) {
        const response = await fetch('/api/user/password', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            currentPassword: confirmPassword,
            newPassword: formData.newPassword,
          }),
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.message || 'Failed to update password');
        }
      }

      // Update profile information
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          display_name: formData.display_name,
          username: formData.username,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to update profile');
      }

      // Clear sensitive fields
      setFormData(prev => ({
        ...prev,
        newPassword: '',
        confirmPassword: '',
      }));
      setConfirmPassword('');

      // Refresh user data
      await mutate();
      
      setSuccess('Settings updated successfully!');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="settings-container">
      <Text variant="h1">Account Settings</Text>
      
      {error && (
        <div className="settings-alert error">
          <Text>{error}</Text>
        </div>
      )}
      
      {success && (
        <div className="settings-alert success">
          <Text>{success}</Text>
        </div>
      )}

      <form onSubmit={handleSubmit} className="settings-form">
        <div className="settings-section">
          <Text variant="h2">Profile Information</Text>
          <Input
            label="Display Name"
            value={formData.display_name}
            onChange={(e) => setFormData(prev => ({ ...prev, display_name: e.target.value }))}
          />
          <Input
            label="Username"
            value={formData.username}
            onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
          />
          <Input
            type="email"
            label="Email"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          />
        </div>

        <div className="settings-section">
          <Text variant="h2">Change Password</Text>
          <Input
            type="password"
            label="New Password"
            value={formData.newPassword}
            onChange={(e) => setFormData(prev => ({ ...prev, newPassword: e.target.value }))}
          />
          <Input
            type="password"
            label="Confirm New Password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
          />
        </div>

        <div className="settings-section">
          <Text variant="h2">Confirm Changes</Text>
          <Input
            type="password"
            label="Current Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <Button 
          type="submit" 
          variant="primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving...' : 'Save Changes'}
        </Button>
      </form>
    </div>
  );
}; 