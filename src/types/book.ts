export interface Book {
  isbn13?: string;
  title?: string;
  authors?: string[];
  publisher?: string;
  published_date?: string;
  synopsis?: string;
  image?: string;
  pages?: number;
  edition?: string;
  related?: string[];
  binding?: string;
  categories?: string[];
  rating?: number;
  language?: string;
  editions?: Book[];
}

export interface SearchResponse {
  books: Book[];
  total: number;
}

// For pagination and search params
export interface BookSearchParams {
  query: string;
  page?: number;
  limit?: number;
} 