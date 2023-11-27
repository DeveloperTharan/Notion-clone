"use client";

import React from "react";
import Image from "next/image";
import CoverImageModel from "./CoverImageModel";

interface CoverImageProps {
  url?: string;
  preview?: boolean;
}

export default function CoverImage({ url, preview }: CoverImageProps) {
  return (
    <div
      className={`relative w-full h-[35vh] group/cover -z-10 ${
        !url && "h-[12vh]"
      } ${url && "bg-base-200"}`}
    >
      {!!url && (
        <Image
          src={url}
          alt="cover/image"
          fill
          className="object-cover object-left-top"
        />
      )}
      {url && !preview && (
        <div    
            className="opacity-0 group-hover/cover:opacity-100 absolute bottom-5 right-20 flex 
            items-center z-50 gap-x-2 h-fit w-fit"
        >
          <CoverImageModel>
            <button className="bg-white px-3 py-1 text-xs text-base-content rounded-sm hover:bg-base-300">
              Change Cover
            </button>
          </CoverImageModel>
          <button
            className="bg-white px-3 py-1 text-xs text-base-content rounded-sm hover:bg-base-300"
            onClick={() => {}}
          >
            Remove
          </button>
        </div>
      )}
    </div>
  );
}
