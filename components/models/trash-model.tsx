"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { toast } from "sonner";
import { Document } from "@prisma/client";
import { handleDocumentAction } from "@/actions/document";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Skeleton } from "../ui/skeleton";

import { LuUndo2 } from "react-icons/lu";
import { ImFileText2 } from "react-icons/im";
import { IoTrashOutline } from "react-icons/io5";
import { DeleteModel } from "./delete-model";

interface TrashModelProps {
  children: React.ReactNode;
  trash: Document[];
}

export const TrashModel = ({ children, trash }: TrashModelProps) => {
  const [search, setSearch] = useState<string>("");
  const [Open, setOpen] = useState(false);

  const router = useRouter();

  const handleRestore = async (docId: string) => {
    await handleDocumentAction("restore", docId)
      .then((data) => {
        if (data.success) return toast.success(data.success);
        if (data.error) return toast.error(data.error);
      })
      .finally(() => {
        router.refresh();
      });
  };

  const handleDelete = async (docId: string) => {
    await handleDocumentAction("delete", docId)
      .then((data) => {
        if (data.success) return toast.success(data.success);
        if (data.error) return toast.error(data.error);
      })
      .finally(() => {
        router.refresh();
        setOpen(false);
      });
  };

  return (
    <Dialog>
      <DialogTrigger className="w-full">{children}</DialogTrigger>
      <DialogContent className="w-full h-auto max-h-96 overflow-auto">
        <DialogHeader>
          <DialogTitle className="py-2 sticky top-0">
            <Input
              type="text"
              placeholder="Search your docs!"
              autoFocus
              onChange={(e) => setSearch(e.target.value)}
              className="bg-background"
            />
          </DialogTitle>
          <DialogDescription className="p-2 w-full">
            {!trash && (
              <>
                <Skeleton className="w-full h-4 rounded-md my-1.5" />
                <Skeleton className="w-full h-4 rounded-md my-1.5" />
                <Skeleton className="w-full h-4 rounded-md my-1.5" />
                <Skeleton className="w-full h-4 rounded-md my-1.5" />
              </>
            )}
            {trash
              ?.filter((data) => {
                return data.title?.toLocaleLowerCase().includes(search);
              })
              .map((data, _) => (
                <div
                  key={data.id}
                  className="w-full flex items-center justify-between hover:bg-secondary p-2 gap-3 rounded-md"
                  role="button"
                >
                  {data.icon ? (
                    <div
                      className="flex items-center text-sm text-gray-600"
                      onClick={() => router.push(`/workspace/${data.id}`)}
                    >
                      {data.icon}
                      <span className="truncate ml-2 font-medium">
                        {data.title}
                      </span>
                    </div>
                  ) : (
                    <div
                      className="flex items-center text-sm text-gray-600"
                      onClick={() => router.push(`/workspace/${data.id}`)}
                    >
                      <ImFileText2 className="w-4 h-4" />
                      <span className="truncate ml-2 font-medium">
                        {data.title}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center">
                    <div
                      onClick={() => handleRestore(data.id)}
                      role="button"
                      className="rounded-sm p-2 hover:bg-gray-300"
                      title="restore"
                    >
                      <LuUndo2 className="h-4 w-4 shrink-0 text-gray-600" />
                    </div>
                    <DeleteModel
                      onConfirm={() => handleDelete(data.id)}
                      Open={Open}
                      setOpen={setOpen}
                    >
                      <div
                        role="button"
                        className="rounded-sm p-2 hover:bg-gray-300"
                        title="delete"
                      >
                        <IoTrashOutline className="h-4 w-4 shrink-0 text-gray-600 " />
                      </div>
                    </DeleteModel>
                  </div>
                </div>
              ))}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
