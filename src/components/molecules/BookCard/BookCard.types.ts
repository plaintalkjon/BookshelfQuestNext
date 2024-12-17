import type { Book } from '@/types/book';

export interface BookCardProps {
    book: Book;
    onClick?: () => void;
    href?: string;
    detailed?: boolean;
  }