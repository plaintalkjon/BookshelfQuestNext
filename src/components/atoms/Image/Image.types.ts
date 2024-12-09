import { ImgHTMLAttributes } from 'react';

export interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  alt: string;
  className?: string;
  fallback?: string;
} 