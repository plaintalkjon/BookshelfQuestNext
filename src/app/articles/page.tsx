import { ArticleGallery } from '@/components/pages/ArticleGallery';
import { getAllArticles } from '@/utils/mdx';

export default async function ArticlesPage() {
  const articles = await getAllArticles();
  
  return (
      <ArticleGallery articles={articles} />
  );
} 