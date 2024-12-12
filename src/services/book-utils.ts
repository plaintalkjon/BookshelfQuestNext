import type { Book } from '@/types/book';

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

  isRelatedEdition(book: Book, originalBook: Book): boolean {
    return book.title === originalBook.title && 
           book.authors?.length === originalBook.authors?.length;
  },

}; 