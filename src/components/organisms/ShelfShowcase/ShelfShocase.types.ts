import type { Book } from '@/types/book';

export interface ShelfShowcaseProps {
  books: {
    id: string;
    book_isbn: string;
    added_at: string;
    book: Book;
  }[];
}
  