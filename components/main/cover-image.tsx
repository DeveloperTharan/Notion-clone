"use client";

import React from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEdgeStore } from "@/lib/edgestore";
import { CoverImageModel } from "../models/coverimage-uplode";
import { handleCoverImage } from "@/actions/document";
import { cn } from "@/lib/utils";

interface CoverImageProps {
  url: string | null | undefined;
  preview?: boolean;
}

export const CoverImage = ({ url, preview }: CoverImageProps) => {
  const params = useParams();
  const router = useRouter();
  const { edgestore } = useEdgeStore();

  const handleRemoveCoverImage = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();

    if (url) {
      await edgestore.publicFiles.delete({
        url: url,
      });
    }

    await handleCoverImage("delete", params.document as string);

    router.refresh();
  };
  return (
    <div
      className={cn(
        "relative w-full group/cover z-0",
        !url && "h-[25vh]",
        url && "bg-secondary h-[35vh]"
      )}
    >
      {!!url && (
        <Image
          src={url}
          alt="cover/image"
          fill
          className="object-cover object-left-top"
          priority
        />
      )}
      {url && !preview && (
        <div
          className="lg:opacity-0 group-hover/cover:opacity-100 absolute bottom-5 right-20 flex 
          items-center z-50 gap-x-2 h-fit w-fit transition-all delay-300"
        >
          <CoverImageModel existingUrl={url}>
            <div className="bg-white px-3 py-1 text-xs text-muted-foreground rounded-sm hover:bg-secondary cursor-pointer">
              Change Cover
            </div>
          </CoverImageModel>
          <button
            className="bg-white px-3 py-1 text-xs text-muted-foreground rounded-sm hover:bg-secondary"
            onClick={handleRemoveCoverImage}
          >
            Remove
          </button>
        </div>
      )}
    </div>
  );
};
