import type { ElementType, ReactNode } from 'react';

export type TextVariant = 
  | 'h1' 
  | 'h2' 
  | 'h3' 
  | 'body' 
  | 'body-small' 
  | 'caption';

export interface TextProps {
  variant?: 'h1' | 'h2' | 'h3' | 'body' | 'caption' | 'link';
  children: ReactNode;
  className?: string;
  color?: 'primary' | 'secondary' | 'inverse';
  as?: ElementType;
  onClick?: () => void;
} 