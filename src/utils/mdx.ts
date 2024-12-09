import fs from 'fs';
import path from 'path';
import { compileMDX } from 'next-mdx-remote/rsc';
import type { ArticleMeta, MDXArticle } from '@/types/mdx';
import { Image } from '@/components/atoms';

const articlesDirectory = path.join(process.cwd(), 'src/content/articles');

export async function getArticleBySlug(slug: string): Promise<MDXArticle | null> {
  try {
    const fullPath = path.join(articlesDirectory, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    const { frontmatter, content } = await compileMDX<{
      title: string;
      description: string;
      date: string;
      thumbnail: string;
      images: string[];
      slug?: string;
    }>({
      source: fileContents,
      components: {
        Image: Image,
      },
      options: { 
        parseFrontmatter: true,
        mdxOptions: {
          format: 'mdx'
        }
      }
    });

    return {
      metadata: { ...frontmatter, slug } as ArticleMeta,
      content
    };
  } catch (error) {
    console.error('Error loading article:', error);
    return null;
  }
}

export async function getAllArticles(): Promise<ArticleMeta[]> {
  const files = fs.readdirSync(articlesDirectory);
  const articles = await Promise.all(
    files
      .filter(file => file.endsWith('.mdx'))
      .map(async file => {
        const slug = file.replace(/\.mdx$/, '');
        const article = await getArticleBySlug(slug);
        return article?.metadata;
      })
  );

  return articles.filter((article): article is ArticleMeta => article !== null);
} 