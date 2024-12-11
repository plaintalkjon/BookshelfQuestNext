
export type TextVariant = 
  | 'h1' 
  | 'h2' 
  | 'h3' 
  | 'body' 
  | 'body-small' 
  | 'caption';

export interface TextProps {
  variant: 'h1' | 'h2' | 'h3' | 'body' | 'label';
  children?: React.ReactNode;
  className?: string;
  color?: 'primary' | 'secondary' | 'inverse';
  as?: React.ElementType;
  onClick?: () => void;
  dangerouslySetInnerHTML?: {
    __html: string;
  };
} 