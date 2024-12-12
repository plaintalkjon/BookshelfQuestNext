import { Text, Image } from '@/components/atoms';
import './BookSearch.css';
import type { BookSearchProps } from './BookSearch.types';
import Link from 'next/link';
export const BookSearch = ({ book, onClick, href }: BookSearchProps) => {
  const content = (
    <div className="book-search" onClick={onClick}>
      <Image 
        src={book.image || '/images/default-book-cover.png'} 
        alt={book.title || 'Book Title'}
        className="book-search-cover"
        width={100}
        height={150}
    />
    <div className="book-search-details">
      <Text variant="body">{book.title}</Text>
      <Text variant="body">By {book.authors?.length ? book.authors.join(', ') : 'Unknown Author'}</Text>
      <Text variant="body">Published {book.date_published?.toString().split('-')[0]}</Text>
      <Text variant="body">{book.binding}</Text>
    </div>
  </div>
); 

if (href) {
  return <Link href={href}>{content}</Link>;
}

return content;
}