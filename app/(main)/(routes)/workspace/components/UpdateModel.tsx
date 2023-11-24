import { Dialog, DialogBody, DialogHeader } from "@material-tailwind/react";
import React, { useState } from "react";

export default function UpdateModel({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  return (
    <>
      <button onClick={handleOpen} className="w-full">
        {children}
      </button>
      <Dialog open={open} handler={handleOpen} size="md">
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={handleOpen}
        >
          ✕
        </button>
        <DialogHeader className="text-center">Updates</DialogHeader>
        <DialogBody>
          <div className='text-center'>
            <h5 className='text-md font-medium text-gray-600'>No Updates are there! Check later or Refresh!</h5>
          </div>
        </DialogBody>
      </Dialog>
    </>
  );
}
