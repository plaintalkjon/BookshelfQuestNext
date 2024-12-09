import { nextJsArticle } from './nextjs-guide';

export const articles = [
  nextJsArticle,
  // Add more articles here as you create them
] as const;

// Optional: Export type for article structure
export type Article = typeof articles[number];