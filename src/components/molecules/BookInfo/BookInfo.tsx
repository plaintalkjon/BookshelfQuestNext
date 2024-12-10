import { Text, Image } from '@/components/atoms';
import type { BookInfoProps } from './BookInfo.types';
import './BookInfo.css';

export const BookInfo = ({ 
  title, 
  authors, 
  publisher, 
  publishedDate, 
  coverUrl 
}: BookInfoProps) => (
  <div className="book-info">
    <Image 
      src={coverUrl || '/images/default-book-cover.png'} 
      alt={title}
      className="book-cover"
    />
    <div className="book-details">
      <Text variant="h3">{title}</Text>
      <Text variant="body">By {authors.join(', ')}</Text>
      {publisher && <Text variant="caption">{publisher}</Text>}
      {publishedDate && <Text variant="caption">{publishedDate}</Text>}
    </div>
  </div>
); 