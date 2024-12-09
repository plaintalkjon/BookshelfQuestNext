import { notFound } from 'next/navigation';
import { Article } from '@/components/templates/Article/Article';
import { getArticleBySlug } from '@/utils/mdx';

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const article = await getArticleBySlug(params.slug);
  
  if (!article) {
    notFound();
  }

  console.log('Rendering article content:', article.content);

  return (
    <Article
      title={article.metadata.title}
      date={article.metadata.date}
      image={{
        src: article.metadata.images[0],
        alt: article.metadata.title
      }}
    >
      {article.content}

    </Article>
  );
} 