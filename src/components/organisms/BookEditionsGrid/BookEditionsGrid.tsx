import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Text, Button } from '@/components/atoms';
import './BookEditionsGrid.css';
import { BookEditionsGridProps } from './BookEditionsGrid.types';

export const BookEditionsGrid = ({ editions }: BookEditionsGridProps) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const [initialCount, setInitialCount] = useState(4);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const calculateInitialCount = () => {
      if (!gridRef.current) return;
      const containerWidth = gridRef.current.offsetWidth;
      const cardWidth = 180; // minimum card width from CSS
      const columns = Math.floor(containerWidth / cardWidth);
      setInitialCount(columns); // Show 2 rows worth of books
    };

    calculateInitialCount();
    window.addEventListener('resize', calculateInitialCount);
    return () => window.removeEventListener('resize', calculateInitialCount);
  }, []);

  const visibleEditions = showAll ? editions : editions.slice(0, initialCount);

  return (
    <div className="editions-section">
      <div className="editions-grid" ref={gridRef}>
        {visibleEditions.map((edition, index) => (
          <Link
            key={`${edition.isbn13}-${index}`}
            href={`/books/${edition.isbn13}`}
            className="edition-card"
          >
            <div className="edition-image">
              <Image
                src={edition.image || '/images/default-cover.png'}
                alt={edition.title || ''}
                width={150}
                height={225}
                priority={index < 4}
              />
            </div>
            <div className="edition-info">
              <Text variant="label">{edition.publisher}</Text>
              <Text variant="body">{edition.date_published}</Text>
            </div>
          </Link>
        ))}
      </div>
      
      {editions.length > initialCount && (
        <Button 
          variant="secondary"
          onClick={() => setShowAll(!showAll)}
          className="show-more-button"
        >
          {showAll ? 'Show Less' : `Show All Editions (${editions.length})`}
        </Button>
      )}
    </div>
  );
}; 