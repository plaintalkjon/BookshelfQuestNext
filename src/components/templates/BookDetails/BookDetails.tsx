"use client";

import Image from "next/image";
import { Text, Button } from "@/components/atoms";
import "./BookDetails.css";
import { BookDetailsProps } from "./BookDetails.types";
import DOMPurify from "isomorphic-dompurify";
import { BookEditionsGrid } from "@/components/organisms/BookEditionsGrid/BookEditionsGrid";
import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export const BookDetails = ({ book }: BookDetailsProps) => {
  const [isAdding, setIsAdding] = useState(false);
  const supabase = createClientComponentClient();

  const addToShelf = async () => {
    setIsAdding(true);
    try {
      const { error } = await supabase
        .from('user_books')
        .insert({
          book_isbn: book.isbn13,
        });

      if (error) throw error;
      // Show success message
    } catch (error) {
      console.error('Error adding book to shelf:', error);
      // Show error message
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="book-details-container">
      <div className="book-header">
        <div className="book-details-cover">
          <Image
            src={book.image || "/images/default-cover.png"}
            alt={book.title || "Book Cover"}
            width={300}
            height={450}
            priority
            className="cover-image"
          />
        </div>

        <div className="book-info">
          <div className="book-main-info">
            <Text variant="h1">{book.title}</Text>
            <Text variant="h2">
              {book.authors?.join(", ") || "Unknown Author"}
            </Text>
          </div>

          {(book.publisher || book.date_published || book.binding) && (
            <div className="book-publisher-info">
              <Text variant="h2">Publication Details</Text>
              <div className="publisher-details">
                {book.publisher && <Text variant="body">Publisher: {book.publisher}</Text>}
                {book.date_published && <Text variant="body">Published: {book.date_published}</Text>}
                {book.binding && <Text variant="body">Format: {book.binding}</Text>}
              </div>
            </div>
          )}

          {book.synopsis && (
            <div className="book-details-synopsis">
              <Text
                variant="body"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(book.synopsis),
                }}
              />
            </div>
          )}

          <div className="book-actions">
            <Button variant="primary" onClick={addToShelf} disabled={isAdding}>
              {isAdding ? 'Adding...' : 'Add to Shelf'}
            </Button>
            <Button variant="secondary">Add to Reading List</Button>
          </div>
        </div>
      </div>

      {book.subjects && book.subjects.length > 0 && (
        <div className="book-details-subjects">
          <Text variant="h2">Categories</Text>
          <div className="category-tags">
            {book.subjects.map((category) => (
              <span key={category} className="category-tag">
                {category}
              </span>
            ))}
          </div>
        </div>
      )}
      {book.editions && book.editions.length > 1 && (
        <div className="book-editions">
          <Text variant="h2">Other Editions</Text>
          <BookEditionsGrid editions={book.editions} />
        </div>
      )}
    </div>
  );
};
