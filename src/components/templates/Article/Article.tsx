import { Text } from '@/components/atoms';
import { Suspense } from 'react';
import { ArticleProps } from './Article.types';
import './Article.css';
export const Article = ({ title, date, children }: ArticleProps) => {

  return (
    <article className="article">
      <header className="article-header">
        <Text variant="h1">{title}</Text>
        <Text variant="body" className="article-date">
          {new Date(date).toLocaleDateString()}
        </Text>
      </header>
      
      <div className="article-content">
        <Suspense fallback="Loading content...">
          {children}
        </Suspense>
      </div>
    </article>
  );
}; 