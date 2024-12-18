import { Text, Image, Button } from "@/components/atoms";
import "./BookCard.css";
import type { BookCardProps } from "./BookCard.types";
import Link from "next/link";
import { useShelf } from "@/hooks/useShelf";
export const BookCard = ({
  book,
  onClick,
  href,
  detailed = false,
}: BookCardProps) => {
  // Return early if no book
  console.log("book", book);
  const { addToShelf, removeFromShelf, isInShelf } = useShelf();
  if (!book) return null;
  const isOnShelf = isInShelf(book.isbn13 as string);

  const content = (
    <div className="book-search" onClick={onClick}>
      <div className="book-search-cover-container">
        <Image
          src={book.image || "/images/default-book-cover.png"}
          alt={book.title || "Book Cover"}
          className="book-search-cover"
          style={{ width: "100px", height: "150px" }}
        />
        <Button
          variant="primary"
          size="small"
          onClick={() =>
            isOnShelf
              ? removeFromShelf.mutate(book.isbn13 as string)
              : addToShelf.mutate(book.isbn13 as string)
          }
        >
          {isOnShelf ? "Remove from Shelf" : "Add to Shelf"}
        </Button>
      </div>
      <div className="book-search-details">
        <Text variant="body">{book.title}</Text>
        <Text variant="body">
          By {book.authors?.length ? book.authors.join(", ") : "Unknown Author"}
        </Text>
        {detailed && (
          <Text variant="body">
            Published {book.date_published?.toString().split("-")[0]}
          </Text>
        )}
        {detailed && <Text variant="body">{book.binding}</Text>}
      </div>
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
};
