import { isbndb } from '@/lib/isbndb';
import type { Book, SearchResponse } from '@/types/book';

export const isbndbService = {
  // Search books by query
  async searchBooks(query: string): Promise<SearchResponse> {
    try {
      const data = await isbndb.fetch(`/books/${encodeURIComponent(query)}`);
      return {
        books: data.books || [], // Map API response to our interface
        total: data.total || 0
      };
    } catch (error) {
      console.error('Search books error:', error);
      return { books: [], total: 0 };
    }
  },

  // Get book by ISBN
  async getBookByIsbn(isbn: string): Promise<Book | null> {
    try {
      const data = await isbndb.fetch(`/book/${isbn}`);
      return {
        isbn13: data.isbn13,
        title: data.title,
        authors: data.authors || [],
        publisher: data.publisher,
        published_date: data.published_date,
        synopsis: data.synopsis,
        image: data.image
      };
    } catch (error) {
      console.error('Get book error:', error);
      return null;
    }
  },

  // Search books by author
  async searchByAuthor(author: string): Promise<SearchResponse> {
    try {
      const data = await isbndb.fetch(`/author/${encodeURIComponent(author)}`);
      return {
        books: data.books || [],
        total: data.total || 0
      };
    } catch (error) {
      console.error('Search by author error:', error);
      return { books: [], total: 0 };
    }
  }
}; 