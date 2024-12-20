import { Image, Text } from '@/components/atoms';
import type { SearchResultCardProps } from './SearchResultCard.types';
import './SearchResultCard.css';

export const SearchResultCard = ({ book, onClick }: SearchResultCardProps) => {
  return (
    <div className="search-result-card" onClick={onClick}>
      <div className="search-result-image">
        <Image 
          src={book.image || ""} 
          alt={book.title || ""}
          variant="small"
        />
      </div>
      <div className="search-result-info">
        <Text variant="h4" className="search-result-title">{book.title}</Text>
        <Text variant="body">{book.authors?.join(', ')}</Text>
        {book.publisher && (
          <Text variant="body" className="search-result-publisher">
            {book.publisher}
          </Text>
        )}
      </div>
    </div>
  );
}; 