import { Image, Text } from '@/components/atoms';
import './ArticleCard.css';

export interface ArticleCardProps {
  title: string;
  description: string;
  imageUrl: string;
  date: string;
  onClick?: () => void;
  className?: string;
}

export const ArticleCard = ({
  title,
  description,
  imageUrl,
  date,
  onClick,
  className = '',
}: ArticleCardProps) => {
  return (
    <div 
      className={`article-card ${className}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
    >
      <Image
        src={imageUrl}
        alt={title}
        className="article-card-image"
      />
      <div className="article-card-content">
        <Text variant="h3" className="article-card-title">
          {title}
        </Text>
        <Text variant="body" className="article-card-description">
          {description}
        </Text>
        <Text variant="caption" className="article-card-date">
          {new Date(date).toLocaleDateString()}
        </Text>
      </div>
    </div>
  );
}; 