import { Text, Image } from '@/components/atoms';
import type { BookInfoProps } from './BookInfo.types';
import './BookInfo.css';

export const BookInfo = ({ 
  title, 
  authors, 
  publisher, 
  publishedDate, 
  coverUrl,
  imageWidth = 100
}: BookInfoProps) => (
  <div className="book-info">
    <Image 
      src={coverUrl || '/images/default-book-cover.png'} 
      alt={title}
      className={imageWidth <= 100? "book-cover-search-bar" : "book-cover"}
      width={200}
      height={300}
      style={{
        width: imageWidth,
        height: imageWidth * 1.5
      }}
    />
    <div className="book-details">
      <Text variant="body">{title}</Text>
      <Text variant="body">By {authors.join(', ')}</Text>
      {publisher && <Text variant="caption">{publisher}</Text>}
      {publishedDate && <Text variant="caption">{publishedDate}</Text>}
    </div>
  </div>
); 