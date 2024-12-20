import { Text, Image, Button } from "@/components/atoms";
import "./BookCard.css";
import type { BookCardProps } from "./BookCard.types";
import { useShelf } from "@/hooks/useShelf";
export const BookCard = ({
  book,
}: BookCardProps) => {
  // Return early if no book
  
  const { addToShelf, removeFromShelf, isInShelf } = useShelf();
  if (!book) return null;
  const isOnShelf = book.isbn13 ? isInShelf(book.isbn13) : false;
  
  console.log(book);
  return (
    <div className={`book-card book-card`}>
      <div className={`book-card-cover-container book-card-cover-container`}>
        <Image 
          src={book.image || ""} 
          alt={book.title || ""} 
          className="book-card-cover" 
          variant="medium"
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
      </div>
    </div>
  );
};
