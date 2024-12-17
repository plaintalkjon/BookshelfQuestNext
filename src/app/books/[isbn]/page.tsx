'use server'

import { BookDetails } from "@/components/templates";
import { bookDetailsService } from "@/services/book-details";
import { notFound } from "next/navigation";
import type { Book } from "@/types/book";

// Correct type for the page props
interface PageProps {
  params: Promise<{ isbn: string }>;
}

// Ensure you're handling async behavior properly
export default async function BookPage({ params }: PageProps) {
  const resolvedParams = await params;
  const book = await bookDetailsService.getBookDetails(resolvedParams.isbn);

  if (!book) {
    notFound();
  }

  return <BookDetails book={book as Book} />;
}
