import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { BookDetails } from '@/components/templates';
import { isbndbService } from '@/services/isbndb';
import { Loading } from '@/components/atoms';

interface BookPageProps {
  params: {
    isbn: string;
  };
}

export default function BookPage({ params }: BookPageProps) {
  return (
    <Suspense fallback={<Loading />}>
      <BookContent isbn={params.isbn} />
    </Suspense>
  );
}

async function BookContent({ isbn }: { isbn: string }) {
  const book = await isbndbService.getBookByIsbn(isbn);
  console.log("book", book);
  if (!book) {
    notFound();
  }

  return <BookDetails book={book} />;
} 