import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Text } from '@/components/atoms';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './BookEditionsSlider.css';
import { BookEditionsSliderProps } from './BookEditionSlider.types';

export const BookEditionsSlider = ({ editions }: BookEditionsSliderProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleCount, setVisibleCount] = useState(3);
  const [currentGroup, setCurrentGroup] = useState(0);
  const groupCount = Math.ceil(editions.length / visibleCount);

  // Calculate how many books can fit
  useEffect(() => {
    const updateVisibleCount = () => {
      if (!containerRef.current) return;
      const containerWidth = containerRef.current.offsetWidth;
      const bookWidth = 200; // width + margins
      const newVisibleCount = Math.max(1, Math.floor(containerWidth / bookWidth));
      setVisibleCount(newVisibleCount);
    };

    updateVisibleCount();
    window.addEventListener('resize', updateVisibleCount);
    return () => window.removeEventListener('resize', updateVisibleCount);
  }, []);

  const handlePrevious = () => {
    setCurrentGroup((prev) => (prev === 0 ? groupCount - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentGroup((prev) => (prev === groupCount - 1 ? 0 : prev + 1));
  };

  const visibleEditions = editions.slice(
    currentGroup * visibleCount,
    (currentGroup + 1) * visibleCount
  );

  return (
    <div className="editions-slider">
      <button 
        onClick={handlePrevious}
        className="slider-button left"
        disabled={editions.length <= visibleCount}
        aria-label="Previous editions"
      >
        <ChevronLeft />
      </button>

      <div className="editions-container" ref={containerRef}>
        <div 
          className="editions-track"
          style={{
            transform: `translateX(-${currentGroup * 100}%)`,
          }}
        >
          {visibleEditions.map((edition, index) => (
            <div
              key={`${edition.isbn13}-${index}`}
              className="edition-card"
            >
              <div className="edition-image">
                <Image
                  src={edition.image || '/images/default-cover.png'}
                  alt={edition.title || ''}
                  width={150}
                  height={225}
                  priority={index === 0}
                />
              </div>
              <div className="edition-info">
                <Text variant="label">{edition.publisher}</Text>
                <Text variant="body">{edition.published_date}</Text>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button 
        onClick={handleNext}
        className="slider-button right"
        disabled={editions.length <= visibleCount}
        aria-label="Next editions"
      >
        <ChevronRight />
      </button>
    </div>
  );
}; 