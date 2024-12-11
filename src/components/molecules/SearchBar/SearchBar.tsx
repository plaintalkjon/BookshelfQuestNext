'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/atoms';
import { BookSearch } from '@/components/molecules/BookSearch';
import { bookService } from '@/services/book-search';
import { useDebounce } from '@/hooks/useDebounce';
import type { Book } from '@/types/book';
import './SearchBar.css';

export const SearchBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const router = useRouter();
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current && 
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const debouncedSearch = useDebounce(async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      setIsOpen(false);
      return;
    }

    setIsLoading(true);
    try {
      const results = await bookService.searchBooks(query);
      setSearchResults(results.slice(0, 5)); // Take top 5 results
      setIsOpen(true);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  }, 300);

  const handleSelect = (book: Book) => {
    setIsOpen(false);
    router.push(`/books/${book.isbn13}`);
  };

  return (
    <div className="search-container" ref={searchContainerRef}>
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
                key={`${book.isbn13}-${book.title}`}
                className="search-result-item"
                onClick={() => handleSelect(book)}
              >
                <BookSearch book={book} />
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