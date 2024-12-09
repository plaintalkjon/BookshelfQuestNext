"use client";

import { useRouter } from 'next/navigation';
import { ArticleCard } from '@/components/molecules/ArticleCard';
import { Text } from '@/components/atoms';
import type { ArticleGalleryProps } from './ArticleGallery.types';
import { getRecentArticles } from '@/utils/articles';
import { useMemo } from 'react';
import './ArticleGallery.css';

export const ArticleGallery = ({ articles }: ArticleGalleryProps) => {
  const router = useRouter();
  const recentArticles = useMemo(() => 
    getRecentArticles(articles, 12),
    [articles]
  );

  return (
    <div className="articles-container">
      <Text variant="h1">Articles</Text>
      <div className="articles-grid">
        {recentArticles.map((article) => (
          <ArticleCard
            key={article.slug}
            title={article.title}
            description={article.description}
            imageUrl={article.thumbnail}
            date={article.date}
            onClick={() => router.push(`/articles/${article.slug}`)}
          />
        ))}
      </div>
    </div>
  );
};
