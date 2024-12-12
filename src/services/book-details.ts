import { isbndbService } from "./isbndb";
import { googleBooksService } from "./google-books";
import { bookUtils } from './book-utils';

export const bookDetailsService = {
  async getBookDetails(isbn: string) {
    const isbndbBook = await isbndbService.getBookByIsbn(isbn);
    
    if (isbndbBook && bookUtils.isCompleteBook(isbndbBook)) {
      const isbndbEditions = await isbndbService.searchBooks(isbndbBook.title || '');

      // Get all subjects from main book and editions
      const subjectFrequency = new Map<string, number>();
      
      [...isbndbEditions.books, isbndbBook].forEach(book => {
        book.subjects?.forEach(subject => {
          if (subject.length > 2 && !subject.includes('Kindle')) {
            const count = subjectFrequency.get(subject) || 0;
            subjectFrequency.set(subject, count + 1);
          }
        });
      });

      // Get top 5 most common subjects
      const commonSubjects = Array.from(subjectFrequency.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([subject]) => subject);

      const relatedEditions = isbndbEditions.books
        .filter(book => bookUtils.isRelatedEdition(book, isbndbBook))
        .filter(book => book.isbn13 !== isbndbBook.isbn13)
        .filter(book => bookUtils.isCompleteBook(book));

      return {
        ...isbndbBook,
        subjects: commonSubjects,
        editions: relatedEditions
      };
    }

    const googleBook = await googleBooksService.getBookByIsbn(isbn);
    return googleBook;
  }
};
