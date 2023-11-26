"use client";

import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import React, { useState } from "react";
import { FaStar } from "react-icons/fa6";
import { IoStarOutline } from "react-icons/io5";
import { toast } from "sonner";

export default function HandleFavorite({
  initialData,
}: {
  initialData: Doc<"documents">;
}) {
  const updateDocument = useMutation(api.documents.update);
  const [isFavoriteDoc, setisFavoriteDoc] = useState(initialData.isFavorite);

  const handleAddToFavorite = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();

    const promise = updateDocument({
      id: initialData._id,
      isFavorite: true,
    }).finally(() => setisFavoriteDoc(true));

    toast.promise(promise, {
      loading: "Adding to favorite...",
      success: "Added to favorite Sucessfully.",
      error: "Failed to add favorite note.",
      duration: 1000,
    });
  };

  const handleRemoveFromFavorite = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();

    const promise = updateDocument({
      id: initialData._id,
      isFavorite: false,
    }).finally(() => setisFavoriteDoc(false));

    toast.promise(promise, {
      loading: "Removing from favorite...",
      success: "Removing from favorite Sucessfully.",
      error: "Failed to remove favorite note.",
      duration: 1000,
    });
  };

  return (
    <>
      {isFavoriteDoc ? (
        <div
          className="flex gap-x-2 justify-start items-center"
          onClick={handleRemoveFromFavorite}
        >
          <FaStar className={`h-5 w-5 shrink-0 text-yellow-600`} />
        </div>
      ) : (
        <div
          className="flex gap-x-2 justify-start items-center"
          onClick={handleAddToFavorite}
        >
          <IoStarOutline className={`h-5 w-5 shrink-0 text-gray-600`} />
        </div>
      )}
    </>
  );
}
