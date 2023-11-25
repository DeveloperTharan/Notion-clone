'use client'

import React from "react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/clerk-react";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Id } from "@/convex/_generated/dataModel";

import { BsThreeDots } from "react-icons/bs";
import { HiOutlineDocumentDuplicate } from "react-icons/hi";
import { IoStarOutline, IoTrashOutline } from "react-icons/io5";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";

export default function Menu({ id }: { id: Id<"documents"> }) {
  const { user } = useUser();
  const archive = useMutation(api.documents.archive);
  const router = useRouter();

  const handelArchive = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();

    if (!id) {
      return;
    }

    const promise = archive({ id }).then(() => router.push("/workspace"));

    toast.promise(promise, {
      loading: "Moving to trash...",
      success: "Note moved to trash!",
      error: "Failed to archive note.",
      duration: 1000,
    });
  };

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
            <div className="flex gap-x-2 justify-start items-center">
              <IoStarOutline className="h-4 w-4 shrink-0 text-gray-600" />
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
