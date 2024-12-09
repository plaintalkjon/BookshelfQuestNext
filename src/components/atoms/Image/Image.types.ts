import { ComponentProps } from 'react';
import NextImage from 'next/image';

export interface ImageProps extends Omit<ComponentProps<typeof NextImage>, 'alt'> {
  alt: string;
  className?: string;
  fallback?: string;
  width?: number;
  height?: number;
} 