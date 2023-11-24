'use client'

import React, { useState, useRef } from 'react'
import { Doc } from '@/convex/_generated/dataModel';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';

interface TitleProps {
    initialData: Doc<"documents">;
  };

export default function Title({ initialData } : TitleProps) {
  const updateDocument = useMutation(api.documents.update);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(initialData.title || "Untitled");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleEnableInput = () => {
    setTitle(initialData.title);
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.setSelectionRange(0, inputRef.current.value.length)
    }, 0);
  };

  const handleDisableInput = () => {
    setIsEditing(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTitle(e.target.value);
    updateDocument({
      id: initialData._id,
      title: e.target.value || "Untitled"
    });
  };

  const handleOnKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      handleDisableInput();
    }
  };

  const titlehandeler = (string: string, n: number) => {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  };

  return (
    <div className='flex items-center gap-x-1'>
      {!!initialData.icon && <p>{initialData.icon}</p>}
      {isEditing ? (
        <input 
          className='h-5 px-2 focus-visible:ring-transparent outline-none 
          border-b-[1px] border-b-base-300 text-sm' 
          ref={inputRef}
          onClick={handleEnableInput}
          onBlur={handleDisableInput}
          onChange={handleChange}
          onKeyDown={handleOnKeyDown}
          value={title}
        />
      ) : (
        <button 
          className='bg-transparent hover:bg-base-200 font-normal h-auto py-1 px-3 rounded-md'
          onClick={handleEnableInput}
        >
          <span className='truncate text-sm font-medium text-gray-600'>
            {titlehandeler(`${initialData?.title}`,12)}
          </span>
        </button>
      )}
    </div>
  )
}