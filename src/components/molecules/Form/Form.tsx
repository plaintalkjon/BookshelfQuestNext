import { useState } from 'react';
import { Input, Button } from '@/components/atoms';
import { FormProps } from './Form.types';
import './Form.css';

export const Form = ({ 
  fields, 
  onSubmit, 
  submitText = 'Submit',
  loading = false,
  error,
  className = ''
}: FormProps) => {
  const [formData, setFormData] = useState<Record<string, string>>(
    // Initialize with empty strings for all fields
    fields.reduce((acc, field) => ({
      ...acc,
      [field.name]: ''
    }), {})
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Call the field's onChange if provided
    fields.find(f => f.name === name)?.onChange?.(e);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className={`form ${className}`}>
      {fields.map(({ name, ...field }) => (
        <Input
          key={name}
          name={name}
          value={formData[name]}
          onChange={handleChange}
          {...field}
        />
      ))}
      {error && <div className="form-error">{error}</div>}
      <Button 
        type="submit" 
        isLoading={loading}
        fullWidth
      >
        {submitText}
      </Button>
    </form>
  );
}; 