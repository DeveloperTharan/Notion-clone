"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import Title from "./Title";
import Notification from "./Notification";

import { TbMessage } from "react-icons/tb";
import { BsThreeDots } from "react-icons/bs";
import HandleFavorite from "./HandleFavorite";
import Publish from "./Publish";

export default function NavBar({ preview }: { preview?: boolean }) {
  const params = useParams();
  const document = useQuery(api.documents.getById, {
    documentId: params.documentId as Id<"documents">,
  });

  if (document === null) {
    return null;
  }

  return (
    <>
      {preview ? null : (
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
                <Publish initialData={document} />
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
                  data-tip="Add to favorites"
                >
                  <HandleFavorite initialData={document} />
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
      )}
    </>
  );
}
