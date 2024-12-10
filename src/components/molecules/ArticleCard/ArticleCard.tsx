'use client';

import { Image, Text } from '@/components/atoms';
import { useRouter } from 'next/navigation';
import './ArticleCard.css';
import type { ArticleCardProps } from './ArticleCard.types';

export const ArticleCard = ({
  title,
  description,
  imageUrl,
  date,
  slug,
  className = '',
}: ArticleCardProps) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/articles/${slug}`);
  };

  return (
    <div 
      className={`article-card ${className}`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
    >
      <Image
        src={imageUrl}
        alt={title}
        className="article-card-image"
        width={400}
        height={225}
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