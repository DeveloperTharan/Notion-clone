"use client";

import React, { Dispatch, SetStateAction } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

interface DeleteModelProps {
  children: React.ReactNode;
  onConfirm: () => void;
  Open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const DeleteModel = ({
  children,
  onConfirm,
  Open,
  setOpen,
}: DeleteModelProps) => {
  return (
    <Dialog open={Open} onOpenChange={() => setOpen(!Open)}>
      <DialogTrigger className="w-full">{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="py-2">
            Are you sure you want to delete this page permanently?
          </DialogTitle>
          <DialogDescription className="flex flex-col gap-3">
            <button
              className="w-full border border-red-600 text-red-600 rounded-md py-1"
              onClick={onConfirm}
            >
              Yes, Delete this page
            </button>
            <button
              className="w-full border border-gray-500 rounded-md py-1"
              onClick={() => setOpen(false)}
            >
              Cancel
            </button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
