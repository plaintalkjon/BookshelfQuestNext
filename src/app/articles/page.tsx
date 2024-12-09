import { Articles } from '@/components/pages/Articles/Articles';
import { getAllArticles } from '@/utils/mdx';

export default async function ArticlesPage() {
  const articles = await getAllArticles();
  
  return <Articles articles={articles} />;
} 