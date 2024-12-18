import type { Book } from '@/types/book';

export interface ShelfShowcaseProps {
  books: {
    id: string;
    book_isbn13: string;
    added_at: string;
    book: Book;
  }[];
}
  