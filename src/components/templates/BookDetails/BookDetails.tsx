'use client';

import Image from 'next/image';
import { Text, Button } from '@/components/atoms';
import './BookDetails.css';
import { BookDetailsProps } from './BookDetails.types';
import DOMPurify from 'isomorphic-dompurify';

export const BookDetails = ({ book }: BookDetailsProps) => {
  return (
    <div className="book-details-container">
      <div className="book-header">
        <div className="book-cover">
          <Image
            src={book.image || '/images/default-cover.png'}
            alt={book.title}
            width={300}
            height={450}
            priority
            className="cover-image"
          />
        </div>
        
        <div className="book-info">
          <div className="book-main-info">
            <Text variant="h1">{book.title}</Text>
            <Text variant="h2">{book.authors?.join(', ') || 'Unknown Author'}</Text>
          </div>

          <div className="book-metadata">
            {book.publisher && (
              <div className="metadata-item">
                <Text variant="body">Publisher</Text>
                <Text variant="body">{book.publisher}</Text>
              </div>
            )}
          </div>

          <div className="book-actions">
            <Button variant="primary">Add to Library</Button>
            <Button variant="secondary">Add to Reading List</Button>
          </div>
        </div>
      </div>

      {book.synopsis && (
        <div className="book-synopsis">
          <Text variant="h2">Synopsis</Text>
          <Text 
            variant="body" 
            dangerouslySetInnerHTML={{ 
              __html: DOMPurify.sanitize(book.synopsis) 
            }} 
          />
        </div>
      )}

      {book.categories && book.categories.length > 0 && (
        <div className="book-categories">
          <Text variant="h2">Categories</Text>
          <div className="category-tags">
            {book.categories.map(category => (
              <span key={category} className="category-tag">
                {category}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}; 