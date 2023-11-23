"use client";

import React, { useState } from "react";
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { useParams, useRouter } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import { toast } from "sonner";

import { IoSearchSharp, IoTrashOutline } from "react-icons/io5";
import { LuUndo2 } from "react-icons/lu";
import { DeleteModel } from "./DeleteModel";

export default function TrashBox() {
  const router = useRouter();
  const params = useParams();
  const documents = useQuery(api.documents.getTrash);
  const restore = useMutation(api.documents.restore);
  const remove = useMutation(api.documents.remove);
  const [search, setSearch] = useState("");
  const [modelOpen, setModelOpen] = useState(false);

  const fiterdocument = documents?.filter((document) => {
    return document.title.toLowerCase().includes(search.toLowerCase());
  });

  const handleClick = (docunmentId: string) => {
    return router.push(`/getting-start/${docunmentId}`);
  };

  const handleRestore = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    docunmentId: Id<"documents">
  ) => {
    e.stopPropagation();

    const promise = restore({ id: docunmentId });

    toast.promise(promise, {
      loading: "Restoring note...",
      success: "Restored Sucessfully.",
      error: "Failed to restore.",
      duration: 1000,
    });
  };

  const handleRemove = (docunmentId: Id<"documents">) => {
    const promise = remove({ id: docunmentId });

    toast.promise(promise, {
      loading: "Deleting note...",
      success: "Deleted Sucessfully.",
      error: "Failed to Delete.",
      duration: 1000,
    });

    if (params.documentId === docunmentId) {
      return router.push("/getting-start");
    }
  };

  return (
    <>
      {documents === undefined ? (
        <>
          <div className="skeleton h-5 w-20"></div>
        </>
      ) : (
        <div className="text-sm overflow-y-auto">
          <div className="flex items-center gap-x-1 p-2">
            <IoSearchSharp className="h-4 w-4 shrink-0 text-gray-600" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-7 px-2 focus-visible:ring-transparent bg-base-300 outline-none"
              placeholder="Filter by page title..."
            />
          </div>
          <div className="mt-2 px-1 pb-1">
            <p className="hidden last:block text-xs text-center text-muted-foreground pb-2">
              No documents found.
            </p>
            {fiterdocument?.map((document) => (
              <div
                key={document._id}
                role="button"
                onClick={() => handleClick(document._id)}
                className="text-sm rounded-sm w-full hover:bg-primary/5 flex items-center text-primary justify-between"
              >
                <span className="truncate pl-2">{document.title}</span>
                <div className="flex items-center">
                  <div
                    onClick={(e) => handleRestore(e, document._id)}
                    role="button"
                    className="rounded-sm p-2 hover:bg-neutral-200"
                  >
                    <LuUndo2 className="h-4 w-4 shrink-0 text-gray-600" />
                  </div>
                  <DeleteModel onConfirm={() => handleRemove(document._id)}>
                    <div
                      role="button"
                      className="rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600"
                    >
                      <IoTrashOutline className="h-4 w-4 shrink-0 text-gray-600" />
                    </div>
                  </DeleteModel>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
