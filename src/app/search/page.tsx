import { bookService } from '@/services/book-search';
import { SearchShowcase } from '@/components/organisms';

export default async function SearchPage({ searchParams: { q } }: { searchParams: { q: string } }) {
  const books = await bookService.searchBooks(q);

  return <SearchShowcase query={q} books={books} />;
}