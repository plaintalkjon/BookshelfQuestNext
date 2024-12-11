import { isbndb } from '@/lib/isbndb';
import type { Book, SearchResponse } from '@/types/book';

export const isbndbService = {
  async getBookByIsbn(isbn: string): Promise<Book | null> {
    try {
      const response = await isbndb.fetch(`/book/${isbn}`);
      const data = response.book;
      console.log("data", data);
      return {
        isbn13: data.isbn13,
        title: data.title,
        authors: data.authors || [],
        pages: data.pages,
        publisher: data.publisher,
        date_published: data.date_published,
        edition: data.edition,
        synopsis: data.synopsis,
        image: data.image,
        binding: data.binding,
        subjects: data.subjects || [],
        
      };
    } catch (error) {
      console.error('Get book error:', error);
      return null;
    }
  },

  async searchBooks(query: string): Promise<SearchResponse> {
    try {
      const data = await isbndb.fetch(
        `/books/${encodeURIComponent(query)}?page=1&pageSize=200&language=en`
      );
      return {
        books: data.books || [],
        total: data.total || 0
      };
    } catch (error) {
      console.error('Search books error:', error);
      return { books: [], total: 0 };
    }
  }
}; 