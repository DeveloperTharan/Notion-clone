"use client";

import React from "react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "convex/react";
import { IoDocumentTextOutline } from "react-icons/io5";

interface FavDocListProps {
  open: boolean;
  parentDocumentId?: Id<"documents">;
}

export default function FavoriteDocList({
  parentDocumentId,
  open,
}: FavDocListProps) {
  const params = useParams();
  const router = useRouter();
  const documents = useQuery(api.documents.getFavorites, {
    parentDocument: parentDocumentId,
  });

  const handleClick = (documentId: string) => {
    return router.push(`/workspace/${documentId}`);
  };

  return (
    <>
      {documents === undefined ? (
        <>
          <div className="skeleton w-20 h-[12px]" />
        </>
      ) : (
        <>
          {documents.map((document) => {
            const active = document._id === params.documentId;

            return (
              <div key={document._id}>
                <div
                  className={`min-h-[27px] text-sm py-[8px] pr-3 w-full hover:bg-base-200
                  flex items-center text-base-content font-medium gap-2 rounded-md cursor-pointer
                  ${active && "bg-base-300 text-gray-800"} ${
                    !open && "mt-2"
                  }`}
                  onClick={() => handleClick(document._id)}
                >
                  <div className="flex items-center gap-2 ml-10 ">
                    {document.icon ? (
                      <div className="shrink-0 mr-2 text-[18px] text-gray-600 font-thin">
                        {document.icon}
                      </div>
                    ) : (
                      <>
                        {open ? (
                          <IoDocumentTextOutline className="h-4 w-4 shrink-0 text-gray-600" />
                        ) : (
                          <div
                            className="tooltip tooltip-right"
                            data-tip={document.title}
                          >
                            <IoDocumentTextOutline className="h-[18px] w-[18px] ms-[3px] text-gray-600" />
                          </div>
                        )}
                      </>
                    )}
                    <span
                      className={`truncate text-gray-600 font-medium text-[12px] ${
                        !open && "hidden"
                      }`}
                    >
                      {document.title}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </>
      )}
    </>
  );
}
