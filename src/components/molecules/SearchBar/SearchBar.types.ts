import type { Book } from "@/types/book";

export interface SearchBarProps {
  onSearch: (query: string) => void;
  onSelect: (book: Book) => void;
}

export interface SearchResult {
  isOpen: boolean;
  books: Book[];
  isLoading: boolean;
}
