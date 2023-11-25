"use client";

import React, { useState, useRef } from "react";
import { Doc } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { IoDocumentTextOutline } from "react-icons/io5";

interface TitleProps {
  initialData: Doc<"documents">;
}

export default function Title({ initialData }: TitleProps) {
  const updateDocument = useMutation(api.documents.update);
  const [title, setTitle] = useState(initialData.title || "Untitled");
  const inputRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleEnableInput = () => {
    setTitle(initialData.title);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.setSelectionRange(0, inputRef.current.value.length);
    }, 0);
  };

  const handleDisableInput = () => {
    setIsOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    updateDocument({
      id: initialData._id,
      title: e.target.value || "Untitled",
    });
  };

  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleDisableInput();
      setIsOpen(false);
    }
  };

  const titlehandeler = (string: string, n: number) => {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  };

  return (
    <>
      {!isOpen ? (
        <>
          <div
            className="flex items-center gap-x-1 bg-transparent hover:bg-base-200 rounded-md py-1 px-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {initialData.icon ? (
              <>{!!initialData.icon && <p>{initialData.icon}</p>}</>
            ) : (
              <IoDocumentTextOutline className="h-7 w-7 p-1 text-sm outline-none rounded-md" />
            )}
            <button className="font-normal h-auto" onClick={handleEnableInput}>
              <span className="text-sm text-base-content">
                {titlehandeler(`${initialData?.title}`, 12)}
              </span>
            </button>
          </div>
        </>
      ) : (
        <>
          <div 
            className="absolute top-16 px-3 py-2 border flex gap-2 bg-white shadow-2xl 
            border-base-300 rounded-xl left-44"
          >
            {initialData.icon ? (
              <input
                type="text"
                className="h-7 w-7 p-1 border border-base-300 text-sm outline-none rounded-md"
              />
            ) : (
              <IoDocumentTextOutline className="h-7 w-7 p-1 border border-base-300 text-sm outline-none rounded-md" />
            )}
            <input
              className="h-7 w-64 p-2 border border-base-300 text-sm outline-none rounded-md"
              ref={inputRef}
              onBlur={handleDisableInput}
              onChange={handleChange}
              onKeyDown={handleOnKeyDown}
              value={title}
            />
          </div>
        </>
      )}
      <div
        className={`flex items-center gap-x-1 bg-transparent hover:bg-base-200 rounded-md py-1 px-2
        ${!isOpen && 'hidden'}`}
      >
        {initialData.icon ? (
          <>{!!initialData.icon && <p>{initialData.icon}</p>}</>
        ) : (
          <IoDocumentTextOutline className="h-7 w-7 p-1 text-sm outline-none rounded-md" />
        )}
        <button className="font-normal h-auto" onClick={handleEnableInput}>
          <span className="text-sm text-base-content">
            {titlehandeler(`${initialData?.title}`, 12)}
          </span>
        </button>
      </div>
    </>
  );
}