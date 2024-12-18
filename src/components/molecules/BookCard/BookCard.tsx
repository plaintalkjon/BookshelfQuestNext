import { Text, Image, Button } from "@/components/atoms";
import "./BookCard.css";
import type { BookCardProps } from "./BookCard.types";
import { useShelf } from "@/hooks/useShelf";
import DOMPurify from "isomorphic-dompurify";
export const BookCard = ({
  book,
  variant = "search",
}: BookCardProps) => {
  // Return early if no book
  
  const { addToShelf, removeFromShelf, isInShelf } = useShelf();
  if (!book) return null;
  const isOnShelf = book.isbn13 ? isInShelf(book.isbn13) : false;
  
  console.log(book);
  return (
    <div className={`book-card book-card-${variant}`}>
      <div className={`book-card-cover-container book-card-cover-container-${variant}`}>
        <Image 
          src={book.image || ""} 
          alt={book.title || ""} 
          className="book-card-cover" 
          variant={variant}
        />
        <Button 
          variant="secondary"
          size="small"
          onClick={() => {
            if (!book.isbn13) return;
            if (isOnShelf) {
              removeFromShelf.mutate(book.isbn13);
            } else {
              addToShelf.mutate(book.isbn13);
            }
          }}
        >
          {isOnShelf ? "Remove from Shelf" : "Add to Shelf"}
        </Button>
      </div>
      
      <div className="book-card-additional-information">
        <Text variant="h3">{book.title}</Text>
        <Text variant="body">By {book.authors?.join(", ")}</Text>
        {(variant === "shelf" || variant === "detailed") && (
          <>
            <Text variant="body">Published {book.date_published?.toString().split("-")[0]}</Text>
            <Text variant="body">{book.binding}</Text>
            
            {book.synopsis && (
              <div className="book-synopsis">
                <Text variant="h4">Synopsis</Text>
                <Text variant="body" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(book.synopsis) }} />
              </div>
            )}

            {book.subjects && book.subjects.length > 0 && (
              <div className="book-categories">
                <Text variant="h4">Categories</Text>
                <div className="category-tags">
                  {book.subjects.map((category) => (
                    <span key={category} className="category-tag">
                      {category}
                    </span>
                  ))}
                </div>
              </div>
            )}


          </>
        )}
      </div>
    </div>
  );
};
