import NextImage from 'next/image';
import type { ImageProps } from './Image.types';

export const Image = ({ 
  alt, 
  className = '', 
  width = 500,
  height = 300,
  ...props 
}: ImageProps) => {
  return (
    <NextImage
      alt={alt}
      className={`image ${className}`}
      width={width}
      height={height}
      {...props}
    />
  );
}; 