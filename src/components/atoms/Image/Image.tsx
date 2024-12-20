import NextImage from "next/image";
import type { ImageProps } from "./Image.types";
import "./Image.css";

export function Image({
  src,
  alt,
  className,
  variant,
  caption,
  captionLink,
}: ImageProps) {
 
  const imageWidthAndHeight = {
    small: {
      width: 75,
      height: 100,
    },
    medium: {
      width: 150,
      height: 200,
    },
    large: {
      width: 300,
      height: 400,
    },
  };

  return (
    <div
      className={`image-container ${
        variant ? `image-container-${variant}` : ""
      } ${className || ""}`}
    >
      <NextImage
        src={src}
        alt={alt}
        width={variant ? imageWidthAndHeight[variant].width : imageWidthAndHeight.medium.width}
        height={variant ? imageWidthAndHeight[variant].height : imageWidthAndHeight.medium.height}
        variant={variant}
      />
      {caption && (
        <p className="image-caption">
          {captionLink ? <a href={captionLink}>{caption}</a> : caption}
        </p>
      )}
    </div>
  );
}
