'use client';
import { BookCard } from '@/components/molecules/BookCard';
import { Text } from '@/components/atoms';
import './ShelfShowcase.css';
import { ShelfShowcaseProps } from './ShelfShocase.types';

export function ShelfShowcase({ books }: ShelfShowcaseProps) {
  if (!books || books.length === 0) {
    return (
      <div className="shelf-showcase">
        <Text variant="h1">My Bookshelf</Text>
        <Text variant="body">Your bookshelf is empty. Start adding books!</Text>
      </div>
    );
  }

  return (
    <div className="shelf-showcase">
      <Text variant="h1">My Bookshelf</Text>
      <div className="shelf-grid">
        {books.map((entry) => (
          entry.book && (
            <BookCard 
              key={entry.book_isbn13}
              book={entry.book}
              href={`/books/${entry.book.isbn13}`}
              detailed={true}
            />
          )
        ))}
      </div>
    </div>
  );
} 