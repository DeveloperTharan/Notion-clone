"use client";

import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { Check, Copy, Globe } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";
import {
  Popover,
  PopoverHandler,
  PopoverContent,
  Button,
} from "@material-tailwind/react";

interface PublishProps {
  initialData: Doc<"documents">;
}

export default function Publish({ initialData }: PublishProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);

  const update = useMutation(api.documents.update);

  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";

      const url = `${origin}/preview/${initialData._id}`;

  const handleOnPublished = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();

    setIsSubmitting(true);

    const promise = update({
      id: initialData._id,
      isPublished: true,
    }).finally(() => setIsSubmitting(false));

    toast.promise(promise, {
      loading: "Publishing...",
      success: "Published suessfully!",
      error: "Publish failed!",
      duration: 1000,
    });
  };

  const handleOnUnPublished = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();

    setIsSubmitting(true);

    const promise = update({
      id: initialData._id,
      isPublished: false,
    }).finally(() => setIsSubmitting(false));

    toast.promise(promise, {
      loading: "UnPublishing...",
      success: "UnPublished suessfully!",
      error: "UnPublish failed!",
      duration: 1000,
    });
  };

  const handleOnCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <Popover>
      <PopoverHandler>
        <button
          className="text-gray-600 font-medium text-sm hover:bg-base-200 px-2 
        py-1 rounded-md flex items-center justify-center gap-x-1"
        >
          Publish
          {initialData.isPublished && (
            <Globe className="text-blue-500 h-4 w-4" />
          )}
        </button>
      </PopoverHandler>
      <PopoverContent>
        {initialData.isPublished ? (
          <div className="space-y-4">
            <div className="flex items-center gap-x-2">
              <Globe className="text-sky-500 animate-pulse h-4 w-4" />
              <p className="text-xs font-medium text-sky-500">
                This note is live on web.
              </p>
            </div>
            <div className="flex items-center">
              <input
                className="flex-1 px-2 text-xs border rounded-l-md h-8 bg-muted truncate"
                value={url}
                disabled
              />
              <button
                onClick={handleOnCopy}
                disabled={copied}
                className="h-8 rounded-l-none"
              >
                {copied ? (
                  <Check className="h-4 w-4 ml-1" />
                ) : (
                  <Copy className="h-4 w-4 ml-1" />
                )}
              </button>
            </div>
            <button
              className="w-full text-sm bg-[#000] text-white py-2 rounded-md"
              disabled={isSubmitting}
              onClick={handleOnUnPublished}
            >
              Unpublish
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <Globe className="h-8 w-8 text-base-content mb-2" />
            <p className="text-sm font-medium mb-2">pubish this Note</p>
            <span className="text-sm text-base-content mb-4">
              Share your work with others
            </span>
            <button
              disabled={isSubmitting}
              onClick={handleOnPublished}
              className="w-full text-sm bg-[#000] text-white py-2 rounded-md"
            >
              Publish
            </button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
