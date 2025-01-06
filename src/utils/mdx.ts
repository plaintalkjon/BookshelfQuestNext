'use server';

import * as fs from 'node:fs';
import path from 'path';
import { compileMDX } from 'next-mdx-remote/rsc';
import type { ArticleMeta, MDXArticle, Article } from '@/types/mdx';
import { Image } from '@/components/atoms';

const articlesDirectory = path.join(process.cwd(), 'src/content/articles');

export async function getArticleBySlug(slug: string): Promise<MDXArticle | null> {
  try {
    const cleanSlug = slug.replace(/\.js\.map$/, '');
    const fullPath = path.join(articlesDirectory, `${cleanSlug}.mdx`);
    
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    const { frontmatter, content } = await compileMDX({
      source: fileContents,
      components: {
        Image,
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
    console.error('Error reading article:', error);
    return null;
  }
}

export async function getRecentArticles(count: number = 10): Promise<Article[]> {
  const files = fs.readdirSync(articlesDirectory);
  
  const articles = await Promise.all(
    files
      .filter(file => file.endsWith('.mdx'))
      .sort((a, b) => {
        const dateA = fs.statSync(path.join(articlesDirectory, a)).mtime;
        const dateB = fs.statSync(path.join(articlesDirectory, b)).mtime;
        return dateB.getTime() - dateA.getTime();
      })
      .slice(0, count)
      .map(async file => {
        const slug = file.replace(/\.mdx$/, '');
        const article = await getArticleBySlug(slug);
        if (!article) return null;
        
        return {
          ...article.metadata,
          content: article.content
        };
      })
  );

  return articles.filter((article): article is Article => article !== null);
}