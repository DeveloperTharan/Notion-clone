"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { toast } from "sonner";
import { handleDocumentAction } from "@/actions/document";
import { DeleteModel } from "../models/delete-model";
import { Button } from "../ui/button";

interface NotificationProps {
  id: string;
}

export const Notification = ({ id }: NotificationProps) => {
  const [Open, setOpen] = useState(false);

  const router = useRouter();

  const handleRestore = () => {
    handleDocumentAction("restore", id)
      .then((data) => {
        if (data.success) return toast.success(data.success);
        if (data.error) return toast.error(data.error);
      })
      .finally(() => {
        router.refresh();
      });
  };

  const handleDelete = () => {
    handleDocumentAction("delete", id)
      .then((data) => {
        if (data.success) return toast.success(data.success);
        if (data.error) return toast.error(data.error);
      })
      .finally(() => {
        setOpen(false);
        router.push("/workspace")
      });
  };
  return (
    <div className="w-full h-12 bg-red-500 flex items-center justify-center text-white gap-3">
      <h1>This page is in Trash</h1>
      <Button variant={"outline"} onClick={handleRestore} size={"sm"} className="bg-red-500">
        Restore
      </Button>
      <DeleteModel onConfirm={handleDelete} Open={Open} setOpen={setOpen} className={"w-fit max-w-fit"}>
        <Button variant={"outline"} size={"sm"} className="bg-red-500">Delete</Button>
      </DeleteModel>
    </div>
  );
};
