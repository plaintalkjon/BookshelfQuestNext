// src/types/mdx.ts
export interface ArticleMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  thumbnail: string;
  images: string[];
}

export interface Article extends ArticleMeta {
  content: React.ReactNode;  // Since MDX content is rendered as React components
}

// This is used internally for MDX processing
export interface MDXArticle {
  metadata: ArticleMeta;
  content: React.ReactNode;
}