"use client";

import { useRouter } from 'next/navigation';
import { ArticleCard } from '@/components/molecules/ArticleCard';
import { Text } from '@/components/atoms';
import './Articles.css';
import { AppRoute } from '@/types/routes';

const ExampleArticleCard = () => {
  const router = useRouter();

  return (
    <ArticleCard
      title="Getting Started with Next.js"
      description="A beginner's guide to Next.js, covering the fundamentals and best practices for building modern web applications."
      imageUrl="/images/articles/nextjs-guide/easton-press-books.jpg"
      date="2024-03-14"
      onClick={() => router.push('/articles/nextjs-guide' as AppRoute)}
    />
  );
};

const articles = [ExampleArticleCard];

export const Articles = () => {
  return (
    <div className="articles-container">
      <Text variant="h1">Articles</Text>
      <div className="articles-grid">
        {articles.map((Article, index) => (
          <Article key={index} />
        ))}
      </div>
    </div>
  );
};
