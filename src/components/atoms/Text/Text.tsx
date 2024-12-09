import { TextProps } from './Text.types';
import './Text.css';

export const Text = ({ 
  variant = 'body',
  children,
  className = '',
  color = 'primary',
  as: Component = 'p',
  ...props
}: TextProps) => {
  const classes = [
    'text',
    `text-${variant}`,
    `text-color-${color}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  );
}; 