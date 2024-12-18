import NextImage from 'next/image';
import type { ImageProps } from './Image.types';
import './Image.css';

export function Image({ src, alt, className, caption, captionLink }: ImageProps) {


  return (
    <div className={`image-container ${className || ''}`} >
      <NextImage 
        src={src}
        alt={alt}
        fill        
      />
      {caption && (
        <p className="image-caption">
          {captionLink ? (
            <a href={captionLink}>{caption}</a>
          ) : caption}
        </p>
      )}
    </div>
  );
} 