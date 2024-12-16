'use client';
import { BookSearch } from '@/components/molecules/BookSearch';
import { Text } from '@/components/atoms';
import './ShelfShowcase.css';
import { ShelfShowcaseProps } from './ShelfShocase.types';

export function ShelfShowcase({ books }: ShelfShowcaseProps) {
  return (
    <div className="shelf-showcase">
      <Text variant="h1">My Bookshelf</Text>
      <div className="shelf-grid">
        {books.map((entry) => (
          <BookSearch 
            key={entry.id}
            book={entry.book}
            href={`/books/${entry.book_isbn}`}
            detailed={true}
          />
        ))}
      </div>
    </div>
  );
} 