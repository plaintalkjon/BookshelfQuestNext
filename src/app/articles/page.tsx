import { ArticleGallery } from '@/components/pages/ArticleGallery';
import { getRecentArticles } from '@/utils/mdx';

export default async function ArticlesPage() {
  const articles = await getRecentArticles(12);
  
  return (
      <ArticleGallery articles={articles} />
  );
} 