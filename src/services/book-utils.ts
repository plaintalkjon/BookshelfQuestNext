import type { Book } from '@/types/book';
import { isbndbService } from "./isbndb";

export const bookUtils = {
  isCompleteBook(book: Book): boolean {
    return Boolean(
      book.title &&
      book.authors?.length &&
      book.publisher &&
      book.date_published &&
      book.image &&
      book.binding &&
      !(book.binding?.toString().toLowerCase().includes("paperback") || book.binding?.toString().toLowerCase().includes("kindle") || book.binding?.toString().toLowerCase().includes("ebook") || book.binding?.toString().toLowerCase().includes("audio"))
    );
  },

  async getAllRelatedEditions (book: Book) {

    // A lot of books have a " (Paperback)" or " (Kindle)" or " (Ebook)" or " (Audio)" at the end of the title.
    if (book.title && book.title.includes("(")) {
      book.title = book.title.split("(")[0].trim();
    }
    // Fetch based on title
      const isbndbEditions = await isbndbService.searchBooks(book.title || '');

      // Filters to remove duplicates and incomplete books
      const relatedEditions = isbndbEditions.books
        .filter(edition => bookUtils.isRelatedEdition(edition, book))
        .filter(edition => edition.isbn13 !== book.isbn13)
        .filter(edition => bookUtils.isCompleteBook(edition));

      return relatedEditions;
  },

  isRelatedEdition(book: Book, originalBook: Book): boolean {
    return book.title === originalBook.title && 
           book.authors?.length === originalBook.authors?.length;
  },

  isbn13DuplicateRemover(books: Book[]): Book[] {
    return books.filter((book, index, self) => 
      index === self.findIndex(t => t.isbn13 === book.isbn13)
    );
  }
}; 