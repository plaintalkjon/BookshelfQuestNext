
export type TextVariant = 
  | 'h1' 
  | 'h2' 
  | 'h3' 
  | 'h4'
  | 'h5'
  | 'h6'
  | 'body' 
  | 'body-small' 
  | 'caption';

export interface TextProps {
  variant: TextVariant;
  children?: React.ReactNode;
  className?: string;
  color?: 'primary' | 'secondary' | 'inverse';
  as?: React.ElementType;
  onClick?: () => void;
  dangerouslySetInnerHTML?: {
    __html: string;
  };
} 