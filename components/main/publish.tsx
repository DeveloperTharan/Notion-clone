"use client";

import React, { useState } from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import { Check, Copy, Globe } from "lucide-react";
import { handlePublish } from "@/actions/document";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface PublishProps {
  id: string | undefined;
  isPublished: boolean | undefined;
  url: string | null;
}

export const Publish = ({ id, isPublished, url }: PublishProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);

  const router = useRouter();

  const handlePublished = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();

    setIsSubmitting(true);

    handlePublish(id!)
      .then((data) => {
        if (data.success) return toast.success(data.success);
        if (data.error) return toast.error(data.error);
      })
      .finally(() => {
        router.refresh();
        setIsSubmitting(false);
      });
  };

  const handleOnCopy = () => {
    navigator.clipboard.writeText(url!);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={"ghost"} size={"sm"} className="text-muted-foreground">
          Publish
        </Button>
      </PopoverTrigger>
      <PopoverContent alignOffset={20}>
        {isPublished ? (
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
                value={url!}
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
              onClick={handlePublished}
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
              onClick={handlePublished}
              className="w-full text-sm bg-[#000] text-white py-2 rounded-md"
            >
              Publish
            </button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};
