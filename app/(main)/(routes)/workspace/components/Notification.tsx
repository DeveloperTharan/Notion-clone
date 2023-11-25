"use client";

import React from "react";
import { Id } from "@/convex/_generated/dataModel";
import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { DeleteModel } from "./DeleteModel";

interface NotificationProps {
  documentId: Id<"documents">;
}

export default function Notification({ documentId }: NotificationProps) {
  const router = useRouter();
  const remove = useMutation(api.documents.remove);
  const restore = useMutation(api.documents.restore);

  const handleRemove = () => {
    const promise = remove({ id: documentId });

    toast.promise(promise, {
      loading: "Deleting note...",
      success: "Deleted Sucessfully.",
      error: "Failed to Delete.",
      duration: 1000,
    });

    router.push("/workspace");
  };

  const handleRestore = () => {
    const promise = restore({ id: documentId });

    toast.promise(promise, {
      loading: "Restoring note...",
      success: "Restored Sucessfully.",
      error: "Failed to restore.",
      duration: 1000,
    });
  };

  return (
    <div
      className="w-full max-h-fit py-2 text-center flex justify-center items-center 
          bg-red-600 text-sm text-base-100 gap-3 font-normal"
    >
      <h1>This page is in Trash</h1>
      <button
        className="border border-base-100 px-3 py-1 rounded-md"
        onClick={handleRestore}
      >
        Restore Page
      </button>
      <DeleteModel onConfirm={() => handleRemove()}>
        <button
          className="border border-base-100 px-3 py-1 rounded-md"
        >
          Delete Permanently
        </button>
      </DeleteModel>
    </div>
  );
}
