"use client";

import { useRouter } from 'next/navigation';
import { ArticleCard } from '@/components/molecules/ArticleCard';
import { Text } from '@/components/atoms';
import type { ArticleMeta } from '@/types/mdx';
import './Articles.css';

interface ArticlesProps {
  articles: ArticleMeta[];
}

export const Articles = ({ articles }: ArticlesProps) => {
  const router = useRouter();

  return (
    <div className="articles-container">
      <Text variant="h1">Articles</Text>
      <div className="articles-grid">
        {articles.map((article) => (
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
