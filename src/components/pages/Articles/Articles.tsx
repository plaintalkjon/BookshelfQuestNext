"use client";

import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { ArticleCard } from '@/components/molecules/ArticleCard';
import { Text } from '@/components/atoms';
import './Articles.css';

interface Article {
  id: string;
  title: string;
  description: string;
  image_url: string;
  created_at: string;
  url: string;
}

export const Articles = () => {
  const { data: articles, isLoading } = useQuery({
    queryKey: ['articles'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Article[];
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="articles-container">
      <Text variant="h1">Articles</Text>
      <div className="articles-grid">
        {articles?.map((article) => (
          <ArticleCard
            key={article.id}
            title={article.title}
            description={article.description}
            imageUrl={article.image_url}
            date={article.created_at}
            onClick={() => window.open(article.url, '_blank')}
          />
        ))}
      </div>
    </div>
  );
}; 