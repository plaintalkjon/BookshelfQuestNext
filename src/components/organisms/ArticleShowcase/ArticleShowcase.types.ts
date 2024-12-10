import { Article } from "@/types/mdx";

export interface ArticleShowcaseProps {
  direction?: 'row' | 'column';
  title?: string | null;
  gridMinWidth?: string;
  articles: Article[];
} 