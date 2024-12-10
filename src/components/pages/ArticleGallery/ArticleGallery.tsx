"use client";

import { ArticleShowcase } from '@/components/organisms';
import { Text } from '@/components/atoms';
import './ArticleGallery.css';
import type { Article } from '@/types/mdx';


export const ArticleGallery = ({ articles }: { articles: Article[] }) => {

  return (
    <div className="articles-container">
      <Text variant="h1">Articles</Text>
      <ArticleShowcase 
        articles={articles}
        direction="row"
        gridMinWidth="350px"
        title={null}
      />
    </div>
  );
};
