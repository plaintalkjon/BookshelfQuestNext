import { ReactElement } from 'react';

export interface ArticleMeta {
  title: string;
  description: string;
  date: string;
  thumbnail: string;
  images: string[];
  slug: string;
}

export interface MDXArticle {
  metadata: ArticleMeta;
  content: ReactElement | string;
}
