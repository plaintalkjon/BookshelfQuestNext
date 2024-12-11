import { notFound } from 'next/navigation';
import { BookDetails } from '@/components/templates';
import { bookDetailsService } from '@/services/book-details';

interface BookPageProps {
  params: {
    isbn: string;
  };
}

export default async function BookPage({ params }: BookPageProps) {
    const book = await bookDetailsService.getBookDetails(params.isbn);

  // If neither service found the book, 404
  if (!book) {
    notFound();
  }

  return <BookDetails book={book} />;
}
