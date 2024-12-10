'use client';

import { Text } from '@/components/atoms';
import './Profile.css';
import { UserProfile } from '@/types/profile';

interface ProfileProps {
  profile: UserProfile;
}

export const Profile = ({ profile }: ProfileProps) => {
  return (
    <div className="profile-container">
      <div className="profile-header">
        <Text variant="h1">{profile.display_name}</Text>
        <Text variant="body">@{profile.username}</Text>
        <Text variant="caption">
          Member since {new Date(profile.created_at).toLocaleDateString()}
        </Text>
      </div>
      
      <div className="profile-content">
        {/* Add more public profile content here */}
      </div>
    </div>
  );
}; 