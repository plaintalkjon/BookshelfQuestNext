import { ImgHTMLAttributes } from 'react';
import './Image.css';

export interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  alt: string;
  className?: string;
  fallback?: string;
}

export const Image = ({ 
  alt, 
  className = '', 
  fallback = '/images/default.png',
  ...props 
}: ImageProps) => {
  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = fallback;
  };

  return (
    <img
      alt={alt}
      className={`image ${className}`}
      onError={handleError}
      {...props}
    />
  );
}; 