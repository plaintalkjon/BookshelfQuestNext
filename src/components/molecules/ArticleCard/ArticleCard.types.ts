export interface ArticleCardProps {
  title: string;
  description: string;
  imageUrl: string;
  date: string;
  onClick?: () => void;
  className?: string;
} 