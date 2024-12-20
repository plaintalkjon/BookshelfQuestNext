import { findAllBooks } from '@/services/book-search';
import { SearchShowcase } from '@/components/organisms';

export default async function SearchPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ q: string }> 
}) {
  const resolvedParams = await searchParams;
  const { q } = resolvedParams;
  const searchResults = await findAllBooks(q, 1);
  console.log('Initial books:', searchResults);
  return <SearchShowcase query={q} books={searchResults} />;
}