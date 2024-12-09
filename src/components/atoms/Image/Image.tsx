import NextImage from 'next/image';
import type { ImageProps } from './Image.types';


export const Image = ({ 
  alt, 
  className = '', 
  fallback = '/images/default.png',
  width = 500,
  height = 300,
  ...props 
}: ImageProps) => {
  const handleError = () => {
    // Handle error by switching src to fallback
    if (props.src !== fallback) {
      props.src = fallback;
    }
  };

  return (
    <NextImage
      alt={alt}
      className={`image ${className}`}
      onError={handleError}
      width={width}
      height={height}
      {...props}
    />
  );
}; 