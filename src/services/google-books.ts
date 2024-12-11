import type { GoogleBook, GoogleBooksResponse } from "@/types/google-books";

const GOOGLE_BOOKS_API = "https://www.googleapis.com/books/v1";


export const googleBooksService = {
  async getBookByIsbn(isbn: string) {
    try {
      const response = await fetch(
        `${GOOGLE_BOOKS_API}/volumes?q=isbn:${isbn}`
      );
      const data = await response.json();

      if (!data.items?.[0]) return null;

      const book = data.items[0].volumeInfo;
      return {
        isbn13: isbn,
        title: book.title,
        authors: book.authors || [],
        publisher: book.publisher,
        date_published: book.publishedDate,
        synopsis: book.description,
        image: book.imageLinks?.extraLarge?.replace("http:", "https:"),
        pages: book.pageCount,
        subjects: book.subjects,
        rating: book.averageRating,
        language: book.language,
      };
    } catch (error) {
      console.error("Google Books API error:", error);
      return null;
    }
  },

  async searchBooks(query: string) {
    try {
      const response = await fetch(
        `${GOOGLE_BOOKS_API}/volumes?q=${encodeURIComponent(query)}`
        + '&maxResults=40'
        + '&langRestrict=en'
        + '&printType=books'
        + '&orderBy=relevance'
        + '&fields=items(volumeInfo)'
      );
      const data = await response.json() as GoogleBooksResponse;

      return {
        books:
          data.items?.map((item: GoogleBook) => ({
            isbn13: item.volumeInfo.industryIdentifiers?.find(
              (id) => id.type === "ISBN_13"
            )?.identifier,
            title: item.volumeInfo.title,
            authors: item.volumeInfo.authors || [],
            publisher: item.volumeInfo.publisher,
            date_published: item.volumeInfo.publishedDate,
            synopsis: item.volumeInfo.description,
            image: item.volumeInfo.imageLinks?.thumbnail?.replace(
              "http:",
              "https:"
            ),
          })) || [],
      };
    } catch (error) {
      console.error("Google Books search error:", error);
      return { books: [] };
    }
  },
};
