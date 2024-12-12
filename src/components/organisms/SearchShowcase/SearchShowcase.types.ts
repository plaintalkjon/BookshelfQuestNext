import type { Book } from '@/types/book';

export interface SearchShowcaseProps {
  query: string;
  books: Book[];
}