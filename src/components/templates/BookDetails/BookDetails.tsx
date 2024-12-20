"use client";

import { Image, Text } from "@/components/atoms";
import { BookEditionsGrid } from "@/components/organisms/BookEditionsGrid/BookEditionsGrid";
import { BookDetailsProps } from "./BookDetails.types";
import "./BookDetails.css";

export const BookDetails = ({ book }: BookDetailsProps) => {
  return (
    <div className="book-details-container">
      <div className="book-details-main">
        <div className="book-cover-container">
          <Image
            src={book.image || ""}
            alt={`Cover of ${book.title}`}
            variant="large"
          />
        </div>
        
        <div className="book-info">
          <Text variant="h1">{book.title}</Text>
          <Text variant="h3">{book.authors?.join(", ")}</Text>
          
          {book.publisher && (
            <Text variant="body">{book.publisher}</Text>
          )}
          
          {book.synopsis && (
            <div className="book-synopsis">
              <Text variant="h4">Synopsis</Text>
              <Text variant="body">{book.synopsis}</Text>
            </div>
          )}

          {book.subjects && book.subjects.length > 0 && (
            <div className="book-categories">
              <Text variant="h4">Categories</Text>
              <div className="category-tags">
                {book.subjects.map((subject, index) => (
                  <span key={index} className="category-tag">
                    {subject}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {book.editions && book.editions.length > 1 && (
        <div className="book-editions">
          <Text variant="h4">Other Editions</Text>
          <BookEditionsGrid editions={book.editions} />
        </div>
      )}
    </div>
  );
};
