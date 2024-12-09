import { Text } from '@/components/atoms';

interface ArticleProps {
  title: string;
  date: string;
  image?: {
    src: string;
    alt: string;
  };
  children: React.ReactNode;
}

export const Article = ({ title, date, image, children }: ArticleProps) => {
  return (
    <article className="article">
      <header className="article-header">
        <Text variant="h1">{title}</Text>
        <Text variant="body-small" className="article-date">
          {new Date(date).toLocaleDateString()}
        </Text>
      </header>
      
      {image && (
        <img 
          src={image.src} 
          alt={image.alt} 
          className="article-image"
        />
      )}
      
      <div className="article-content">
        {children}
      </div>
    </article>
  );
}; 