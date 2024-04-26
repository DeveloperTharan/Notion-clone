"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { useEdgeStore } from "@/lib/edgestore";
import { SingleImageDropzone } from "@/utils/SingleImageDropzone";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { handleCoverImage } from "@/actions/document";

export const CoverImageModel = ({
  children,
  existingUrl,
}: {
  children: React.ReactNode;
  existingUrl: string;
}) => {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File>();
  const [isSubmitting, setIsSubmitting] = useState<Boolean>(false);

  const params = useParams();
  const router = useRouter();
  const { edgestore } = useEdgeStore();

  const handleOnClose = () => {
    setFile(undefined);
    setIsSubmitting(false);
    setOpen(!open);
  };

  const handleOnChange = async (file?: File) => {
    if (file) {
      setIsSubmitting(true);
      setFile(file);

      const response = await edgestore.publicFiles.upload({ file });

      handleCoverImage(
        "uplode",
        params.document as string,
        response.url
      );

      router.refresh();
      handleOnClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOnClose}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>CoverImage</DialogTitle>
          <DialogDescription>
            <SingleImageDropzone
              className="w-full outline-none"
              disabled={!!isSubmitting}
              value={file}
              onChange={handleOnChange}
            />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
