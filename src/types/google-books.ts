export interface GoogleBookIdentifier {
  type: 'ISBN_13' | 'ISBN_10' | 'OTHER';
  identifier: string;
}

export interface GoogleBookVolumeInfo {
  title: string;
  authors?: string[];
  publisher?: string;
  publishedDate?: string;
  description?: string;
  industryIdentifiers?: GoogleBookIdentifier[];
  pageCount?: number;
  subjects?: string[];
  averageRating?: number;
  imageLinks?: {
    thumbnail?: string;
  };
  language?: string;
}

export interface GoogleBook {
  volumeInfo: GoogleBookVolumeInfo;
}

export interface GoogleBooksResponse {
  items?: GoogleBook[];
  totalItems: number;
} 