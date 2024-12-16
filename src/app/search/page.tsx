import { findAllBooks } from '@/services/book-search';
import { SearchShowcase } from '@/components/organisms';

export default async function SearchPage({ 
  searchParams: { q } 
}: { 
  searchParams: { q: string } 
}) {
  const searchResults = await findAllBooks(q, 1);
  console.log('Initial books:', searchResults);
  return <SearchShowcase query={q} initialBooks={searchResults} />;
}