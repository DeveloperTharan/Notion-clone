"use client";

import React, { useState } from "react";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { useParams, useRouter } from "next/navigation";
import { api } from "@/convex/_generated/api";
import { IoDocumentTextOutline } from "react-icons/io5";
import Item from "./Item";

interface DoumentProps {
  parentDocumentId?: Id<"documents">;
  level?: number;
  data?: Doc<"documents">[];
  open: boolean;
}

export default function DocumentsList({
  parentDocumentId,
  level = 0,
  open,
}: DoumentProps) {
  const params = useParams();
  const router = useRouter();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const onExpand = (documentId: string) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [documentId]: !prevExpanded[documentId],
    }));
  };

  const documents = useQuery(api.documents.get, {
    parentDocument: parentDocumentId,
  });

  const onRedirect = (documentId: string) => {
    router.push(`/workspace/${documentId}`);
  };

  function ItemSkeleton({ level }: { level?: number }) {
    return (
      <div
        style={{
          paddingLeft: level ? `${level * 12 + 25}px` : "12px",
        }}
        className="flex gap-x-2 py-[3px] items-center"
      >
        <div className="skeleton h-[12px] w-4" />
        <div className="skeleton h-[12px] w-[30%]" />
      </div>
    );
  }

  return (
    <>
      {documents === undefined ? (
        <>
          <ItemSkeleton level={level} />
          {level === 0 && (
            <>
              <ItemSkeleton level={level} />
              <ItemSkeleton level={level} />
            </>
          )}
        </>
      ) : (
        <>
          {level === 0 ? null : (
            <p
              style={{
                paddingLeft: level ? `${level * 12 + 25}px` : undefined,
              }}
              className={`hidden text-[12px] font-medium text-gray-600
              ${expanded && "last:block"} `}
            >
              No pages inside
            </p>
          )}
          {documents.map((document) => (
            <div key={document._id}>
              <Item
                id={document._id}
                onClick={() => onRedirect(document._id)}
                label={document.title}
                icon={IoDocumentTextOutline}
                documentIcon={document.icon}
                active={params.documentId === document._id}
                level={level}
                onExpand={() => onExpand(document._id)}
                expanded={expanded[document._id]}
                open={open}
              />
              {expanded[document._id] && (
                <DocumentsList
                  parentDocumentId={document._id}
                  level={level + 1}
                  open={open}
                />
              )}
            </div>
          ))}
        </>
      )}
    </>
  );
}
