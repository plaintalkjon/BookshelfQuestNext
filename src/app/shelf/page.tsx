'use client';

import { ShelfShowcase } from "@/components/organisms";
import { useAuth } from "@/hooks/useAuth";
import { useShelf } from "@/hooks/useShelf";

export default function ShelfPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const { shelfBooks, isLoading: booksLoading } = useShelf();

  if (isLoading || booksLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <div>Please log in to view your shelf</div>;
  }

  return <ShelfShowcase books={shelfBooks || []} />;
}
