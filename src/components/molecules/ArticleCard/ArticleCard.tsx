'use client';

import Link from 'next/link';
import { Text, Image } from '@/components/atoms';
import './ArticleCard.css';

interface ArticleCardProps {
  title: string;
  description: string;
  imageUrl: string;
  date: string;
  slug: string;
}

export function ArticleCard({ title, description, imageUrl, date, slug }: ArticleCardProps) {
  // Format date in a consistent way
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <Link 
      href={`/articles/${encodeURIComponent(slug)}`} 
      className="article-card"
    >
      <div className="article-card-image">
        <Image src={imageUrl} alt={title} />
      </div>
      <div className="article-card-content">
        <Text variant="h3">{title}</Text>
        <Text variant="body" className="article-card-date">
          {formattedDate}
        </Text>
        <Text variant="body">{description}</Text>
      </div>
    </Link>
  );
} 