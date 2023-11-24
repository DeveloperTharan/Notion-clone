"use client";

import React from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Id } from "@/convex/_generated/dataModel";
import { useUser } from "@clerk/clerk-react";
 
import { MdArrowForwardIos } from "react-icons/md";
import { GoPlus } from "react-icons/go"; 
import { BsThreeDots } from "react-icons/bs";
import { IoStarOutline, IoTrashOutline } from "react-icons/io5";
import { HiOutlineDocumentDuplicate } from "react-icons/hi";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";

interface itemProp {
  onClick?: () => void;
  label: string;
  open: boolean;
  icon: any;
  id?: Id<"documents">;
  documentIcon?: string;
  active?: boolean;
  expanded?: boolean;
  level?: number;
  onExpand?: () => void;
}

export default function Item({
  onClick,
  label,
  open,
  icon: Icon,
  id,
  documentIcon,
  active,
  expanded,
  level,
  onExpand,
}: itemProp) {
  const { user } = useUser();
  const create = useMutation(api.documents.create);
  const router = useRouter();
  const archive = useMutation(api.documents.archive);

  const handleExpand = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
    onExpand?.();
  };

  const handelCreateInside = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();

    if (!id) {
      return;
    }

    const promise = create({ title: "Untitled", parentDocument: id }).then(
      (documentId) => {
        if (!expanded) {
          onExpand?.();
        }

        router.push(`/workspace/${documentId}`);
      }
    );

    toast.promise(promise, {
      loading: "Creating a new note...",
      success: "New note created!",
      error: "Failed to create a new note.",
      duration: 1000,
    });
  };

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
    <div
      onClick={onClick}
      role="button"
      style={{
        paddingLeft: level ? `${level * 12 + 12}px` : "12px",
      }}
      className={`group min-h-[27px] text-sm py-[6px] pr-3 w-full hover:bg-base-200
      flex items-center justify-start text-base-content font-medium gap-2 rounded-md
      ${active && "bg-base-300 text-gray-800"} ${!open && "mt-2"}`}
    >
      {!!id && ( //string into boolean
        <>
          {open ? (
            <div
              className="h-full rounded-md hover:bg-base-300 p-1"
              onClick={handleExpand}
            >
              <MdArrowForwardIos
                className={`h-3 w-3 shrink-0 text-gray-600
            ${expanded ? "rotate-90" : "rotate-0"}`}
              />
            </div>
          ) : null}
        </>
      )}
      {documentIcon ? (
        <div className="shrink-0 mr-2 text-[18px] text-gray-600 font-thin">
          {documentIcon}
        </div>
      ) : (
        <>
          {open ? (
            <Icon className="h-4 w-4 shrink-0 text-gray-600" />
          ) : (
            <div className="tooltip tooltip-right" data-tip={label}>
              <Icon className="h-[18px] w-[18px] ms-[3px] text-gray-600" />
            </div>
          )}
        </>
      )}
      <span
        className={`truncate text-gray-600 font-medium text-[12px] ${
          !open && "hidden"
        }`}
      >
        {label}
      </span>
      {open ? (
        <>
          {!!id && (
            <>
              {open ? (
                <div className="ml-auto flex items-center gap-x-2">
                  <div
                    className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-md 
                    hover:bg-base-300 p-1"
                    onClick={handelCreateInside}
                  >
                    <GoPlus className="h-4 w-4 shrink-0 text-gray-600" />
                  </div>
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
                          <h6 className="font-medium text-[12px] text-gray-600">
                            Delete
                          </h6>
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
                          <h6 className="font-medium text-[12px] text-gray-600">
                            Rename
                          </h6>
                        </div>
                      </li>
                      <li>
                        <div className="text-xs text-gray-600 font-medium p-2">
                          Last edited by: {user?.fullName}
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              ) : null}
            </>
          )}
        </>
      ) : null}
    </div>
  );
}
