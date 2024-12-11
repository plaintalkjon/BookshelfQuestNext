import { isbndbService } from './isbndb';
import { googleBooksService } from './google-books';
import type { Book } from '@/types/book';

export const bookDetailsService = {
  async getBookDetails(isbn: string) {
    const [isbndbBook, googleBook] = await Promise.all([
      isbndbService.getBookByIsbn(isbn),
      googleBooksService.getBookByIsbn(isbn)
    ]);

    if (!isbndbBook && !googleBook) return null;
    return this.createCompositeBook(isbn, [isbndbBook, googleBook]);
  },

  createCompositeBook(isbn: string, books: (Book | null)[]): Book {

    return {
      isbn13: isbn,
      title: this.getBestField('title', books),
      authors: this.getBestField('authors', books),
      published_date: this.getBestField('published_date', books),
      synopsis: this.getBestField('synopsis', books),
      image: this.getBestField('image', books)?.replace('&edge=curl', ''),
      categories: this.getBestField('categories', books),
    };
  },

  getBestField<K extends keyof Book>(field: K, books: (Book | null)[]): Book[K] {
    const validBooks = books.filter((book): book is Book => book !== null);

    type ScoreFunction<K extends keyof Book> = (
      value: Book[K],
      allBooks: Book[],
      book: Book
    ) => number;

    const fieldScores: { [K in keyof Book]?: ScoreFunction<K> } = {
      title: (title, allBooks, book) => {
        if (!title) return 0;
        
        // Get the current book's author
        const bookAuthor = book.authors?.[0]?.toLowerCase();
        if (!bookAuthor) return 0;

        // Count how many books this author has
        const authorFrequency = allBooks.filter(
          b => b.authors?.[0]?.toLowerCase() === bookAuthor
        ).length;

        // Shorter titles get higher scores (negative length)
        const titleScore = -title.length;

        // Combine author frequency and title length
        // Multiply by 1000 to prioritize author frequency over title length
        return (authorFrequency * 1000) + titleScore;
      },
      
      authors: (authors, allBooks) => 
        authors?.length ? allBooks.filter(b => b.authors?.[0]?.toLowerCase() === authors[0]?.toLowerCase()).length : 0,
      
      published_date: (date, allBooks, book) => {
        if (!date) return 0;
        const bookAuthor = book.authors?.[0]?.toLowerCase();
        const validDates = allBooks
          .filter(b => b.authors?.[0]?.toLowerCase() === bookAuthor)
          .map(b => new Date(b.published_date || '').getTime())
          .filter(d => !isNaN(d));
        return validDates.length ? -Math.min(...validDates) : 0;
      },
      
      synopsis: (text) => 
        (!text) ? 0 : text.length,
      
      image: (url) => {
        if (!url) return 0;
        
        if (url.includes('books.google.com')) {
          // Score based on zoom level
          if (url.includes('zoom=6')) return 6; // extraLarge
          if (url.includes('zoom=4')) return 5; // large
          if (url.includes('zoom=3')) return 4; // medium
          if (url.includes('zoom=2')) return 0; // small
          if (url.includes('zoom=1')) return -1; // thumbnail
          return -2; // smallThumbnail
        }
        
        // Non-Google images get lowest priority
        return 3;
      },
      
      categories: (cats) => 
        cats?.length || 0
    };

    return validBooks
      .map(book => ({
        value: book[field],
        score: fieldScores[field]?.(
          book[field] as Book[K],
          validBooks,
          book
        ) || 0
      }))
      .sort((a, b) => b.score - a.score)[0]?.value;
  }
}; 