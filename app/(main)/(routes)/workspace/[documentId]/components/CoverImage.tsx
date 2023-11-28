"use client";

import React from "react";
import Image from "next/image";
import CoverImageModel from "./CoverImageModel";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import { useEdgeStore } from "@/lib/edgestore";

interface CoverImageProps {
  url?: string;
  preview?: boolean;
}

export default function CoverImage({ url, preview }: CoverImageProps) {
  const params = useParams();
  const removeCoverImg = useMutation(api.documents.removeCoverImage);
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

    await removeCoverImg({ id: params.documentId as Id<"documents"> });
  };

  return (
    <>
      {url === undefined ? (
        <>
          <div className="skeleton h-[35vh] w-full" />
        </>
      ) : (
        <div
          className={`relative w-full group/cover ${!url && "h-[20vh]"} ${
            url && "bg-base-200 h-[35vh]"
          }`}
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
              className="opacity-0 group-hover/cover:opacity-100 absolute bottom-5 right-20 flex 
            items-center z-50 gap-x-2 h-fit w-fit transition-all delay-300"
            >
              <CoverImageModel existingUrl={url}>
                <div className="bg-white px-3 py-1 text-xs text-base-content rounded-sm hover:bg-base-300">
                  Change Cover
                </div>
              </CoverImageModel>
              <button
                className="bg-white px-3 py-1 text-xs text-base-content rounded-sm hover:bg-base-300"
                onClick={handleRemoveCoverImage}
              >
                Remove
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
