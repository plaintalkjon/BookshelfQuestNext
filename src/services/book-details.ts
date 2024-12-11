import { isbndbService } from "./isbndb";
import { googleBooksService } from "./google-books";
import type { Book } from "@/types/book";

export const bookDetailsService = {
  async getBookDetails(isbn: string) {
    // 1. Get initial book and create composite
    const [isbndbBook, googleBook] = await Promise.all([
      isbndbService.getBookByIsbn(isbn),
      googleBooksService.getBookByIsbn(isbn),
    ]);
    console.log("isbndbBook", isbndbBook);
    console.log("googleBook", googleBook);
    if (!isbndbBook && !googleBook) return null;
    const mainBook = this.createCompositeBook(isbn, [isbndbBook, googleBook]);

    // 2. Search for all editions to find best synopsis
    const searchQuery = `${mainBook.title} ${mainBook.authors?.[0] || ""}`;
    const [isbndbEditions, googleEditions] = await Promise.all([
      isbndbService.searchBooks(searchQuery),
      googleBooksService.searchBooks(searchQuery),
    ]);

    // 3. Filter to related editions with complete data
    const relatedEditions: Book[] = [
      ...isbndbEditions.books,
      ...googleEditions.books,
    ].filter((book) => this.isRelatedEdition(book, mainBook));
    // 4. Create final book with best synopsis, categories and all editions

    return {
      ...mainBook,
      synopsis: this.getBestField("synopsis", [mainBook, ...relatedEditions]),
      // Combine unique categories from all related editions
      categories: Array.from(new Set([
        ...(mainBook.categories || []),
        ...relatedEditions.flatMap(book => book.categories || [])
      ])),
      editions: [
        ...relatedEditions.filter((book) => book.isbn13 != mainBook.isbn13 && this.isCompleteEdition(book)),
      ],
    };
  },

  isRelatedEdition(candidate: Book, mainBook: Book): boolean {
    if (!candidate.title || !mainBook.title) return false;

    const normalizeStr = (str: string) =>
      str.toLowerCase().replace(/[^a-z0-9]/g, "");

    const titleMatch =
      normalizeStr(candidate.title) === normalizeStr(mainBook.title);
    const authorMatch = Boolean(
      candidate.authors?.[0] &&
        mainBook.authors?.[0] &&
        normalizeStr(candidate.authors[0]) === normalizeStr(mainBook.authors[0])
    );

    return titleMatch && authorMatch;
  },

  createCompositeBook(isbn: string, books: (Book | null)[]): Book {
    const validBooks = books.filter((book): book is Book => book !== null);
    // Create the best version of the book
    const bestBook: Book = {
      isbn13: isbn,
      title: this.getBestField("title", validBooks),
      authors: this.getBestField("authors", validBooks),
      date_published: this.getBestField("date_published", validBooks),
      synopsis: this.getBestField("synopsis", validBooks),
      image: this.getBestField("image", validBooks)
        ?.replace(/zoom=[1-5]/, "zoom=6")
        .replace("&edge=curl", ""),
      categories: this.getBestField("categories", validBooks),
      // Store all valid editions, including the original books
      editions: validBooks.map((book) => ({
        ...book,
        // Ensure each edition has a high-quality image
        image: book.image
          ?.replace(/zoom=[1-5]/, "zoom=6")
          .replace("&edge=curl", ""),
      })),
    };
    return bestBook;
  },

  getBestField<K extends keyof Book>(
    field: K,
    books: (Book | null)[]
  ): Book[K] {
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
          (b) => b.authors?.[0]?.toLowerCase() === bookAuthor
        ).length;

        // Shorter titles get higher scores (negative length)
        const titleScore = -title.length;

        // Combine author frequency and title length
        // Multiply by 1000 to prioritize author frequency over title length
        return authorFrequency * 1000 + titleScore;
      },

      authors: (authors, allBooks) =>
        authors?.length
          ? allBooks.filter(
              (b) => b.authors?.[0]?.toLowerCase() === authors[0]?.toLowerCase()
            ).length
          : 0,

      date_published: (date, allBooks, book) => {
        if (!date) return 0;
        const bookAuthor = book.authors?.[0]?.toLowerCase();
        const validDates = allBooks
          .filter((b) => b.authors?.[0]?.toLowerCase() === bookAuthor)
          .map((b) => new Date(b.date_published || "").getTime())
          .filter((d) => !isNaN(d));
        return validDates.length ? -Math.min(...validDates) : 0;
      },

      // Synopsis score is focused on length, readability, and frequency across editions
      synopsis: (text) => {
        if (!text ||
            text.length > 1500 ||
            text.includes("--")) {
          return 0;
        }



        return text.length;
      },

      image: (url) => {
        if (!url) return 0;

        if (url.includes("books.google.com")) {
          // Score based on zoom level
          if (url.includes("zoom=6")) return 6; // extraLarge
          if (url.includes("zoom=4")) return 5; // large
          if (url.includes("zoom=3")) return 4; // medium
          if (url.includes("zoom=2")) return 0; // small
          if (url.includes("zoom=1")) return -1; // thumbnail
          return -2; // smallThumbnail
        }

        // Non-Google images get lowest priority
        return 3;
      },

      categories: (cats, allBooks, book) => {
        if (!cats?.length) return 0;
        
        // Get all categories from books by the same author
        const bookAuthor = book.authors?.[0]?.toLowerCase();
        if (!bookAuthor) return 0;

        const allCategories = new Set<string>();
        allBooks
          .filter(b => b.authors?.[0]?.toLowerCase() === bookAuthor)
          .forEach(b => b.categories?.forEach(cat => allCategories.add(cat)));

        // Score based on how many of this book's categories are in the complete set
        const validCategories = cats.filter(cat => allCategories.has(cat));
        return validCategories.length * 1000 + allCategories.size;
      },
    };

    return validBooks
      .map((book) => ({
        value: book[field],
        score:
          fieldScores[field]?.(book[field] as Book[K], validBooks, book) || 0,
      }))
      .sort((a, b) => b.score - a.score)[0]?.value;
  },

  isCompleteEdition(book: Book): boolean {
    // Try to parse the date and check if it's valid
    const isValidDate = (dateStr?: string) => {
      if (!dateStr) return false;
      const date = new Date(dateStr);
      return !isNaN(date.getTime()) && date.getFullYear() > 1000;
    };
    
    return Boolean(
      isValidDate(book.date_published) &&
      book.image &&
      book.isbn13 &&
      book.publisher 
    );
  },
};
