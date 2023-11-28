"use client";

import React, { useState } from "react";
import { Dialog, DialogBody, DialogHeader } from "@material-tailwind/react";
import { useEdgeStore } from "@/lib/edgestore";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import { SingleImageDropzone } from "./SingleImageDropzone";

export default function CoverImageModel({
  children, 
  existingUrl,
}: {
  children: React.ReactNode, 
  existingUrl?: string,
}) {
  const params = useParams();
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File>();
  const [isSubmitting, setIsSubmitting] = useState<Boolean>(false);

  const { edgestore } = useEdgeStore();

  const updateDocument = useMutation(api.documents.update);

  const handleOpen = () => setOpen(!open);

  const handleOnClose = () => {
    setFile(undefined);
    setIsSubmitting(false);
    setOpen(false);
  };

  const handleOnChange = async (file?: File) => {
    if (file) {
      setIsSubmitting(true);
      setFile(file);

      const response = await edgestore.publicFiles.upload({
        file,
        options: {
          replaceTargetUrl: existingUrl,
        }
      });

      await updateDocument({
        id: params.documentId as Id<"documents">,
        coverImage: response.url,
      });

      handleOnClose();
    }
  };

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
        <DialogHeader className="text-center">CoverImage</DialogHeader>
        <DialogBody>
          <SingleImageDropzone
            className="w-full outline-none"
            disabled={!!isSubmitting}
            value={file}
            onChange={handleOnChange}
          />
        </DialogBody>
      </Dialog>
    </>
  );
}
