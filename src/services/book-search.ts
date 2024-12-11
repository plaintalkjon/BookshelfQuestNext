import { isbndbService } from './isbndb';
import { googleBooksService } from './google-books';
import type { Book } from '@/types/book';

export const bookService = {
  async searchBooks(query: string) {
    // Search both services in parallel
    const [isbndbResults, googleResults] = await Promise.all([
      isbndbService.searchBooks(query),
      googleBooksService.searchBooks(query)
    ]);

    // Combine and validate all books
    const allBooks = [...isbndbResults.books, ...googleResults.books]
      .filter(isValidBook);
    console.log("googleResults.books", googleResults.books);
    // Group books by author
    const authorGroups = allBooks.reduce((acc, book) => {
      const author = normalizeAuthor(book.authors?.[0] || 'Unknown');
      if (!acc[author]) {
        acc[author] = {
          books: [],
          authorCount: 0,
          bestBook: null
        };
      }
      acc[author].books.push(book);
      acc[author].authorCount++;
      
      // Update best book if this one scores higher
      const score = scoreBookData(book);
      if (!acc[author].bestBook || score > scoreBookData(acc[author].bestBook)) {
        acc[author].bestBook = book;
      }
      
      return acc;
    }, {} as Record<string, { books: Book[], authorCount: number, bestBook: Book | null }>);
    console.log("authorGroups", authorGroups);
    // Sort by author frequency and return best books
    return Object.values(authorGroups)
      .sort((a, b) => b.authorCount - a.authorCount)
      .map(group => group.bestBook)
      .filter((book): book is Book => book !== null);
  }
}; 

export function scoreBookData(book: Book): number {
  let score = 0;
  
  // Content quality scores
  if (book.synopsis) score += 30;
  if (book.synopsis && book.synopsis?.length > 100) score += 20;
  if (book.image) score += 15;
  if (book.categories?.length) score += 10;
  if (book.rating) score += 10;
  
  // Basic info scores
  if (book.authors?.length) score += 5;
  if (book.publisher) score += 5;
  if (book.published_date) score += 5;
  if (book.pages) score += 5;
  if (book.language) score += 5;

  return score;
}

export function deduplicateAndScoreBooks(books: Book[]): Book[] {
  // Group books by normalized title and first author
  const bookGroups = books.reduce((acc, book) => {
    const key = normalizeBookKey(book);
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(book);
    return acc;
  }, {} as Record<string, Book[]>);

  // For each group, return the highest scored book
  return Object.values(bookGroups)
    .map(group => {
      return group
        .map(book => ({ book, score: scoreBookData(book) }))
        .sort((a, b) => b.score - a.score)[0].book;
    });
}

function normalizeBookKey(book: Book): string {
  const normalizedTitle = book.title?.toLowerCase().trim() || '';
  const firstAuthor = book.authors?.[0]?.toLowerCase().trim() || '';
  return `${normalizedTitle}|${firstAuthor}`;
} 

function isValidBook(book: Partial<Book>): book is Book {
  return !!book.isbn13 && !!book.title;
} 

function normalizeAuthor(author: string): string {
  return author
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .trim();
} 