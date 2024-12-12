import { BookSearch } from '@/components/molecules/BookSearch';
import { Text } from '@/components/atoms';
import './SearchShowcase.css';
import type { SearchShowcaseProps } from './SearchShowcase.types';

export const SearchShowcase = ({ query, books }: SearchShowcaseProps) => {

    return (
    <div className="search-showcase">
      <Text variant="h1">Search Results for &quot;{query}&quot;</Text>
      <div className="search-results-grid">
        {books.map((book) => (
          <BookSearch 
            key={`${book.isbn13}-${book.title}`}
            book={book}
            href={`/books/${book.isbn13}`}
          />
        ))}
      </div>
    </div>
  );
}; 