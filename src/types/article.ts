export interface Article {
  id: string;
  slug: string;
  title: string;
  description: string;
  date: string;
  images: {
    thumbnail: string;
    content: string[];
  };
  content: string;
} 