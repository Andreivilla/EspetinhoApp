import React from 'react';

type TextInputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
};

export function TextInput({ 
  value, 
  onChange, 
  placeholder 
}: Readonly<
 TextInputProps
>){
  return (
    <input
      type="text"
      placeholder={placeholder}
      className="border p-2 w-full mb-4"
      value={value}
      onChange={onChange}
    />
  );
}

type NumberInputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
};

export function NumberInput({ 
  value, 
  onChange, 
  placeholder 
}: Readonly< 
  NumberInputProps
>){
  return (
    <input
      type="text"
      inputMode="decimal"
      placeholder={placeholder}
      className="border p-2 w-full mb-4"
      value={value}
      onChange={onChange}
    />
  );
}
