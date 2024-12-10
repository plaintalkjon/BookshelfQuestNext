import { notFound } from 'next/navigation';
import { Article } from '@/components/templates';
import { getArticleBySlug } from '@/utils/mdx';

interface ArticlePageProps {
  params: {
    slug: string;
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const article = await getArticleBySlug(params.slug);
  
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