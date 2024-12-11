import { Text, Image } from '@/components/atoms';
import './BookSearch.css';
import type { BookSearchProps } from './BookSearch.types';



export const BookSearch = ({ book, onClick }: BookSearchProps) => (
  <div className="book-search" onClick={onClick}>
    <Image 
      src={book.image || '/images/default-book-cover.png'} 
      alt={book.title || 'Book Title'}
      className="book-search-cover"
      width={50}
      height={75}
    />
    <div className="book-search-details">
      <Text variant="body">{book.title}</Text>
      <Text variant="body">By {book.authors?.length ? book.authors.join(', ') : 'Unknown Author'}</Text>
    </div>
  </div>
); 