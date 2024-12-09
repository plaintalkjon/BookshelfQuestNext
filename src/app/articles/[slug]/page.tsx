import { notFound } from 'next/navigation';
import { Article } from '@/components/templates/Article/Article';
import { MDXRemote } from 'next-mdx-remote/rsc';
import type { MDXRemoteProps } from 'next-mdx-remote/rsc';
import { getArticleBySlug } from '@/utils/mdx';
import Image from 'next/image';

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const article = await getArticleBySlug(params.slug);
  
  if (!article) {
    notFound();
  }

  return (
    <Article
      title={article.metadata.title}
      date={article.metadata.date}
      image={{
        src: article.metadata.images[0],
        alt: article.metadata.title
      }}
    >
      <MDXRemote 
        source={article.content as MDXRemoteProps['source']}
        components={{
          Image: (props) => (
            <Image
              alt={props.alt || 'Article image'}
              {...props}
              className="article-image"
            />
          ),
        }}
      />
    </Article>
  );
} 