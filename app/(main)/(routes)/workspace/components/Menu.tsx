"use client";

import React, { useState } from "react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/clerk-react";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Doc, Id } from "@/convex/_generated/dataModel";

import { BsThreeDots } from "react-icons/bs";
import { HiOutlineDocumentDuplicate } from "react-icons/hi";
import { IoStarOutline, IoTrashOutline } from "react-icons/io5";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";

interface MenuProps {
  id: Id<"documents">;
}

export default function Menu({ id }: MenuProps) {
  const { user } = useUser();
  const router = useRouter();
  const archive = useMutation(api.documents.archive);
  const addtoFavorite = useMutation(api.documents.addToFavorites); 
  const removeFromFavorite = useMutation(api.documents.removeFromFavorites);

  const handelArchive = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();

    if (!id) {
      return;
    }

    const promise = archive({ id }).then(() => {
      router.push("/workspace");
    });

    toast.promise(promise, {
      loading: "Moving to trash...",
      success: "Note moved to trash!",
      error: "Failed to archive note.",
      duration: 1000,
    });
  };

  const handleAddToFavorite = (
    e:React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();

    const promise = addtoFavorite({ id });

    toast.promise(promise, {
      loading: "Adding to favorite...",
      success: "Added to favorite Sucessfully.",
      error: "Failed to add favorite note.",
      duration: 1000,
    });
  }

  const handleRemoveFromFavorite = (
    e:React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();

    const promise = removeFromFavorite({ id });

    toast.promise(promise, {
      loading: "Removing from favorite...",
      success: "Removing from favorite Sucessfully.",
      error: "Failed to remove favorite note.",
      duration: 1000,
    });
  }

  return (
    <>
      <div className="dropdown dropdown-bottom">
        <label tabIndex={0}>
          <div
            className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-md 
            hover:bg-base-300 p-1"
          >
            <BsThreeDots className="h-4 w-4 shrink-0 text-gray-600" />
          </div>
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content z-50 menu p-1 shadow bg-base-200 w-64 mt-[6px]"
        >
          <li>
            <div
              className="flex gap-x-2 justify-start items-center"
              onClick={handelArchive}
            >
              <IoTrashOutline className="h-4 w-4 shrink-0 text-gray-600" />
              <h6 className="font-medium text-[12px] text-gray-600">Delete</h6>
            </div>
          </li>
          <li>
            <div className="flex gap-x-2 justify-start items-center" onClick={handleAddToFavorite}>
              <IoStarOutline className={`h-4 w-4 shrink-0 text-gray-600`} />
              <h6 className="font-medium text-[12px] text-gray-600">
                Add to favorite
              </h6>
            </div>
          </li>
          <li>
            <div className="flex gap-x-2 justify-start items-center">
              <HiOutlineDocumentDuplicate className="h-4 w-4 shrink-0 text-gray-600" />
              <h6 className="font-medium text-[12px] text-gray-600">
                Dupliate
              </h6>
            </div>
          </li>
          <li>
            <div
              className="flex gap-x-2 justify-start items-center"
              onClick={() => {}}
            >
              <MdOutlineDriveFileRenameOutline className="h-4 w-4 shrink-0 text-gray-600" />
              <h6 className="font-medium text-[12px] text-gray-600">Rename</h6>
            </div>
          </li>
          <li>
            <div className="text-xs text-gray-600 font-medium p-2">
              Last edited by: {user?.fullName}
            </div>
          </li>
        </ul>
      </div>
    </>
  );
}
