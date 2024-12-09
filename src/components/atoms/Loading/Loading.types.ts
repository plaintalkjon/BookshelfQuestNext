export interface LoadingProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'small' | 'medium' | 'large';
  color?: 'primary' | 'secondary' | 'inverse';
  className?: string;
}
