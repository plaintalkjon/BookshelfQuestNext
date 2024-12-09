import type { ArticleMeta } from '@/types/mdx';

export function getRecentArticles(articles: ArticleMeta[], limit: number = 3): ArticleMeta[] {
  return [...articles]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
} 