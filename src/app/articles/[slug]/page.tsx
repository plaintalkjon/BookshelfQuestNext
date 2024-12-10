import { notFound } from 'next/navigation';
import { Article } from '@/components/templates';
import { getArticleBySlug } from '@/utils/mdx';

interface ArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const resolvedParams = await params;
  const article = await getArticleBySlug(resolvedParams.slug);
  
  if (!article) {
    notFound();
  }

  return (
    <Article
      title={article.metadata.title}
      date={article.metadata.date}
      image={{
        src: article.metadata.thumbnail,
        alt: article.metadata.title
      }}
    >
      {article.content}
    </Article>
  );
} 