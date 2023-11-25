"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import Title from "./Title";
import Notification from "./Notification";

import { TbMessage } from "react-icons/tb";
import { FaRegClock } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { toast } from "sonner";

interface NavBarProps {
  id: Id<"documents">;
  initialData: Doc<"documents">
}

export default function NavBar({ id, initialData }: NavBarProps) {
  const params = useParams();
  const document = useQuery(api.documents.getById, {
    documentId: params.documentId as Id<"documents">,
  });

  if (document === null) {
    return null;
  }

  return (
    <>
      {document === undefined ? (
        <nav className="navbar max-h-fit min-h-0 py-1">
          <div className="navbar-start ms-2 gap-3">
            <div className="skeleton w-5 h-5 rounded-md" />
            <div className="skeleton w-16 h-3" />
          </div>
          <div className="navbar-end me-5">
            <div className="skeleton w-20 h-3" />
          </div>
        </nav>
      ) : (
        <nav className="navbar max-h-fit min-h-0 py-1">
          <div className="navbar-start ms-2">
            <Title initialData={document} />
          </div>
          <div className="navbar-end me-2">
            <button
              className="text-gray-600 font-medium text-sm hover:bg-base-200 px-2 
              py-1 rounded-md tooltip tooltip-bottom"
              onClick={() => {}}
              data-tip="Publish"
            >
              Publish
            </button>
            <button
              className="text-gray-600 font-medium text-sm hover:bg-base-200 px-2 
              py-1 rounded-md tooltip tooltip-bottom"
              data-tip="View all commands"
            >
              <TbMessage className="h-5 w-5 shrink-0 text-gray-600" />
            </button>
            <button
              className="text-gray-600 font-medium text-sm hover:bg-base-200 px-2 
              py-1 rounded-md tooltip tooltip-bottom"
              data-tip="View all Update"
            >
              <FaRegClock className="h-5 w-5 shrink-0 text-gray-600" />
            </button>
            <button
                className="text-gray-600 font-medium text-sm hover:bg-base-200 px-2 
              py-1 rounded-md tooltip tooltip-bottom"
                onClick={() => {}}
                data-tip="Add to favorites"
              >
                <FaRegStar className="h-5 w-5 shrink-0 text-gray-600" />
              </button>
            <button
              className="text-gray-600 font-medium text-sm hover:bg-base-200 px-2 
              py-1 rounded-md tooltip tooltip-bottom"
              data-tip="More"
            >
              <BsThreeDots className="h-5 w-5 shrink-0 text-gray-600" />
            </button>
          </div>
        </nav>
      )}
      {document?.isArchived && <Notification documentId={document._id} />}
    </>
  );
}
