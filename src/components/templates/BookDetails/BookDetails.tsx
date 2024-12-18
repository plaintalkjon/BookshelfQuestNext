"use client";

import { BookCard } from "@/components/molecules";
import "./BookDetails.css";
import { BookDetailsProps } from "./BookDetails.types";
import { BookEditionsGrid } from "@/components/organisms/BookEditionsGrid/BookEditionsGrid";
import { Text } from "@/components/atoms";
export const BookDetails = ({ book }: BookDetailsProps) => {
  return (
    <div className="book-details-container">
        <BookCard 
          book={book}
          variant="detailed"
        />
                    {book.editions && book.editions.length > 1 && (
              <div className="book-editions">
                <Text variant="h4">Other Editions</Text>
                <BookEditionsGrid editions={book.editions} />
              </div>
            )}
    </div>
  );
};
