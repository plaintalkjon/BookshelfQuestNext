'use client';

import Link from 'next/link';
import { Text, Image } from '@/components/atoms';
import './ArticleCard.css';
import type { ArticleCardProps } from './ArticleCard.types';

export function ArticleCard({ title, description, imageUrl, date, slug }: ArticleCardProps) {
  console.log('ArticleCard props:', { title, description, imageUrl, date, slug });

  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC'
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