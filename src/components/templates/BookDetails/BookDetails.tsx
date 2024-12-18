"use client";

import { Text } from "@/components/atoms";
import { BookCard } from "@/components/molecules";
import { BookEditionsGrid } from "@/components/organisms/BookEditionsGrid/BookEditionsGrid";
import "./BookDetails.css";
import { BookDetailsProps } from "./BookDetails.types";
import DOMPurify from "isomorphic-dompurify";

export const BookDetails = ({ book }: BookDetailsProps) => {
  return (
    <div className="book-details-container">
      <div className="book-header">
        <BookCard 
          book={book}
          detailed={true}
        />
        
        <div className="book-info">
          {book.synopsis && (
            <div className="book-details-synopsis">
              <Text variant="h2">Synopsis</Text>
              <Text
                variant="body"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(book.synopsis),
                }}
              />
            </div>
          )}
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
