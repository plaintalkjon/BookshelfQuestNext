import { SyntheticEvent } from "react";

export interface ImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  caption?: string;
  captionLink?: string;
  variant: "small" | "medium" | "large";
  onLoad?: (e: SyntheticEvent<HTMLImageElement>) => void;
}