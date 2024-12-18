import { notFound } from 'next/navigation';
import { Article } from '@/components/templates';
import { getArticleBySlug } from '@/utils/mdx';
import path from 'path';

const articlesDirectory = path.join(process.cwd(), 'src/content/articles');

interface ArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const resolvedParams = await params;
  console.log('Raw slug:', resolvedParams.slug);
  
  if (resolvedParams.slug.includes('.js.map')) {
    notFound();
  }

  const article = await getArticleBySlug(resolvedParams.slug);
  
  if (!article) {
    notFound();
  }

  console.log('Attempting to read:', resolvedParams.slug);
  console.log('Full path:', path.join(articlesDirectory, `${resolvedParams.slug}.mdx`));

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