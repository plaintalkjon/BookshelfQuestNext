import type { Book } from '@/types/book';

export interface BookSearchProps {
    book: Book;
    onClick?: () => void;
    href?: string;
  }