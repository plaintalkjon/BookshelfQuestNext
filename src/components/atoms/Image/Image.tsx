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
  digitalOcean = false,
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
    width300height450: {
      width: 300,
      height: 450,
    },
    width300height400: {
      width: 300,
      height: 400,
    },
    width300height300: {
      width: 300,
      height: 300,
    },
  };

  return (
    <div
      className={`image-container ${
        variant ? `image-container-${variant}` : ""
      } ${className || ""}`}
    >
      <NextImage
          src={digitalOcean ? `https://plaintalkpostuploads.nyc3.digitaloceanspaces.com/bookshelfquest/public${src}` : src}
          alt={alt}
        width={variant ? imageWidthAndHeight[variant].width : imageWidthAndHeight.medium.width}
        height={variant ? imageWidthAndHeight[variant].height : imageWidthAndHeight.medium.height}
      />
      {caption && (
        <p className="image-caption">
          {captionLink ? <a href={captionLink}>{caption}</a> : caption}
        </p>
      )}
    </div>
  );
}
