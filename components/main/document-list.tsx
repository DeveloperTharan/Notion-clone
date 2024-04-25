import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { Item } from "./item";
import { Skeleton } from "../ui/skeleton";
import { DocumentNode } from "@/utils/structure-data";

import { PiFileArchiveThin } from "react-icons/pi";

interface DocumentListProps {
  documents: DocumentNode[] | undefined;
  level?: number;
}

export const DocumentList = ({ documents, level = 0 }: DocumentListProps) => {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const params = useParams();
  const router = useRouter();

  const onExpand = (documentId: string) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [documentId]: !prevExpanded[documentId],
    }));
  };

  return (
    <>
      {!documents && (
        <>
          <ItemSkeleton level={level} />
          {level === 0 && (
            <>
              <ItemSkeleton level={level} />
              <ItemSkeleton level={level} />
            </>
          )}
        </>
      )}
      {documents && (
        <>
          {level !== 0 && (
            <p
              style={{
                paddingLeft: level ? `${level * 12 + 25}px` : undefined,
              }}
              className={`hidden text-[12px] font-medium text-muted-foreground
              ${expanded && "last:block"} `}
            >
              No pages inside
            </p>
          )}
          {documents.map((data, _) => (
            <div key={data.id} className="my-[2px]">
              <Item
                id={data.id}
                onClick={() => router.push(`/workspace/${data.id}`)}
                label={data.title!}
                Icon={PiFileArchiveThin}
                documentIcon={data.icon!}
                active={params.document === data.id}
                level={level}
                onExpand={() => onExpand(data.id)}
                expanded={expanded[data.id]}
              />
              {expanded[data.id] && (
                <DocumentList documents={data.children} level={level + 1} />
              )}
            </div>
          ))}
        </>
      )}
    </>
  );
};

const ItemSkeleton = ({ level }: { level?: number }) => {
  return (
    <div
      style={{
        paddingLeft: level ? `${level * 12 + 25}px` : "12px",
      }}
      className="flex gap-x-2 py-[3px] items-center"
    >
      <Skeleton className="h-[12px] w-4" />
      <Skeleton className="h-[12px] w-full" />
    </div>
  );
};
