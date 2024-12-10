"use client";

import { ArticleShowcase } from '@/components/organisms';
import { Text } from '@/components/atoms';
import type { ArticleGalleryProps } from './ArticleGallery.types';
import './ArticleGallery.css';

export const ArticleGallery = ({ articles }: ArticleGalleryProps) => {
  return (
    <div className="articles-container">
      <Text variant="h1">Articles</Text>
      <ArticleShowcase 
        articles={articles}
        limit={12}
        direction="row"
        gridMinWidth="350px"
        title={null}
      />
    </div>
  );
};
