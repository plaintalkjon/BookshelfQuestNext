'use client';

import { useState } from 'react';
import { Text, Button, Input } from '@/components/atoms';
import { useUser } from '@/hooks/useUser';
import { settingsService } from '@/services/settings';
import './Settings.css';

export const Settings = () => {
  const { data: user, isLoading } = useUser();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [confirmPassword, setConfirmPassword] = useState('');

  const [formData, setFormData] = useState({
    email: user?.email || '',
    display_name: user?.display_name || '',
    username: user?.username || '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsSubmitting(true);

    try {
      // Verify current password
      if (!confirmPassword) {
        throw new Error("Please confirm your password to make changes");
      }

      await settingsService.verifyPassword(confirmPassword);

      // Update email if changed
      if (formData.email !== user?.email) {
        await settingsService.updateAuthEmail(formData.email);
      }

      // Update password if provided
      if (formData.newPassword) {
        if (formData.newPassword !== formData.confirmPassword) {
          throw new Error("New passwords don't match");
        }
        await settingsService.updateAuthPassword(formData.newPassword);
      }

      // Update profile fields if changed
      if (formData.display_name !== user?.display_name || 
          formData.username !== user?.username) {
        await settingsService.updateProfileFields(user.id, {
          display_name: formData.display_name,
          username: formData.username,
        });
      }

      setSuccess("Settings updated successfully!");
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="settings-container">
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      <form onSubmit={handleSubmit}>
        <div className="settings-section">
          <Text variant="h2">Profile Settings</Text>
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