import { ArticleCard } from '@/components/molecules/ArticleCard';
import { Text } from '@/components/atoms';
import { getRecentArticles } from '@/utils/articles';
import type { ArticleShowcaseProps } from './ArticleShowcase.types';
import './ArticleShowcase.css';

export const ArticleShowcase = ({ 
  articles,
  limit = 3,
  direction = 'row',
  title = 'Recent Articles',
  gridMinWidth = '300px',
}: ArticleShowcaseProps) => {
  const recentArticles = getRecentArticles(articles, limit);

  return (
    <div className="article-showcase">
      {title && <Text variant="h2">{title}</Text>}
      <div 
        className="article-showcase-grid"
        style={{ 
          gridTemplateColumns: direction === 'row' 
            ? `repeat(auto-fill, minmax(${gridMinWidth}, 1fr))`
            : '1fr'
        }}
      >
        {recentArticles.map((article) => (
          <ArticleCard
            key={article.slug}
            title={article.title}
            description={article.description}
            imageUrl={article.thumbnail}
            date={article.date}
          />
        ))}
      </div>
    </div>
  );
}; 