"use client";

import React, { Children } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

interface DeleteModelProp {
  children: React.ReactNode;
  onConfirm: () => void;
}

export const DeleteModel = ({ children, onConfirm }: DeleteModelProp) => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);

  const handleConfirm = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    onConfirm();
  };

  return (
    <>
      <button onClick={handleOpen}>{children}</button>
      <Dialog
        open={open}
        handler={handleOpen}
        size="xs"
        className="flex flex-col items-center justify-center border"
      >
        <DialogBody className="text-center w-[80%] text-gray-800">
          Are you sure you want to delete this page permanently?
        </DialogBody>
        <DialogFooter className="gap-y-4">
          <button
            className="w-full border border-red-600 text-red-600 rounded-md py-1"
            onClick={handleConfirm}
          >
            Yes, Delete this page
          </button>
          <button
            className="w-full border border-gray-500 rounded-md py-1"
            onClick={() => setOpen(false)}
          >
            Cancel
          </button>
        </DialogFooter>
      </Dialog>
    </>
  );
};
