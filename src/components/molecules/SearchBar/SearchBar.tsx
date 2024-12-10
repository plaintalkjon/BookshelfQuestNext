'use client';

import { useState } from 'react';
import { Input } from '@/components/atoms';
import { BookInfo } from '@/components/molecules/BookInfo';
import { isbndbService } from '@/services/isbndb';
import { useDebounce } from '@/hooks/useDebounce';
import { useRouter } from 'next/navigation';
import type { Book } from '@/types/book';
import './SearchBar.css';

export const SearchBar = () => {
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleSearch = async (query: string) => {
    if (!query) {
      setSearchResults([]);
      setIsOpen(false);
      return;
    }

    setIsLoading(true);
    try {
      const { books } = await isbndbService.searchBooks(query);
      // Take only top 5 results
      setSearchResults(books.slice(0, 5));
      setIsOpen(true);
    } catch (error) {
      console.error('Search failed:', error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const debouncedSearch = useDebounce(handleSearch, 300);

  const handleSelect = (book: Book) => {
    router.push(`/books/${book.isbn13}`);
    setIsOpen(false);
    setSearchResults([]);
  };

  return (
    <div className="search-container">
      <Input
        type="search"
        placeholder="Search books..."
        onChange={(e) => debouncedSearch(e.target.value)}
        className="search-input"
        label=""
      />
      
      {isOpen && (
        <div className="search-results">
          {isLoading ? (
            <div className="search-loading">Loading...</div>
          ) : searchResults.length > 0 ? (
            searchResults.map((book) => (
              <div
                key={book.isbn13}
                className="search-result-item"
                onClick={() => handleSelect(book)}
              >
                <BookInfo
                  title={book.title}
                  authors={book.authors}
                  coverUrl={book.image}
                  imageWidth={50}
                  imageHeight={75}
                />
              </div>
            ))
          ) : (
            <div className="search-no-results">No results found</div>
          )}
        </div>
      )}
    </div>
  );
};