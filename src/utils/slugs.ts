import { nextJsArticle } from "@/data/articles/nextjs-guide";

export function createSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-')     // Replace spaces with hyphens
    .replace(/-+/g, '-')      // Replace multiple hyphens with single hyphen
    .trim();
}

export function getArticleBySlug(slug: string) {
  const articles = {
    'nextjs-guide': nextJsArticle,
    // Add more articles here as they're created
  };

  return articles[slug as keyof typeof articles];
} 