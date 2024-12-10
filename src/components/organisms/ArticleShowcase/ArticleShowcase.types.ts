import type { ArticleMeta } from '@/types/mdx';

export interface ArticleShowcaseProps {
  articles: ArticleMeta[];
  limit?: number;
  direction?: 'row' | 'column';
  title?: string | null;
  gridMinWidth?: string;
} 