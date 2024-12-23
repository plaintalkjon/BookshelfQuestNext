import { ArticleCard } from '@/components/molecules/ArticleCard';
import { Text } from '@/components/atoms';
import type { ArticleShowcaseProps } from './ArticleShowcase.types';
import './ArticleShowcase.css';

export const ArticleShowcase = ({ 
  direction = 'row',
  title = 'Recent Articles',
  gridMinWidth = '300px',
  articles,
}: ArticleShowcaseProps) => {
  console.group("ArticleShowcase");
  console.log("articles", articles);
 

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
        {articles.map((article) => (
          
          <ArticleCard
            key={article.slug}
            title={article.title}
            description={article.description}
            date={article.date}
            imageUrl={article.thumbnail}
            slug={article.slug}
          />
        ))}
      </div>
    </div>
  );
}; 