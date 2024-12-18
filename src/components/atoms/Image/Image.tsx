import NextImage from 'next/image';
import type { ImageProps } from './Image.types';
import './Image.css';

export function Image({ src, alt, className, style, caption, captionLink }: ImageProps) {
  return (
    <div className={`image-container ${className || ''}`}>
      <div className="image-wrapper" style={style}>
        <NextImage 
          src={src}
          alt={alt}
          fill
          style={{ objectFit: 'contain' }}
        />
      </div>
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