export type TextVariant = 
  | 'h1' 
  | 'h2' 
  | 'h3' 
  | 'body' 
  | 'body-small' 
  | 'caption';

export interface TextProps {
  variant?: TextVariant;
  children: React.ReactNode;
  className?: string;
  color?: 'primary' | 'secondary' | 'inverse';
  as?: keyof JSX.IntrinsicElements;
  onClick?: () => void;
} 