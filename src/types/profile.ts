export interface UserProfile {
    username: string;
    display_name: string;
    created_at: string;
  }
  
  export interface ProfilePageProps {
    params: Promise<{
      username: string;
    }>;
  }