"use client";
import { useState } from "react";
import { BookSearch } from "@/components/molecules/BookSearch";
import { Text } from "@/components/atoms";
import { useAuth } from "@/hooks/useAuth";
import { useShelf } from "@/hooks/useShelf";
import "./SearchShowcase.css";
import type { Book } from "@/types/book";
import { findAllBooks } from "@/services/book-search";
import { bookUtils } from "@/services/book-utils";

interface SearchShowcaseProps {
  query: string;
  initialBooks: Book[];
}

export function SearchShowcase({
  query,
  initialBooks = [],
}: SearchShowcaseProps) {
  const { user } = useAuth();
  const { addToShelf } = useShelf();
  const [books, setBooks] = useState(initialBooks);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadMore = async () => {
    setLoading(true);
    const nextPage = page + 1;
    try {
      const searchResults = await findAllBooks(query, nextPage);
      const updatedBooks = bookUtils.isbn13DuplicateRemover([
        ...books,
        ...searchResults,
      ]);

      if (updatedBooks.length === books.length) {
        setHasMore(false);
      } else {
        setBooks(updatedBooks);
        setPage(nextPage);
      }
    } catch (error) {
      console.error("Error loading more books:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-showcase">
      <Text variant="h1">Search Results for &quot;{query}&quot;</Text>
      <div className="search-results-grid">
        {books.map((book) => (
          <BookSearch
            key={`${book.isbn13}-${book.title}-${page}`}
            book={book}
            href={`/books/${book.isbn13}`}
            detailed
          />
        ))}
      </div>

      {hasMore ? (
        <div className="load-more-container">
          <button
            onClick={loadMore}
            disabled={loading}
            className="load-more-button"
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      ) : (
        <div className="load-more-container">
          <Text variant="h3">All Results Loaded</Text>
        </div>
      )}
    </div>
  );
}