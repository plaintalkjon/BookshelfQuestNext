import { LoadingProps } from './Loading.types';
import './Loading.css';
import Image from 'next/image';

export const Loading = ({ size = 'medium', className = '', width = 100, height = 100 }: LoadingProps) => {
  return (
    <div className={`loading-container ${size} ${className}`}>
      <Image 
        src="/img/loading.svg" 
        alt="Loading..." 
        className="loading-spinner"
        width={width}
        height={height}
      />
    </div>
  );
}; 