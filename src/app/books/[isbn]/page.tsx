import { BookDetails } from "@/components/templates";
import { isbndbService } from "@/services/isbndb";
import { notFound } from "next/navigation";

interface BookPageProps {
  params: {
    isbn: string;
  };
}

export default async function BookPage({ params }: BookPageProps) {
  const resolvedParams = params;
  const book = await isbndbService.getBookByIsbn(resolvedParams.isbn);

  if (!book) {
    notFound();
  }

  return <BookDetails book={book} />;
}
