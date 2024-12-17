"use client";

import { useState } from 'react';
import { Text } from '@/components/atoms';
import { InputProps } from './Input.types';
import './Input.css';

export const Input = ({ 
  label,
  error,
  fullWidth = false,
  className = '',
  type = 'text',
  id,
  ...props
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputId = id || label.toLowerCase().replace(/\s+/g, '-');
  const isPassword = type === 'password';
  
  return (
    <div className={`input-group ${fullWidth ? 'input-full-width' : ''} ${className}`}>
      <label htmlFor={inputId} className="input-label">
        <Text variant="body" color="primary">{label}</Text>
      </label>
      
      <div className="input-wrapper">
        <input
          id={inputId}
          className={`input-field ${error ? 'input-error' : ''}`}
          type={isPassword && showPassword ? 'text' : type}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? '👁️' : '👁️‍🗨️'}
          </button>
        )}
      </div>
      
      {error && (
        <Text variant="body" className="input-error-message">
          {error}
        </Text>
      )}
    </div>
  );
}; 