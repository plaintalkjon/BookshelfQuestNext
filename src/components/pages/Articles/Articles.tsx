import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Text, Loading } from '@/components';
import { Article, ArticleData } from '@/components/templates/Article';
import './Articles.css';

export const Articles = () => {
  const { data: articles, isLoading } = useQuery({
    queryKey: ['articles'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('articles')
        .select(`
          *,
          author:user_profiles(username, display_name, profile_picture)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as ArticleData[];
    }
  });

  if (isLoading) {
    return (
      <div className="articles-loading">
        <Loading size="large" />
      </div>
    );
  }

  return (
    <div className="articles-container">
      <div className="articles-header">
        <Text variant="h1">Articles</Text>
      </div>
      
      <div className="articles-grid">
        {articles?.map(article => (
          <Article
            key={article.id}
            title={article.title}
            date={article.created_at}
            image={{
              src: article.author.profile_picture || '/default-profile.png',
              alt: `${article.author.display_name}'s profile picture`
            }}
          >
            <Text variant="body">
              {article.content.slice(0, 150)}...
            </Text>
          </Article>
        ))}
      </div>
    </div>
  );
}; 