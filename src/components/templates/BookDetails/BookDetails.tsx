'use client';

import Image from 'next/image';
import { Text, Button } from '@/components/atoms';
import './BookDetails.css';
import { BookDetailsProps } from './BookDetails.types';


export const BookDetails = ({ book }: BookDetailsProps) => {
  return (
    <div className="book-details">
      <div className="book-header">
        <div className="book-cover">
          <Image
            src={book.image || '/images/default-cover.png'}
            alt={book.title || 'Book Cover'}
            width={300}
            height={450}
            priority
          />
        </div>
        
        <div className="book-info">
          <Text variant="h1">{book.title}</Text>
          <Text variant="h2">
            By {book.authors?.length ? book.authors.join(', ') : 'Unknown Author'}
          </Text>
          <Text variant="body">Published by {book.publisher}</Text>
          {book.published_date && (
            <Text variant="body">Published {book.published_date}</Text>
          )}
          
          <div className="book-actions">
            <Button variant="primary">Add to Library</Button>
            <Button variant="secondary">Add to Reading List</Button>
          </div>
        </div>
      </div>

      {book.synopsis && (
        <div className="book-synopsis">
          <Text variant="h2">Synopsis</Text>
          <Text variant="body">{book.synopsis}</Text>
        </div>
      )}

      {/* We can add more sections here like:
          - Reader Reviews
          - Similar Books
          - Reading Progress
          - Notes/Highlights
      */}
    </div>
  );
}; 