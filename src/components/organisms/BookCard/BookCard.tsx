import { BookInfo } from '@/components/molecules/BookInfo';
import type { BookCardProps } from './BookCard.types';
import './BookCard.css';

export const BookCard = ({ book, onClick }: BookCardProps) => (
  <div className="book-card" onClick={onClick}>
    <BookInfo 
      title={book.title}
      authors={book.authors}
      publisher={book.publisher}
      publishedDate={book.published_date}
      coverUrl={book.image}
    />
  </div>
); 