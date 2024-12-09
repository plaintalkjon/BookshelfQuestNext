import { LoadingProps } from './Loading.types';
import './Loading.css';

export const Loading = ({ size = 'medium', className = '' }: LoadingProps) => {
  return (
    <div className={`loading-container ${size} ${className}`}>
      <img 
        src="/img/loading.svg" 
        alt="Loading..." 
        className="loading-spinner"
      />
    </div>
  );
}; 