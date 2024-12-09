export interface ArticleImage {
  src: string;
  alt: string;
}

export interface ArticleProps {
  title: string;
  date: string;
  image?: ArticleImage;
  children: React.ReactNode;
}

// For the Articles page
export interface ArticleData {
  id: string;
  title: string;
  content: string;
  created_at: string;
  user_id: string;
  author: {
    username: string;
    display_name: string;
    profile_picture?: string;
  }
} 