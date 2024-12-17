import { BookDetails } from "@/components/templates";
import { bookDetailsService } from "@/services/book-details";
import { notFound } from "next/navigation";
import type { Book } from "@/types/book";

// Correct type for the page props
interface PageProps {
  params: {
    isbn: string;
  };
}

// Ensure you're handling async behavior properly
export default async function BookPage({ params }: PageProps) {
  console.log(params); // Debug to see the shape of `params`
  const { isbn } = params; // Extract isbn from params
  const book = await bookDetailsService.getBookDetails(isbn);

  if (!book) {
    notFound();
  }

  return <BookDetails book={book as Book} />;
}
