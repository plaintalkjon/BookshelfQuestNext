import { isbndb } from '@/lib/isbndb';
import type { Book, SearchResponse } from '@/types/book';

type BookGroup = { book: Book; count: number };

export const isbndbService = {
  // Search books by query
  async searchBooks(query: string): Promise<SearchResponse> {
    try {
      // Fetch first 10 pages in parallel (200 books total)
      const pages = await Promise.all([
        isbndb.fetch(`/books/${encodeURIComponent(query)}?page=1&pageSize=200&language=en`),
      ]);

      // Combine all books
      const allBooks = pages.flatMap(page => page.books);

      console.log('ISBNDB Response:', {
        total: pages[0].total,
        resultCount: allBooks.length,
        sampleBook: allBooks[0]
      });

      // Normalize title function
      const normalizeTitle = (title: string) => {
        return title
          .split(':')[0]  // Take only the main title before any subtitle
          .toLowerCase()
          .replace(/[^a-z0-9\s]/g, '')
          .replace(/\s+/g, ' ')
          .trim();
      };

      // Group books and count editions using normalized titles
      const bookGroups = allBooks.reduce((acc: { [key: string]: { book: Book; count: number } }, book: Book) => {
        const normalizedTitle = normalizeTitle(book.title);
        if (!acc[normalizedTitle]) {
          acc[normalizedTitle] = { book, count: 1 };
        } else {
          acc[normalizedTitle].count += 1;
          if ((book.image && !acc[normalizedTitle].book.image) || 
              (book.publisher && !acc[normalizedTitle].book.publisher)) {
            acc[normalizedTitle].book = book;
          }
        }
        return acc;
      }, {});

      const sortedBooks = (Object.values(bookGroups) as BookGroup[])
        .sort((a: BookGroup, b: BookGroup) => {
          if (b.count !== a.count) return b.count - a.count;
          if (a.book.image && !b.book.image) return -1;
          if (!a.book.image && b.book.image) return 1;
          return 0;
        })
        .map(group => group.book) as Book[];

      return {
        books: sortedBooks.slice(0, 5),
        total: sortedBooks.length
      };
    } catch (error) {
      console.error('Search books error:', error);
      return { books: [], total: 0 };
    }
  },

  // Get book by ISBN
  async getBookByIsbn(isbn: string): Promise<Book | null> {
    try {
      const response = await isbndb.fetch(`/book/${isbn}`);
      const data = response.book;  // Access the nested book object
      console.log(data);
      return {
        isbn13: data.isbn13,
        title: data.title,
        authors: data.authors || [],
        pages: data.pages,
        publisher: data.publisher,
        published_date: data.date_published,
        edition: data.edition,
        synopsis: data.synopsis,
        image: data.image,
        binding: data.binding
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