import { Text } from '@/components/atoms';
import Image from 'next/image';
import { Suspense } from 'react';

interface ArticleProps {
  title: string;
  date: string;
  image?: {
    src: string;
    alt: string;
    priority?: boolean;
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
        <Image 
          src={image.src} 
          alt={image.alt} 
          className="article-image"
          width={800}
          height={400}
          priority={image.priority}
        />
      )}
      
      <div className="article-content">
        <Suspense fallback="Loading content...">
          {children}
        </Suspense>
      </div>
    </article>
  );
}; 